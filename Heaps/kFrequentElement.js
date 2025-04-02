function topKFrequent(nums, k) {
    // Count frequencies
    const frequencyMap = {};
    for (const num of nums) {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    }
    
    // Create min-heap and maintain top k elements
    const minHeap = new MinHeap();
    for (const [num, freq] of Object.entries(frequencyMap)) {
        minHeap.push([num, freq]);
        if (minHeap.size() > k) {
            minHeap.pop(); //based in frequency
        }
    }
    
    // Extract and return results
    const result = [];
    while (minHeap.size() > 0) {
        result.push(Number(minHeap.pop()[0]));
    }
    return result.reverse();
}

console.log(topKFrequent([1,1,1,2,2,3], 2)); // Output: [1, 2]