class SlidingWindowProcessor {
    constructor(windowDuration = 10000) {
        this.windowDuration = windowDuration; // 10 seconds in milliseconds
        this.messages = new Set(); // To keep unique messages
        this.timestamps = new Map(); // To keep track of message timestamps
        this.startTime = Date.now(); // Start time of the sliding window
    }

    // Process new data in the stream
    processData(newData) {
        const currentTime = Date.now();
        const endTime = this.startTime + this.windowDuration;

        // Add new data to the set and map
        newData.forEach(({ timestamp, message }) => {
            if (timestamp >= this.startTime && timestamp <= endTime) {
                this.messages.add(message);
                this.timestamps.set(message, timestamp);
            }
        });

        // Remove messages that are outside the window
        this.messages.forEach(message => {
            if (this.timestamps.get(message) < this.startTime) {
                this.messages.delete(message);
                this.timestamps.delete(message);
            }
        });

        // Log the unique messages within the window
        console.log(`Unique messages in the last ${this.windowDuration / 1000} seconds: ${Array.from(this.messages).join(', ')}`);
        
        // Update the window start time
        this.startTime = currentTime;
    }
}

// Example usage
const processor = new SlidingWindowProcessor();

// Simulate getting data from a function
function getStatus() {
    return [
        { timestamp: Date.now(), message: "Hello World" },
        { timestamp: Date.now() + 1000, message: "Hello World" },
        { timestamp: Date.now() + 2000, message: "Nice Day" },
        { timestamp: Date.now() + 3000, message: "How are you ?" },
        { timestamp: Date.now() + 4000, message: "helloween is the best" },
        { timestamp: Date.now() + 5000, message: "How are you ?" },
        { timestamp: Date.now() + 6000, message: "helloween is the best" },
        { timestamp: Date.now() + 7000, message: "Nice Day" }
    ];
}

// Simulate processing the data stream periodically
setInterval(() => {
    const newData = getStatus();
    processor.processData(newData);
}, 1000); // Simulating data arrival every second
