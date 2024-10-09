//https://www.naukri.com/code360/problems/maximum-sum-of-non-adjacent-elements_843261?utm_source=striver&utm_medium=website&utm_campaign=a_zcoursetuf
// SAME AS PICK AND NON PICK

function maxSub(arr) {
    let l = arr.length;
    function maxSumNonAjd(n) {
        if (n === 0)
            return arr[n];
        if (n < 0)
            return 0;

        let pick = arr[n] + maxSumNonAjd(n - 2)
        let nonpick = 0 + maxSumNonAjd(n - 1)

        return Math.max(pick, nonpick)

    }
    return maxSumNonAjd(l - 1)
}

console.log(maxSub([2, 1, 4, 9]))

//USING MEMOIZATION
// TC - O(N) and SC - O(N) + O(N)(recursion stack space)
function maxSub(arr) {
    let l = arr.length;
    const dp = Array(l).fill(-1);
    function maxSumNonAjd(n) {
        if (n === 0)
            return arr[n];
        if (n < 0)
            return 0;

        if (dp[n] !== -1)
            return dp[n]

        let pick = arr[n] + maxSumNonAjd(n - 2)
        let nonpick = 0 + maxSumNonAjd(n - 1)

        dp[n] = Math.max(pick, nonpick)
        return dp[n]

    }
    return maxSumNonAjd(l - 1)
}

console.log(maxSub([2, 1, 4, 9]))

// Tabulation
// TC - O(N) and SC - O(N)
function maxSub(arr) {
    let l = arr.length;
    const dp = Array(l).fill(-1);
    dp[0] = arr[0];
    const neg = 0;

    for (let i = 1; i < l; i++) {
        let pick = arr[i];
        if (i > 1) {
            pick += dp[i - 2]
        }
        let nonpick = 0 + dp[i - 1]
        dp[i] = Math.max(pick, nonpick)
    }

    return dp[l-1]
}

console.log(maxSub([2, 1, 4, 9]))

// Tabulation with space optimization
// TC - O(N) and SC - O(1)
// we need only last 2 values, so take prev and prev2 and current. Keep proceeding and update prev and prev2
function maxSub(arr) {
    let l = arr.length;

    let prev = arr[0];
    let prev2 = 0;

    for (let i = 1; i < l; i++) {
        let pick = arr[i];
        if (i > 1) {
            pick += prev2
        }
        let nonpick = 0 + prev
        let curr = Math.max(pick, nonpick)
        prev2 = prev;
        prev = curr;
    }

    return prev
}

console.log(maxSub([2, 1, 4, 9]))

// Almost similar question
// https://leetcode.com/problems/house-robber-ii/