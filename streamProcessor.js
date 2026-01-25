class StreamProcessor {
    constructor(windowSeconds = 10) {
        this.windowTime = windowSeconds * 1000; // Convert window to milliseconds
        this.map = new Map(); // id -> { obj, arrivalTime }
    }
    
    add(obj) {
        const arrivalTime = Date.now(); // Capture the arrival time of the object
        this.map.set(obj.id, { obj, arrivalTime });
        
        console.log(`Added: ${JSON.stringify(obj)} at ${new Date(arrivalTime).toLocaleString()}`);
    }
    
    getRecent() {
        const cutoff = Date.now() - this.windowTime;
        const result = [];
        
        for (const [id, entry] of this.map) {
            if (entry.arrivalTime >= cutoff) {  // Object is within the time window
                result.push(entry.obj);
            } else {
                console.log(`Removing outdated object: ${JSON.stringify(entry.obj)} at ${new Date(entry.arrivalTime).toLocaleString()}`);
                this.map.delete(id); // Remove objects older than the cutoff time
            }
        }
        
        console.log(`Returning recent objects: ${JSON.stringify(result)}`);
        return result;
    }
}

// Example usage:
const processor = new StreamProcessor(10);  // 10 seconds window
processor.add({ id: 1, name: 'Alice' });
processor.add({ id: 2, name: 'Bob' });
setTimeout(() => {
    processor.add({ id: 1, name: 'Alice Updated' });  // Same ID, updated object
    console.log(processor.getRecent());  // Should return the latest object(s)
}, 5000);

setTimeout(() => {
    console.log(processor.getRecent());  // Should return the updated object(s) if within the time window
}, 15000);

