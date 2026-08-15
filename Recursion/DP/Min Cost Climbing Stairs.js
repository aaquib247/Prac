var minCostClimbingStairs = function (cost) {

    let dp = Array(cost.length).fill(-1)

    function mincost(n) {
        if (n <= 1) return cost[n]
        if (dp[n] !== -1) return dp[n]

        let f = mincost(n - 1) + cost[n]
        let s = Infinity;
        if (n > 1)
            s = mincost(n - 2) + cost[n]

        return dp[n] = Math.min(f, s)
    }

    return Math.min(mincost(cost.length - 1), mincost(cost.length - 2));

};
//TC - O(N) and SC - O(N) and without memoization the TC will be O(2^N)

// Example usage:
console.log(minCostClimbingStairs([10, 15, 20])); // Output: 15
console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])); // Output: 6
console.log(minCostClimbingStairs([0, 0, 0, 0, 1, 1])); // Output: 0
console.log(minCostClimbingStairs([1, 2, 3, 4, 5])); // Output: 6
