//Time Complexity: O(n log n) due to sorting and SC(1)
function findKthLargest(nums, k) {
    nums.sort((a, b) => b - a); // Sort in descending order
    return nums[k - 1];
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