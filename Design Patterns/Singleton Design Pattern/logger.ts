class Logger {
    // Step 1: Private static variable to hold the single instance
    private static instance: Logger;

    // Step 2: Private constructor to prevent instantiation from outside
    private constructor() {console.log("hiiii")}

    // Step 3: Public static method to get the instance
    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger(); // Create the instance if it doesn't exist
        }
        return Logger.instance; // Return the existing instance
    }

    // A method to log messages
    public log(message: string): void {
        console.log(`[LOG]: ${message}`);
    }
}

// Usage:

// Both these variables should refer to the same instance
const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();

// Log messages using the Singleton Logger
logger1.log("This is the first log message.");  // Output: [LOG]: This is the first log message.
logger2.log("This is the second log message."); // Output: [LOG]: This is the second log message.

// Check if both references point to the same instance
console.log(logger1 === logger2);  // Output: true (confirming both are the same instance)
