/**
 * LeetCode 695: Max Area of Island
 * 
 * @param {number[][]} grid - 2D binary grid (1 = land, 0 = water)
 * @return {number} - Maximum area of an island
 */
function maxAreaOfIsland(grid) {
    let maxArea = 0;
    const rows = grid.length;
    const cols = grid[0].length;

    // DFS to calculate area of connected land
    function dfs(r, c) {
        // Base case: out of bounds or water or already visited
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== 1) {
            return 0;
        }

        grid[r][c] = 0; // Mark cell as visited
        // Count this cell + all 4 connected directions
        return 1 +
            dfs(r + 1, c) +
            dfs(r - 1, c) +
            dfs(r, c + 1) +
            dfs(r, c - 1);
    }

    // Traverse all cells in the grid
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 1) {
                const area = dfs(r, c);
                maxArea = Math.max(maxArea, area);
            }
        }
    }

    return maxArea;
}

const grid = [
    [0,0,1,0,0,0,0],
    [0,1,1,1,0,0,0],
    [0,0,1,0,0,1,1],
    [0,0,0,0,0,1,1]
];

console.log(maxAreaOfIsland(grid)); // Output: 5
