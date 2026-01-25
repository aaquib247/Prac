class MaxHeap {
    constructor() {
        this.heap = [];
    }

    push(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }

    pop() {
        const max = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.bubbleDown(0);
        }
        return max;
    }

    bubbleUp(index) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.heap[parent].freq >= this.heap[index].freq) break;
            [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
            index = parent;
        }
    }

    bubbleDown(index) {
        while (true) {
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            let largest = index;

            if (left < this.heap.length && this.heap[left].freq > this.heap[largest].freq) {
                largest = left;
            }
            if (right < this.heap.length && this.heap[right].freq > this.heap[largest].freq) {
                largest = right;
            }
            if (largest === index) break;
            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            index = largest;
        }
    }

    size() {
        return this.heap.length;
    }
}

const frequencySort = (nums) => {
    // 1. Create frequency map
    const frequency = {};
    for (const num of nums) {
        frequency[num] = (frequency[num] || 0) + 1;
    }

    // 2. Build max-heap based on frequency
    const maxHeap = new MaxHeap();
    for (const num in frequency) {
        maxHeap.push({ num: Number(num), freq: frequency[num] });
    }

    // 3. Reconstruct sorted array
    const result = [];
    while (maxHeap.size() > 0) {
        const { num, freq } = maxHeap.pop();
        for (let i = 0; i < freq; i++) {
            result.push(num);
        }
    }

    return result;
};

//TC: O(N log N) where N is the number of unique elements in nums
//SC: O(N) for frequency map and heap storage
console.log(frequencySort([1,1,2,2,2,3]));  // [2,2,2,1,1,3]
console.log(frequencySort([2,3,1,3,2]));     // [2,2,3,3,1]