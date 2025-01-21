
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