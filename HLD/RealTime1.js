const express = require('express');
const app = express();
app.use(express.json());

class RateLimiter {
  constructor(limit, timeWindow) {
    this.limit = limit;
    this.timeWindow = timeWindow;
    this.queue = [];
  }

  isAllowed() {
    const now = Date.now();
    const windowStart = now - this.timeWindow;

    while (this.queue.length > 0 && this.queue[0] < windowStart) {
      this.queue.shift();
    }

    if (this.queue.length >= this.limit) return false;

    this.queue.push(now);
    return true;
  }
}

const rateLimiters = {};

app.post('/messages', (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId required' });
  }

  if (!rateLimiters[userId]) {
    rateLimiters[userId] = new RateLimiter(10, 60000); // 10 per minute
  }

  if (!rateLimiters[userId].isAllowed()) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }

  res.status(200).json({ success: true, userId });
});

app.listen(3000, () => console.log('Running on 3000'));
