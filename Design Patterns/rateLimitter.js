class FixedWindowRateLimiter {
  constructor(maxRequests, windowSizeMs) {
    this.maxRequests = maxRequests;  // Max requests in the time window
    this.windowSizeMs = windowSizeMs; // Time window size in milliseconds
    this.requests = new Map();       // Stores user request data
  }

  isRequestAllowed(userId) {
    const currentTime = Date.now();

    // If no previous request from the user
    if (!this.requests.has(userId)) {
      this.requests.set(userId, { count: 1, timestamp: currentTime });
      return true;
    }

    const userData = this.requests.get(userId);

    // Check if the current request is within the same time window
    if (currentTime - userData.timestamp < this.windowSizeMs) {
      if (userData.count < this.maxRequests) {
        userData.count++;
        return true;
      }
      return false; // Exceeds rate limit
    }

    // If the time window has passed, reset count and timestamp
    userData.count = 1;
    userData.timestamp = currentTime;
    return true;
  }
}

const fixedWindowLimiter = new FixedWindowRateLimiter(5, 60000); // 5 requests per minute
console.log(fixedWindowLimiter.isRequestAllowed("user123")); // true
console.log(fixedWindowLimiter.isRequestAllowed("user123")); // true
console.log(fixedWindowLimiter.isRequestAllowed("user123")); // true
console.log(fixedWindowLimiter.isRequestAllowed("user123")); // true
console.log(fixedWindowLimiter.isRequestAllowed("user123")); // true
console.log(fixedWindowLimiter.isRequestAllowed("user123")); // false (exceeds limit)