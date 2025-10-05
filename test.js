var cherryPickup = function(grid) {
    const n = grid.length;

    // 3D DP memoization table
    const dp = new Array(n).fill().map(() =>
        new Array(n).fill().map(() =>
            new Array(n).fill(-1)
        )
    );

    function dfs(r1, c1, r2) {
        let c2 = r1 + c1 - r2;

        // Bounds or thorns
        if (
            r1 >= n || c1 >= n || r2 >= n || c2 >= n ||
            grid[r1][c1] === -1 || grid[r2][c2] === -1
        ) {
            return -Infinity;
        }

        // Reached bottom-right
        if (r1 === n - 1 && c1 === n - 1) {
            return grid[r1][c1];
        }

        // Memoized
        if (dp[r1][c1][r2] !== -1) {
            return dp[r1][c1][r2];
        }

        let result = grid[r1][c1];
        if (r1 !== r2 || c1 !== c2) {
            result += grid[r2][c2];
        }

        // Try all 4 move combinations
        let temp = Math.max(
            dfs(r1 + 1, c1, r2 + 1),  // both down
            dfs(r1, c1 + 1, r2),      // both right
            dfs(r1 + 1, c1, r2),      // p1 down, p2 right
            dfs(r1, c1 + 1, r2 + 1)   // p1 right, p2 down
        );

        result += temp;
        dp[r1][c1][r2] = result;
        return result;
    }

    const res = dfs(0, 0, 0);
    return Math.max(0, res);  // cannot return negative
};
