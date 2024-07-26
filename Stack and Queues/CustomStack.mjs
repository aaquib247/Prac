export class StackException extends Error {
    constructor(message) {
        super(message);
        this.name = "StackException";
    }
}

export class CustomStack {
    constructor(size = 10) {
        if (size <= 0) {
            throw new Error("Size must be greater than zero.");
        }
        this.data = new Array(size);
        this.ptr = -1;
    }

    push(item) {
        if (this.isFull()) {
            throw new StackException("Stack is full!");
        }
        this.data[++this.ptr] = item;
    }

    pop() {
        if (this.isEmpty()) {
            throw new StackException("Cannot pop from an empty stack!");
        }
        return this.data[this.ptr--];
    }

    peek() {
        if (this.isEmpty()) {
            throw new StackException("Cannot peek from an empty stack!");
        }
        return this.data[this.ptr];
    }

    isFull() {
        return this.ptr === this.data.length - 1;
    }

    isEmpty() {
        return this.ptr === -1;
    }
}
