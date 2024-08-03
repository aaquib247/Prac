class MeanOfLastKElements {
    constructor(K) {
      this.K = K;             // The number of elements to consider for mean
      this.queue = [];        // Queue to store the last K elements
      this.sum = 0;           // Current sum of elements in the queue
    }
  
    // Method to add a new number to the stream and calculate the mean
    addNumber(num) {
      // Add the new number to the queue
      if (this.queue.length === this.K) {
        // If the queue is full, remove the oldest number and adjust the sum
        const oldest = this.queue.shift();
        this.sum -= oldest;
      }
      
      // Add the new number to the queue and update the sum
      this.queue.push(num);
      this.sum += num;
      
      // Calculate and return the mean of the last K elements
      return this.sum / this.queue.length;
    }
  }
  
  // Example usage
  const stream = new MeanOfLastKElements(5);
  const numbers = [50, 60, 70, 50, 100, 120, 80, 140];
  const means = [];
  
  // Process each number in the stream and store the mean
  for (const num of numbers) {
    const mean = stream.addNumber(num);
    means.push(mean);
  }
  
  console.log(means);  // Output: [50, 55, 60, 57.5, 66, 80, 84, 100]
  