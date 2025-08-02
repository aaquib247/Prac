//Time Complexity: O(n log n) due to sorting and SC(1)
function findKthLargest(nums, k) {
    nums.sort((a, b) => b - a); // Sort in descending order
    return nums[k - 1];
}
class MinHeap {
    constructor() {
        this.heap = [];
    }

    // Helper function to swap elements in the heap
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    // Helper function to move the element at index i down to its correct position
    heapifyDown(index) {
        let left = 2 * index + 1;
        let right = 2 * index + 2;
        let smallest = index;

        if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
            smallest = left;
        }

        if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
            smallest = right;
        }

        if (smallest !== index) {
            this.swap(index, smallest);
            this.heapifyDown(smallest);
        }
    }

    // Helper function to move the element at index i up to its correct position
    heapifyUp(index) {
        let parent = Math.floor((index - 1) / 2);
        
        if (index > 0 && this.heap[index] < this.heap[parent]) {
            this.swap(index, parent);
            this.heapifyUp(parent);
        }
    }

    // Insert a new value into the heap
    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    // Remove the root (smallest) element
    remove() {
        if (this.heap.length === 0) return null;
        const root = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown(0);
        return root;
    }

    // Peek the root (smallest) element
    peek() {
        return this.heap[0];
    }
}

// Example
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // Output: 5


//log(k)

function findKthLargest(nums, k) {
    const minHeap = new MinHeap();
    
    for (const num of nums) {
      minHeap.push(num);
      if (minHeap.size() > k) {
        minHeap.pop();
      }
    }
    
    return minHeap.peek();
  }


  