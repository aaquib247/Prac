//TC - O(2^n) and SC - O(N)
var numSubseq = function (nums, target) {
    function sumTarget(i, target) {
        // If target becomes 0, we found a valid subset, return 1.
        if (target === 0) return 1;
        if (i === 0) return (nums[i] === target) ? 1:0;
        // Recursively check two possibilities:
        // 1. Don't include nums[i] in the subset (non-pick case).
        let np = sumTarget(i - 1, target);
        // 2. Include nums[i] in the subset (pick case).
        let p = 0;
        if(nums[i] <= target)
           p = sumTarget(i - 1, target - nums[i]);
        // Total ways is the sum of both cases.
        return np + p;
    }

    // Start the recursion from the last element and the target sum
    return sumTarget(nums.length - 1, target);
};

// Example usage:
console.log(numSubseq([1, 1, 1], 2));  // Output: 2 (subsets: [1, 1] and [1, 1])
console.log(numSubseq([1, 2, 3], 3));  // Output: 2 (subsets: [1, 2] and [3])

//----------------
//Memoization
//TC - O(n*target) and SC - O(n*target)+O(N)
var numSubseqMemo = function (nums, target) {
    let dp = Array.from({length:nums.length+1},()=>Array(target+1).fill(-1))

    function sumTargetMemo(i, target) {

        if (target === 0) return 1;
        if (i === 0) return (nums[i] === target) ? 1:0;


        if(dp[i][target] !== -1)
             return dp[i][target];

        let np = sumTargetMemo(i - 1, target);
        let p = 0;
        if(nums[i] <= target)
          p = sumTargetMemo(i - 1, target - nums[i]);
        return dp[i][target] = np + p;
    }
    return sumTargetMemo(nums.length - 1, target);
};

// Example usage:
console.log(numSubseqMemo([1, 1, 1], 2));  // Output: 2 (subsets: [1, 1] and [1, 1])
console.log(numSubseqMemo([1, 2, 3], 3));  // Output: 2 (subsets: [1, 2] and [3])

//Tabulation
//TC - O(n*target) and SC - O(n*target)
var numSubseqTab = function (nums, target) {
    let dp = Array.from({length:nums.length+1},()=>Array(target+1).fill(-1))
    for(let i=0;i<nums.length;i++){
        dp[i][0] = 1;
    }

    if(nums[0] <= target)
    dp[0][nums[0]] = 1;

    for(let i=1;i<nums.length;i++){
        for(let j=1;j<=target;j++){
            let np = dp[i-1][j]
            let p = 0;
            if(nums[i]<= j)
                p = dp[i-1][j-nums[i]]
            dp[i][j] = np+p;
        }
    }
    return dp[nums.length-1][target]
};

// Example usage:
console.log(numSubseqTab([1, 1, 1], 2));  // Output: 2 (subsets: [1, 1] and [1, 1])
console.log(numSubseqTab([1, 2, 3], 3));  // Output: 2 (subsets: [1, 2] and [3])


//---------------------------------
// Part 1: Extra edge case for the problem Count Subsets with Sum K
// In the problem Count Subsets with Sum K, the problem constraints stated that an array element is greater than 0, so the code we have written there works perfectly for the given constraints.
// If the constraints mentioned that an array element can also be equal to 0 and the target sum can also be 0, then that code will fail. To understand it we will take an example:
// Let the target arr = [0,0,1] and the target = 1.
// The previous code will give us the answer 1 as it first takes the element arr[2] and then finds the answer by picking it. Then from the base condition,
//  we will return 0 ( as the target will become 0 by picking 1).
//  But for this question, the answer will be 4 with the following subsets({0,1},{0,1},{0,0,1} and {1})
// Therefore we need to modify the base conditions in order to handle the changes. These are the base conditions of that problem.


// In Base Case this Part  needs to be added
// First of all, we will remove target==0 because now when target ==0, there can be many 0s present in the array which needs to be counted in the answer.
// Now, the following cases can arise when we are at index 0, if the target sum is 0 and the first index is also 0, like in case [0,1], we can form the subset in two ways, 
// either by considering the first element or leaving it, so we can return 2.
// Else at index 0, if target == 0, and the first element is not 0, it means we will not pick the first element so we just return 1 way.
// Or if at index 0, when the first element is not 0, and the target is equal to the first element , then we will include it in the subset and we will return 1 way.
// Else in all other cases, we simply return 0.

if(ind == 0){
    if(target==0 && arr[0]==0)
        return 2;
    if(target==0 || target == arr[0])
        return 1;
    return 0;
}

function sumTarget(i, target) {
    if (i === 0) {
        if (target === 0 && nums[0] === 0) return 2;
        if (target === 0 || nums[0] === target) return 1;
        return 0;
    }

    let np = sumTarget(i - 1, target);
    let p = 0;
    if (nums[i] <= target)
        p = sumTarget(i - 1, target - nums[i]);

    return np + p;
}


// Easiest Way
// Count the number of zeroes in it
// and then find Math.pow(2,no) and multiply by your answer

//Modified Problem :: https://takeuforward.org/data-structure/count-partitions-with-given-difference-dp-18/

var numSubseqwithD = function (nums, diff) {
    let total = 0;
    let target = 0;
    for(let i = 0;i<nums.length;i++){
        total+= nums[i]
    }
    if ((total - diff) % 2 !== 0 || total - diff < 0) {
        return 0;  // No solution exists if the target is not valid
    }
     target = (total - diff)/2;
    function sumTarget(i, target) {
        if (target === 0) return 1;
        if (i === 0) return (nums[i] === target) ? 1:0;
        let np = sumTarget(i - 1, target);
        let p = 0;
        if(nums[i] <= target)
           p = sumTarget(i - 1, target - nums[i]);
        return np + p;
    }

    return sumTarget(nums.length - 1, target);
};

// Example usage:
console.log(numSubseqwithD([5,2,6,4], 3)); 

//Memoization

var numSubseqwithD = function (nums, diff) {
    let total = 0;
    let target = 0;
    for(let i = 0;i<nums.length;i++){
        total+= nums[i]
    }
    if ((total - diff) % 2 !== 0 || total - diff < 0) {
        return 0;  // No solution exists if the target is not valid
    }
     target = (total - diff)/2;
     let dp = Array.from({length:nums.length+1},()=>Array(target+1).fill(-1))

    function sumTarget(i, target) {

        if (target === 0) return 1;
        if (i === 0) return (nums[i] === target) ? 1:0;
        if(dp[i][target] !== -1)
            return dp[i][target];

        let np = sumTarget(i - 1, target);
        let p = 0;
        if(nums[i] <= target)
           p = sumTarget(i - 1, target - nums[i]);
        return dp[i][target] = np + p;
    }

    return sumTarget(nums.length - 1, target);
};

// Example usage:
console.log(numSubseqwithD([5,2,6,4], 3)); 