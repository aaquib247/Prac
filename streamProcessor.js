class StreamProcessor {
    constructor(windowSeconds = 10) {
        this.windowTime = windowSeconds * 1000;  // Time window in milliseconds
        this.map = new Map();                    // Map to store objects by id with their arrival time
        this.queue = [];                         // Queue to track order of arrival (for cleanup)
        this.currentTime = 0;                    // Simulated current time
    }

    // Method to add a new object to the stream
    add(obj) {
        const arrivalTime = this.currentTime++;  // Simulated arrival time (in a real-world case, use Date.now())
        
        // If the object is not already in the map, we process it
        if (!this.map.has(obj.id)) {
            this.map.set(obj.id, { obj, arrivalTime });
            this.queue.push({ id: obj.id, timestamp: arrivalTime });  // Track the arrival order
            
            // Print or process the object
            console.log('Added:', obj);
        }
    }

    // Method to get objects within the time window (no duplicates)
    getRecent() {
        const cutoff = this.currentTime - this.windowTime;  // Get the cutoff time based on the window size
        const result = [];

        // Step 1: Clean up old entries from both the queue and map
        while (this.queue.length > 0 && this.queue[0].timestamp <= cutoff) {
            const oldEvent = this.queue.shift();  // Remove the old event from the queue
            this.map.delete(oldEvent.id);         // Also remove it from the map
        }

        // Step 2: Add the valid objects to the result
        for (const [id, entry] of this.map) {
            if (entry.arrivalTime >= cutoff) {
                result.push(entry.obj);  // Include the object if it's still within the time window
            }
        }

        return result;
    }

    // Simulate the stream and progress time (for testing)
    simulateStream(stream) {
        for (const obj of stream) {
            this.add(obj);  // Add each object to the stream
        }
    }
}


// Example usage:const processor = new StreamProcessor(10);  // 10 seconds window

// Simulate a stream of objects
const stream = [
    { id: 1, data: 'A' },
    { id: 2, data: 'B' },
    { id: 1, data: 'A' },  // Duplicate within window
    { id: 3, data: 'C' },
    { id: 2, data: 'B' },  // Duplicate within window
];

// Simulate adding objects to the stream
processor.simulateStream(stream);

// Get recent objects within the time window
console.log('Recent objects:', processor.getRecent());  // Should print unique objects within the last 10 seconds   