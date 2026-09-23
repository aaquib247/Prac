// Create an Express API with the following:

// POST /payments — accepts { userId, amount, currency }
// Validate the request — userId, amount, currency are required. Amount must be greater than 0.
// Each user can make max 3 payments per minute — rate limit per user
// If rate limit exceeded → return 429
// If valid → return 201 with { success: true, userId, amount, currency }

import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

class RateLimiter {
    constructor(limit, timeWindow) {
        this.limit = limit;
        this.timeWindow = timeWindow;
        this.queue = [];
    }

    isAllowed() {
        let currTime = Date.now();
        let windowStart = currTime - this.timeWindow;

        while (this.queue.length > 0 && this.queue[0] < windowStart) {
            this.queue.shift();
        }

        if (this.queue.length >= this.limit) {
            return false;
        }

        this.queue.push(currTime);
        return true;
    }
}


const rateLimiters = {};


function validate(req, res, next) {
    const { userId, amount, currency } = req.body;

    if (!userId || !amount || !currency || amount <= 0) {
        return res.status(400).send({ error: 'Invalid request. userId, amount, and currency are required. Amount must be greater than 0.' });
    }

    next();
}

app.post('/payments', validate, (req, res) => {
    const { userId, amount, currency } = req.body;

    if (!rateLimiters[userId]) {
        rateLimiters[userId] = new RateLimiter(3, 60000); // 3 requests per minute
    }       
    const userRateLimiter = rateLimiters[userId];

    if (!userRateLimiter.isAllowed()) {
        return res.status(429).send({ error: 'Rate limit exceeded. Please try again later.' });
    }

    // If valid and within rate limit
    return res.status(201).send({ success: true, userId, amount, currency });
});
 

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
}); 