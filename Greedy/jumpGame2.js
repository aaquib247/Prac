//In this problem, we are given an array of non-negative integers where each element represents the maximum jump length from that position. 
// The goal is to determine the minimum number of jumps required to reach the last index of the array, starting from the first index.
//We can use a greedy approach to solve this problem. We will keep track of the current jump's end and the maximum reachable index.
//  When we reach the end of the current jump, we will increment the jump count and update the current jump's end to the maximum reachable index.

//Time Complexity: O(n) - We traverse the array once.
//Space Complexity: O(1) - We use a constant amount of space.

function jump(nums) {
    let jumps      = 0;
    let currentEnd = 0;  // boundary of current jump
    let max   = 0;  // furthest we can reach

    // do not include last index — no need to jump from there
    for (let i = 0; i < nums.length - 1; i++) {
        // update furthest reachable
        max = Math.max(max, i + nums[i]);

        // reached boundary of current jump level
        if (i === currentEnd) {
            jumps++;
            currentEnd = max; // move to next level
        }
    }

    return jumps;
}

console.log(jump([2, 3, 1, 1, 4])); // 2    
console.log(jump([2, 3, 0, 1, 4])); // 2