var maxCoins = function(nums) {
    const n = nums.length;

    // Add 1 at both ends to handle boundaries
    nums.unshift(1);
    nums.push(1);

    // Memoization table
    const dp = Array.from({ length: n + 2 }, () => Array(n + 2).fill(-1));

    function burst(i, j) {
        // No balloons to burst between i and j
        if (i > j) return 0;

        if (dp[i][j] !== -1) return dp[i][j];

        let maxCoins = 0;

        // Try bursting each balloon in the range [i, j]
        for (let k = i; k <= j; k++) {
            const coins = 
                nums[i - 1] * nums[k] * nums[j + 1] +  // coins from bursting k last
                burst(i, k - 1) +                      // coins from left part
                burst(k + 1, j);                       // coins from right part

            maxCoins = Math.max(maxCoins, coins);
        }

        dp[i][j] = maxCoins;
        return maxCoins;
    }

    return burst(1, n);
};

// 🧪 Example:
const nums = [3, 1, 5, 8];
console.log("Max coins you can collect:", maxCoins(nums));  // Output: 167
