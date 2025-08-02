function maxProductSubArray(nums) {
    let result = nums[0];
    for (let i = 0; i < nums.length - 1; i++) {
        let p = nums[i];
        for (let j = i + 1; j < nums.length; j++) {
            p *= nums[j];
            result = Math.max(result, p);
        }
    }
    return result;
}

let nums = [2,3,-2,4];
console.log("The maximum product subarray: " + maxProductSubArray(nums));
