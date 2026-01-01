
//This is O(2^n) in worst-case because you're checking all combinations of picks and skips.

function lengthOfLIS(nums) {
    const n = nums.length;

    // Start recursion from index 0 and with prev index as -1 (nothing picked yet)
    function lis(index, prev) {
        if (index === n) return 0;

        // Option 1: skip current element
        let notPick = lis(index + 1, prev);

        // Option 2: pick current if valid
        let pick = 0;
        if (prev === -1 || nums[index] > nums[prev]) {
            pick = 1 + lis(index + 1, index);
        }

        return Math.max(pick, notPick);
    }

    return lis(0, -1);
}

// 🧪 Test
const nums = [10, 9, 2, 5, 3, 7, 101, 18];
console.log("LIS Length:", lengthOfLIS(nums));  // Output is 4

//------------------Memoization Approach------------------

//another better way: (n^2)
//making all the vaules in DP as 1 (length of itself) and now if it encounters less tahn current it add to its size.
function lengthLIS(arr) {
    const n = arr.length;
    let dp = new Array(n).fill(1)

    for (let i = 0; i < n; i++) {
        for (let prev = 0; prev < i; prev++) {
            if (arr[i] > arr[prev])
                dp[i] = Math.max(dp[i], 1 + dp[prev])
        }
    }
    return Math.max(...dp)
}

// 🧪 Test
const arr = [10, 9, 2, 5, 3, 7, 101, 18];
console.log("LIS Length via Tab is  :", lengthLIS(arr));  // Output: 4

//Longest decreasing subsequence can be found by reversing the array and applying the same LIS logic.   
//The code is below is similar to above code with just a small change in the condition.
function lengthLDS(arr) {
    const n = arr.length;
    let dp = new Array(n).fill(1)

    for (let i = 0; i < n; i++) {
        for (let prev = 0; prev < i; prev++) {
            if (arr[i] < arr[prev])  // Change is here for decreasing
                dp[i] = Math.max(dp[i], 1 + dp[prev])
        }
    }
    return Math.max(...dp)
}               