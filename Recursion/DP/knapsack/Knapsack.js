//TC - O(2^N) and SC - O(N)
function knapsack(weights, values, n, capacity) {
    function find(ind, W) {
        if (ind === 0) {
            if (weights[ind] <= W)
                return values[0]
            else
                return 0;
        }
        let nT = 0 + find(ind - 1, W);
        let T = -Number.MAX_SAFE_INTEGER;
        if (weights[ind] <= W)
            T = values[ind] + find(ind - 1, W - weights[ind])
        return Math.max(nT, T);
    }
    return find(n - 1, capacity);
}
// Example usage:
const weights = [2, 3, 4, 5];
const values = [3, 4, 5, 6];
const capacity = 5;
console.log(knapsack(weights, values, weights.length, capacity)); // Output: 7

//---------------Memoization
//TC - O(N*W) and SC - O(N*W) + O(N)
function knapsackMemo(weights, values, n, capacity) {
    let dp = Array.from({ length: n }, () => Array(capacity + 1).fill(-1))

    function find(ind, W) {
        if (ind === 0) {
            if (weights[ind] <= W)
                return values[0]
            else
                return 0;
        }

        if (dp[ind][W] != -1)
            return dp[ind][W]
        let nT = 0 + find(ind - 1, W);
        let T = -Number.MAX_SAFE_INTEGER;
        if (weights[ind] <= W)
            T = values[ind] + find(ind - 1, W - weights[ind])
        return dp[ind][W] = Math.max(nT, T);
    }
    return find(n - 1, capacity);
}
// Example usage:
const weight = [2, 3, 4, 5];
const value = [3, 4, 5, 6];
const cap = 5;
console.log(knapsackMemo(weight, value, weight.length, cap)); // Output: 7

//---------------Tabulation
//TC - O(N*W) and SC - O(N*W) + O(N)
function knapsackTab(weights, values, n, capacity) {
    let dp = Array.from({ length: n }, () => Array(capacity + 1).fill(0));

    for (let i = weights[0]; i <= capacity; i++) {
        dp[0][i] = values[0]
    }
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j <= capacity; j++) {
            let nT = 0 + dp[i - 1][j];
            let T = -Number.MAX_SAFE_INTEGER;
            if (weights[i] <= j)
                T = values[i] + dp[i-1][j - weights[i]]

            dp[i][j] = Math.max(nT, T);
        }
    }
   return dp[n-1][capacity]
}
// Example usage:
const weight1 = [2, 3, 4, 5];
const value1 = [3, 4, 5, 6];
const cap1 = 5;
console.log(knapsackTab(weight1, value1, weight1.length, cap1)); // Output: 7
