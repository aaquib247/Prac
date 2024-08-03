class MyQueue {
    constructor() {
        this.stack1 = []; // Stack to handle incoming elements
        this.stack2 = []; // Stack to handle outgoing elements
    }

    // Push element x to the back of the queue.
    push(x) {
        this.stack1.push(x);
    }

    // Removes the element from the front of the queue and returns it.
    pop() {
        this._transfer();
        return this.stack2.pop();
    }

    // Get the front element.
    peek() {
        this._transfer();
        return this.stack2[this.stack2.length - 1];
    }

    // Returns whether the queue is empty.
    empty() {
        return this.stack1.length === 0 && this.stack2.length === 0;
    }

    // Transfer elements from stack1 to stack2 if stack2 is empty.
    _transfer() {
        if (this.stack2.length === 0) {
            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop());
            }
        }
    }
}

// Example usage:
const myQueue = new MyQueue();
myQueue.push(1);      // Queue: [1]
myQueue.push(2);      // Queue: [1, 2]
console.log(myQueue.peek()); // Returns 1
console.log(myQueue.pop());  // Returns 1, Queue: [2]
console.log(myQueue.empty()); // Returns false
