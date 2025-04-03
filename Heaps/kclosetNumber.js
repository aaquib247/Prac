class MaxHeap {
    constructor() {
        this.heap = [];
    }
    
    push(val) {
        this.heap.push(val);
        this.bubbleUp();
    }
    
    pop() {
        const max = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.bubbleDown();
        }
        return max;
    }
    
    bubbleUp() {
        let idx = this.heap.length - 1;
        while (idx > 0) {
            const parent = Math.floor((idx - 1) / 2);
            if (this.heap[parent].diff >= this.heap[idx].diff) break;
            [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
            idx = parent;
        }
    }
    
    bubbleDown() {
        let idx = 0;
        const length = this.heap.length;
        while (true) {
            const left = 2 * idx + 1;
            const right = 2 * idx + 2;
            let largest = idx;
            
            if (left < length && this.heap[left].diff > this.heap[largest].diff) {
                largest = left;
            }
            if (right < length && this.heap[right].diff > this.heap[largest].diff) {
                largest = right;
            }
            if (largest === idx) break;
            [this.heap[idx], this.heap[largest]] = [this.heap[largest], this.heap[idx]];
            idx = largest;
        }
    }
    
    size() {
        return this.heap.length;
    }
}

function findClosestElements(arr, k, x) {
    const maxHeap = new MaxHeap();
    
    for (const num of arr) {
        const diff = Math.abs(num - x);
        
        if (maxHeap.size() < k) {
            maxHeap.push({ num, diff });
        } else if (diff < maxHeap.heap[0].diff) {
            maxHeap.pop();
            maxHeap.push({ num, diff });
        }
    }
    
    const result = [];
    while (maxHeap.size() > 0) {
        result.push(maxHeap.pop().num);
    }
    
    return result.sort((a, b) => a - b);
}

// Example usage:
console.log(findClosestElements([1, 2, 3, 4, 5], 4, 3)); // Output: [1, 2, 3, 4]
console.log(findClosestElements([1, 2, 3, 4, 5], 4, -1)); // Output: [1, 2, 3, 4]




//----
var findClosestElements = function(arr, k, x) {
    let start = 0,
       end = arr.length - 1;

   while (end - start >= k) {
       if (Math.abs(arr[start] - x) > Math.abs(arr[end] - x)) {
           start++;
       } else {
           end--;
       }
   }

   return arr.slice(start, end + 1);
}