class Logger {
    // Step 1: Private static variable to hold the instance
    static instance;

    // Step 2: Private constructor to prevent direct instantiation
    constructor() {
        console.log("Logger created!");
    }

    // Step 3: Public static method to get the instance
    static getInstance() {
        // Create the instance only once
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    // Step 4: Method to log messages
    log(message) {
        console.log(`[LOG]: ${message}`);
    }
}

// Usage
const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();

// Both logger1 and logger2 will refer to the same instance
logger1.log("This is a log message."); // [LOG]: This is a log message.
logger2.log("Another log message."); // [LOG]: Another log message.

console.log(logger1 === logger2); // true (both are the same instance)

