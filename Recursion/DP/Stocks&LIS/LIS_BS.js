function lengthOfLIS(nums) {
    let tails = [];

    for (let num of nums) {
        let left = 0, right = tails.length;

        // Binary search to find the insertion point
        while (left < right) {
            let mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        // Replace or extend
        tails[left] = num;
    }

    return tails.length;
}

console.log(lengthOfLIS([9, 1, 5, 3, 4]));  // Output: 3 (for subsequence like [1, 3, 4])

//Intuition:
// The idea is to maintain an array 'tails' where each element at index 'i' represents the smallest tail of all increasing subsequences of length 'i + 1' found so far. 
// By using binary search, we can efficiently find the position to either replace an existing tail or extend the array with a new tail, ensuring that 'tails' remains sorted and minimal. 
// The length of the 'tails' array at the end gives us the length of the longest increasing subsequence.
