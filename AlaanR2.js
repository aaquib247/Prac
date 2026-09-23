//Create an API per user, call multiple times, and check if the rate limit is exceeded or not.

const express = require('express');
const app = express();
const port = 3000;


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

const users = [
    { id: 1, name: 'User 1', rateLimiter: rateLimiter },
    { id: 2, name: 'User 2', rateLimiter: rateLimiter2 }
];

for(let user of users){

    app.get(`/api/${user.id}`, (req, res) => {
    if(user.rateLimiter.isAllowed()){
        res.send("Request successful.");
    } else {
        res.status(429).send("Rate limit exceeded. Please try again later.");
    }
});


}



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
