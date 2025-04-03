class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }

    pop() {
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.bubbleDown(0);
        }
        return min;
    }

    bubbleUp(index) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.heap[parent] <= this.heap[index]) break;
            [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
            index = parent;
        }
    }

    bubbleDown(index) {
        while (true) {
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            let smallest = index;

            if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }
            if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }
            if (smallest === index) break;
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }

    size() {
        return this.heap.length;
    }
}

function minCostToConnectRopes(ropes) {
    const minHeap = new MinHeap();
    let totalCost = 0;

    // Add all ropes to the min-heap
    for (const rope of ropes) {
        minHeap.push(rope);
    }

    // just take top two and add in totalSum and add sum of top 2 in minHeap;
    // Combine ropes until only one remains
    while (minHeap.size() >= 2) {
        const first = minHeap.pop();
        const second = minHeap.pop();
        const combined = first + second;
        totalCost += combined;
        minHeap.push(combined);
    }

    return totalCost;
}

// Example usage:
console.log(minCostToConnectRopes([4, 3, 2, 6])); // Output: 29
console.log(minCostToConnectRopes([1, 2, 3, 4, 5])); // Output: 33