// Process 500 Messages, Max 5 Concurrent with retry and backoff

const express = require('express');
const app = express();
app.use(express.json());

// wait helper
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// simulate external API call
async function sendMessage(message) {
  console.log(`Sending: ${message.id}`);
  return { id: message.id, status: 'sent' };
}

// retry with backoff
async function sendWithRetry(message, retries = 3) {
  let attempt = 0;
  while (attempt <= retries) {
    try {
      return await sendMessage(message);
    } catch (err) {
      if (attempt === retries) throw err;
      await wait(Math.pow(2, attempt) * 1000);
      attempt++;
    }
  }
}

// batch processor — max 5 concurrent
async function processMessages(messages, batchSize = 5) {
  const results = [];
  for (let i = 0; i < messages.length; i += batchSize) {
    const batch = messages.slice(i, i + batchSize);
    const batchResults = await Promise.allSettled(
      batch.map(msg => sendWithRetry(msg))
    );
    results.push(...batchResults);
  }
  return results;
}

app.post('/process', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !messages.length) {
      return res.status(400).json({ error: 'Messages required' });
    }
    const results = await processMessages(messages);
    res.status(200).json({ results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Running on 3000'));
