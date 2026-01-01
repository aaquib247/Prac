function getMaximumGold(grid) {
    const n = grid.length;
    const m = grid[0].length;
    let maxGold = 0;

    const dirs = [[1,0], [-1,0], [0,1], [0,-1]];

    function dfs(r, c) {
        // out of bounds or no gold
        if (r < 0 || c < 0 || r >= n || c >= m || grid[r][c] === 0) {
            return 0;
        }

        let gold = grid[r][c];
        grid[r][c] = 0; // mark visited

        let best = 0;
        for (let [dr, dc] of dirs) {
            best = Math.max(best, dfs(r + dr, c + dc));
        }

        grid[r][c] = gold; // backtrack
        return gold + best;
    }

    // try starting from every gold cell
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] > 0) {
                maxGold = Math.max(maxGold, dfs(i, j));
            }
        }
    }

    return maxGold;
}

grid = [
  [0,6,0],
  [5,8,7],
  [0,9,0]
]
console.log(getMaximumGold(grid)); // Output: 24

//TC: O(N * M * 4^(N*M)) in worst case where all cells have gold
//SC: O(N * M) for recursion stack in worst case