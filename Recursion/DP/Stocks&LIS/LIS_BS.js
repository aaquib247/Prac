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
