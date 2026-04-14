
//Question: Implement a rate limiter that allows a maximum of 5 requests in the last 2 minutes. 
// The rate limiter should have a method `rateLimited()` that returns a boolean indicating whether the request should be rate limited or not. 
// If the request is accepted, it should be processed by either `processAPI1()` or `processAPI2()`, depending on the request type.

//Eg: 
// TIME: 0, 0, 0, 1, 1, 1, 
// RATE LIMITED: N, N, N, N, N, Y, --> OUTPUT


class RateLimiter {
  constructor(limit, duration) {
    this.LIMIT = limit;
    this.DURATION = duration;
    this.timeStamps = []; // To store timestamps of accepted requests
    this.acceptCount = 0;
    this.rejectCount = 0;
  }

  // Returns boolean indicating whether the request should be rate limited
  rateLimited() {
    const now = Date.now(); // Get the current timestamp in milliseconds
    const window = now - this.DURATION; // The start of the time window (2 minutes ago)

    // Remove requests that are outside the window (older than DURATION)
    while (this.timeStamps.length > 0 && this.timeStamps[0] <= window) {
      this.timeStamps.shift();
    }

    // If we have already hit the limit, reject the request
    if (this.timeStamps.length >= this.LIMIT) {
      this.rejectCount++;
      console.log(`Request rejected at ${new Date(now).toLocaleString()}. Reject count: ${this.rejectCount}`);
      return true;
    }

    // Accept the request and add the current timestamp to the array
    this.timeStamps.push(now);
    this.acceptCount++;
    console.log(`Request accepted at ${new Date(now).toLocaleString()}. Accept count: ${this.acceptCount}`);
    return false;
  }
}

// Usage:

const rateLimiter = new RateLimiter(5, 2 * 60 * 1000); // 5 requests in the last 2 minutes

// Simulate API calls:

function processAPI1() {
  console.log("Processing API 1...");
}

function processAPI2() {
  console.log("Processing API 2...");
}

// Test with multiple requests
for (let i = 0; i < 10; i++) {
  if (!rateLimiter.rateLimited()) {
    if (i % 2 === 0) processAPI1(); // For even i, call processAPI1
    else processAPI2(); // For odd i, call processAPI2
  }
}
