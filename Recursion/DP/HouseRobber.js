
//Memoization TC = O(N) and Sc - O(N) + O(N) [Recursion + dp array]
var rob = function (nums) {
    let dp = new Array(nums.length).fill(-1);
    function max(index) {
       
       if(index === 0) return nums[index]
       if(index < 0) return 0
       if(dp[index] != -1) return dp[index]

        let p = nums[index] + max(index - 2);
        let up = 0 + max(index - 1);
        return dp[index] = Math.max(p,up)

    }
    return max(nums.length - 1)

};

//Tab TC = O(N) and Sc - O(N) [dp array]
var rob = function (nums) {
    let dp = new Array(nums.length).fill(-1);
    dp[0] = nums[0]
    for (let i = 1; i < nums.length; i++) {
        let p = nums[i];
        if (i > 1)
            p += dp[i - 2];
        let up = 0 + dp[i - 1];
        dp[i] = Math.max(p, up)
    }
    return dp[nums.length - 1]

};

// SpaceOptimization -- TC = O(N) and Sc - O(1) [NO Recursion + NO dp array]
var rob = function (nums) {
    let dp = new Array(nums.length).fill(-1);
    let prev = nums[0]
    let prev2 = 0;
    for (let i = 1; i < nums.length; i++) {
        let p = nums[i];
        if (i > 1)
            p += prev2;
        let up = 0 + prev;
        curr = Math.max(p, up)
        prev2 = prev;
        prev = curr
    }
    return prev

};

//-------------------------------HOUSE ROBBER 2-----------------------------------
// In this last and first are neighbour - its a circle not a linear
var rob = function(nums) {
    // Helper function to solve the "House Robber" problem for a linear array
    function robLinear(nums) {
        let prev2 = 0, prev1 = 0;
        for (let i = 0; i < nums.length; i++) {
            let current = Math.max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = current;
        }
        return prev1;
    }
    let option1 = robLinear(nums.slice(0, nums.length - 1));
    let option2 = robLinear(nums.slice(1));
    return Math.max(option1, option2);
};
