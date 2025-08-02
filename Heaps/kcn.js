class MaxHeap {
    constructor() {
        this.heap = [];
    }

    // Helper function to compare two elements
    compare(a, b) {
        return b[0] - a[0]; // Compare based on distance to x (descending order)
    }

    // Push an element into the heap
    push(item) {
        this.heap.push(item);
        this._heapifyUp();
    }

    // Pop the root element (the max element) from the heap
    pop() {
        const root = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this._heapifyDown();
        }
        return root;
    }

    // Reorder the heap upwards
    _heapifyUp() {
        let idx = this.heap.length - 1;
        while (idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            if (this.compare(this.heap[idx], this.heap[parentIdx]) > 0) {
                [this.heap[idx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[idx]];
                idx = parentIdx;
            } else {
                break;
            }
        }
    }

    // Reorder the heap downwards
    _heapifyDown() {
        let idx = 0;
        const length = this.heap.length;
        while (idx < length) {
            let left = 2 * idx + 1;
            let right = 2 * idx + 2;
            let largest = idx;

            if (left < length && this.compare(this.heap[left], this.heap[largest]) > 0) {
                largest = left;
            }
            if (right < length && this.compare(this.heap[right], this.heap[largest]) > 0) {
                largest = right;
            }

            if (largest !== idx) {
                [this.heap[idx], this.heap[largest]] = [this.heap[largest], this.heap[idx]];
                idx = largest;
            } else {
                break;
            }
        }
    }

    // Return the size of the heap
    size() {
        return this.heap.length;
    }
}

const findClosestElements = (arr, k, x) => {
    const maxHeap = new MaxHeap();

    // Step 1: Add elements to the heap
    for (let num of arr) {
        maxHeap.push([Math.abs(num - x), num]);

        // Step 2: If heap exceeds size k, remove the element with the largest distance
        if (maxHeap.size() > k) {
            maxHeap.pop();
        }
    }

    // Step 3: Extract the k closest elements and sort them
    const result = [];
    while (maxHeap.size() > 0) {
        result.push(maxHeap.pop()[1]); // Push the element (num) into result
    }

    // Sort the result in ascending order
    result.sort((a, b) => a - b);
    return result;
};


console.log(findClosestElements([1, 2, 3, 4, 5], 4, 3)); // Output: [1, 2, 3, 4]
console.log(findClosestElements([1, 2, 3, 4, 5], 4, -1)); // Output: [1, 2, 3, 4]