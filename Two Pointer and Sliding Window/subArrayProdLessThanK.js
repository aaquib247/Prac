//TC: O(N)
//SC: O(1)

var numSubarrayProductLessThanK = function (nums, k) {

    let n = nums.length;
    let l = 0;
    let r = 0;
    let p = 1;
    let count = 0;

    for (r = 0; r < n; r++) {
        p = p * nums[r];
        while (p >= k && l <= r) {
            p = p / nums[l]
            l++;
        }

        count += r - l + 1;
    }
    return count;

};

// Example usage:
console.log(numSubarrayProductLessThanK([10, 5, 2, 6], 100)); // Output: 8
console.log(numSubarrayProductLessThanK([1, 2, 3], 0)); // Output: 0