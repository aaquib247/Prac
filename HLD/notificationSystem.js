async function sendNotification(notification) {
  if (Math.random() < 0.5) throw new Error('Send failed');
  return { id: notification.id, status: 'sent' };
}

function wait(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function sendWithRetry(notification, retries = 3) {
  let attempt = 0;
  while (attempt <= retries) {
    try {
      return await sendNotification(notification);
    } catch (error) {
      if (attempt === retries) throw error;
      await wait(Math.pow(2, attempt) * 1000);
      attempt++;
    }
  }
}

async function processNotifications(notifications) {
  const success = [];
  const failed = [];

  const results = await Promise.allSettled(
    notifications.map(n => sendWithRetry(n))
  );

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      success.push(notifications[index].id);
    } else {
      failed.push(notifications[index].id);
    }
  });

  return { success, failed };
}

const notifications = [
  { id: 1, message: 'Order confirmed' },
  { id: 2, message: 'Payment received' },
  { id: 3, message: 'Shipped' },
];

const result = await processNotifications(notifications);
console.log(result);


// HLD Component	Code
// Notification Service	processNotifications()
// Retry + backoff	sendWithRetry()
// Third party provider	sendNotification()
// Success/Failed tracking	{ success, failed }
// Promise.allSettled	parallel sending (scale)
