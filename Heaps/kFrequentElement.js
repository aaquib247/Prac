class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(element) {  // element is [num, freq]
        this.heap.push(element);
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
            if (this.heap[parent][1] <= this.heap[index][1]) break;
            [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
            index = parent;
        }
    }

    bubbleDown(index) {
        while (true) {
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            let smallest = index;

            if (left < this.heap.length && this.heap[left][1] < this.heap[smallest][1]) {
                smallest = left;
            }
            if (right < this.heap.length && this.heap[right][1] < this.heap[smallest][1]) {
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

    peek() {
        return this.heap[0];
    }
}

function topKFrequent(nums, k) {
    // Count frequencies
    const frequencyMap = {};
    for (const num of nums) {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    }
    
    // Create min-heap and maintain top k elements
    const minHeap = new MinHeap();
    for (const [num, freq] of Object.entries(frequencyMap)) {
        minHeap.push([Number(num), freq]);
        if (minHeap.size() > k) {
            minHeap.pop(); // Remove the least frequent
        }
    }
    
    // Extract and return results (most frequent first)
    const result = [];
    while (minHeap.size() > 0) {
        let [k,v] = minHeap.pop()
        result.push(k);
    }
    return result.reverse();
}

console.log(topKFrequent([1,1,1,2,2,3], 2)); // Output: [1, 2]
console.log(topKFrequent([1], 1)); // Output: [1]