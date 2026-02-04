var findPaths = function (m, n, maxMove, startRow, startColumn) {
    const MOD = 1000000007;

    // Memoization table to store results of subproblems
      const memo = Array.from({ length: m }, () => 
        Array.from({ length: n }, () => 
            Array(maxMove + 1).fill(-1)
        )
    );

    // Helper function to explore the grid recursively
    function find(i, j, move) {
        // If out of bounds, return 1 (successful exit)
        if (i < 0 || j < 0 || i >= m || j >= n) {
            return 1;
        }

        // If no moves left, return 0 (can't move anymore)
        if (move === 0) {
            return 0;
        }

        // Check memoization table
        if (memo[i][j][move] !== -1 && move > 0) {
            return memo[i][j][move];
        }

        // Explore all 4 possible directions
        let up = find(i - 1, j, move - 1);
        let down = find(i + 1, j, move - 1);
        let left = find(i, j - 1, move - 1);
        let right = find(i, j + 1, move - 1);

        // Memoize the result and return the total paths, modulo MOD
        memo[i][j][move] = (up + down + left + right) % MOD;
        return memo[i][j][move];
    }

    // Start the recursive process from the given start position
    return find(startRow, startColumn, maxMove);
};

console.log(findPaths(2, 2, 2, 0, 0)); // Output: 6
console.log(findPaths(1, 3, 3, 0, 1)); // Output: 12