const MinHeap = require('heap'); // Import heap library

class MeanOfLastKElements {
  constructor(K, X) {
    this.K = K;               // Number of elements to consider for mean
    this.X = X;               // Number of largest elements to exclude
    this.queue = [];          // Queue to store the last K elements
    this.sum = 0;            // Sum of the elements in the queue
    this.minHeap = new MinHeap((a, b) => a - b); // Min-Heap to store the largest X elements
    this.elementCount = new Map();  // To track occurrences of elements
  }

  addNumber(num) {
    // If the queue is full, remove the oldest number
    if (this.queue.length === this.K) {
      const oldest = this.queue.shift(); // Remove the oldest element
      this.sum -= oldest; // Update the sum

      // Check if the removed element was among the largest X elements
      if (this.minHeap.size() > 0 && oldest === this.minHeap.peek()) {
        this.minHeap.pop();
      }

      // Update element count map
      this.elementCount.set(oldest, (this.elementCount.get(oldest) || 1) - 1);
      if (this.elementCount.get(oldest) === 0) this.elementCount.delete(oldest);
    }

    // Add the new number to the queue and update the sum
    this.queue.push(num);
    this.sum += num;

    // Update min-heap for the largest X elements
    if (this.minHeap.size() < this.X) {
      this.minHeap.push(num);
    } else if (this.minHeap.peek() < num) {
      this.minHeap.pop();
      this.minHeap.push(num);
    }

    // Update the element count map
    this.elementCount.set(num, (this.elementCount.get(num) || 0) + 1);

    // Calculate the mean of the last K elements excluding the largest X elements
    const exclusionSum = [...this.minHeap.toArray()].reduce((sum, value) => sum + value, 0);
    return (this.sum - exclusionSum) / (this.queue.length - this.X);
  }
}

// Example usage
const stream = new MeanOfLastKElements(5, 2);
const numbers = [50, 60, 70, 50, 100, 120, 80, 140];
const means = [];

// Process each number in the stream and store the mean
for (const num of numbers) {
  const mean = stream.addNumber(num);
  means.push(mean);
}

console.log(means);  // Output will show the mean after each addition
