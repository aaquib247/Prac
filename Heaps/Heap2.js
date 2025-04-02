class MinHeap {
    constructor() {
      this.heap = [];
    }
  
    insert(value) {
      // Add the new value to the end of the heap array
      this.heap.push(value);
      // Restore the heap property
      this.bubbleUp(this.heap.length - 1);
    }
  
    remove() {
      if (this.heap.length === 0) {
        throw new Error("Heap is empty");
      }
      // Remove the root (minimum value)
      const min = this.heap[0];
      // Move the last element to the root position
      const last = this.heap.pop();
      if (this.heap.length > 0) {
        this.heap[0] = last;
        // Restore the heap property
        this.sinkDown(0);
      }
      return min;
    }
  
    // Restore heap property from index upwards (used after insertion)
    bubbleUp(index) {
      while (index > 0) {
        let parentIndex = Math.floor((index - 1) / 2);
        if (this.heap[index] >= this.heap[parentIndex]) {
          break; // Heap property restored
        }
        // Swap current node with its parent
        [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
        index = parentIndex;
      }
    }
  
    // Restore heap property from index downwards (used after removal)
    sinkDown(index) {
      while (true) {
        let left = 2 * index + 1;
        let right = 2 * index + 2;
        let smallest = index;
        // Find the smallest of the current node and its children
        if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
          smallest = left;
        }
        if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
          smallest = right;
        }
        if (smallest === index) {
          break; // Heap property restored
        }
        // Swap current node with the smallest child
        [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
        index = smallest;
      }
    }
  
    // Peek at the minimum value (root of the heap)
    peek() {
      if (this.heap.length === 0) {
        throw new Error("Heap is empty");
      }
      return this.heap[0];
    }
  
    // Get the size of the heap
    size() {
      return this.heap.length;
    }
  }
  
  // Example usage:
  let minHeap = new MinHeap();
  minHeap.insert(4);
  minHeap.insert(2);
  minHeap.insert(8);
  minHeap.insert(1);
  minHeap.insert(5);
  
  console.log(minHeap.peek()); // Output: 1
  
  console.log(minHeap.remove()); // Output: 1
  console.log(minHeap.remove()); // Output: 2
  
  minHeap.insert(3);
  
  console.log(minHeap.remove()); // Output: 3
  console.log(minHeap.remove()); // Output: 4
  console.log(minHeap.remove()); // Output: 5
  console.log(minHeap.remove()); // Output: 8
  