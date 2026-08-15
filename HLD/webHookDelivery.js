// STORAGE
const registry = new Map();
// { 'user.login': [{url, secret}] }

// STEP 1 — Register
function register(eventType, url, secret) {
  const list = registry.get(eventType) || [];
  list.push({ url, secret });
  registry.set(eventType, list);
}

// STEP 2 — Ingest
async function ingest(event) {
  const subscribers = registry.get(event.type) || [];
  const batches = chunk(subscribers, 5); // max 5 at once
  for (const batch of batches) {
    await Promise.all(batch.map(sub => deliver(event, sub)));
  }
}

// STEP 3 — Deliver
async function deliver(event, subscriber, attempt = 1) {
  const sig = sign(event, subscriber.secret); // HMAC
  const iKey = `${event.type}:${event.id}`;   // idempotency

  try {
    const res = await fetch(subscriber.url, {
      method: 'POST',
      body: JSON.stringify(event),
      headers: { 'x-signature': sig, 'x-idempotency-key': iKey }
    });

    if (res.status >= 200 && res.status < 300) {
      console.log('Delivered ✓');
    } else {
      retry(event, subscriber, attempt);
    }
  } catch (e) {
    retry(event, subscriber, attempt);
  }
}

// STEP 4 — Retry
function retry(event, subscriber, attempt) {
  if (attempt > 5) { dlq.push({ event, subscriber }); return; }
  const delay = Math.pow(2, attempt) * 1000; // 2s 4s 8s 16s 32s
  setTimeout(() => deliver(event, subscriber, attempt + 1), delay);
}

// HELPERS
const dlq = [];
const chunk = (arr, size) => 
  Array.from({ length: Math.ceil(arr.length / size) }, 
    (_, i) => arr.slice(i * size, i * size + size));
const sign = (event, secret) => `hmac(${JSON.stringify(event)},${secret})`;

// RUN
register('user.login', 'https://client.com/hook', 'secret123');
ingest({ type: 'user.login', id: '001', userId: 'u1' });
