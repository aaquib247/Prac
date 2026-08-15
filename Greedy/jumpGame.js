// Intuition: We can keep track of the maximum index we can reach as we iterate through the array. 
// If at any point the current index is greater than the maximum reachable index, we cannot proceed further and return false. 
// If we can reach or exceed the last index, we return true.

//Time Complexity: O(n) - We traverse the array once.
//Space Complexity: O(1) - We use a constant amount of space.
function canJump(nums) {
    let maxReach = 0;

    for (let i = 0; i < nums.length; i++) {
        // if current index is beyond maxReach — stuck
        if (i > maxReach) return false;

        // update how far we can reach
        maxReach = Math.max(maxReach, i + nums[i]);
    }

    return true;
}

console.log(canJump([2, 3, 1, 1, 4])); // true
console.log(canJump([3, 2, 1, 0, 4])); // false

