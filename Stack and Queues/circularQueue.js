class CircularQueue {
    constructor(size) {
        this.size = size;
        this.queue = new Array(size);
        this.front = 0;
        this.rear = 0;
        this.count = 0;
    }

    // Add an item to the queue
    enqueue(item) {
        if (this.isFull()) {
            throw new Error('Queue is full');
        }
        this.queue[this.rear] = item;
        this.rear = (this.rear + 1) % this.size;
        this.count++;
    }

    // Remove an item from the queue
    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        const item = this.queue[this.front];
        this.queue[this.front] = undefined; // Clear the slot
        this.front = (this.front + 1) % this.size;
        this.count--;
        return item;
    }

    // Peek at the front item
    peek() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        return this.queue[this.front];
    }

    // Check if the queue is empty
    isEmpty() {
        return this.count === 0;
    }

    // Check if the queue is full
    isFull() {
        return this.count === this.size;
    }

    // Get the size of the queue
    size() {
        return this.count;
    }

    // Print the queue (for debugging)
    print() {
        let result = [];
        for (let i = 0; i < this.size; i++) {
            result.push(this.queue[i] !== undefined ? this.queue[i] : 'empty');
        }
        console.log(result);
    }
}

// Example usage
const queue = new CircularQueue(5);

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);

console.log(queue.peek());  // Output: 1

queue.dequeue(); // Remove 1
queue.enqueue(5); // Add 5
queue.enqueue(6); // Add 6, should overwrite 2

queue.print(); // Output: [5, 6, 3, 4, 5] (queue will look like [5, 6, 3, 4, 5])
