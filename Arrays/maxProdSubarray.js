
//TC - O(N2) and SC - O(1)

function maxProductSubArray(nums) {
    let result = nums[0];
    for (let i = 0; i < nums.length - 1; i++) {
        let p = nums[i];
        for (let j = i + 1; j < nums.length; j++) {
            result = Math.max(result, p);
            p *= nums[j];
        }
        result = Math.max(result, p); // manages (n-1)th term
    }
    return result;
}

let nums = [1, 2, -3, 0, -4, -5];
console.log("The maximum product subarray: " + maxProductSubArray(nums));

//Optimal


//O(N) and O(1)

function maxProductSubArray(arr) {
    let n = arr.length; // size of array.

    let pre = 1, suff = 1;
    let ans = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < n; i++) {
        if (pre === 0) pre = 1;
        if (suff === 0) suff = 1;
        pre *= arr[i];
        suff *= arr[n - i - 1];
        ans = Math.max(ans, Math.max(pre, suff));
    }
    return ans;
}

let arr = [2,3,-4,2];
console.log("The maximum product subarray is: " + maxProductSubArray(arr));


