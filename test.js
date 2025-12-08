// This question is similar to Painter's Partition Problem and Allocate books or Book Allocation Problem.
// Its to split an array into m subarrays such that the largest sum among these subarrays is minimized.

function getValue(nums, k) {
    let left = 0;
    let right = 0;
    for (let i = 0; i < k; i++) {
        left += nums[i];
    }

    for (let i = k; i < nums.length; i++) {
        right += nums[i];
    }
    return Math.max(left, right);
}

var splitArray = function (nums) {
    let ans = Infinity;
    for (let i = 1; i < nums.length; i++) {
        ans = Math.min(ans, getValue(nums, i));
    }
    return ans;
};


// Example usage:
console.log(splitArray([7, 2, 5, 10, 8], 2)); // Output: 18
console.log(splitArray([1, 2, 3, 4, 5], 2)); // Output: 9
// console.log(splitArray([1,4,4], 3));     // Output: 4   