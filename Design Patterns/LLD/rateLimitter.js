class RateLimiter {

    constructor(limit, timeWindow) {
     this.limit = limit;
     this.timeWindow = timeWindow;
     this.queue = [];
    }

    isAllowed(){

    let currTime = Date.now();
    let windowStart = currTime - this.timeWindow;

    while(this.queue.length > 0 && this.queue[0] < windowStart){
        this.queue.shift();
    }

    if(this.queue.length >= this.limit){
        console.log("Rate limit exceeded. Please try again later.");
        return false;
    }

    this.queue.push(currTime);
    console.log("Request allowed.");
    return true;

    }
}


const rateLimiter = new RateLimiter(5, 10000); // Limit: 5 requests per 10 seconds
const rateLimiter2 = new RateLimiter(10, 20000);