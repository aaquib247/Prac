//TC- O(2^m+n) and SC- O(m+n)
var uniquePathsWithObstacles = function (obstacleGrid) {
    let m = obstacleGrid.length;
    let n = obstacleGrid[0].length;

    function findObs(i,j) {
        if(i === 0 && j === 0 && obstacleGrid[i][j] === 0)
            return 1;

        if(i < 0 || j < 0 || obstacleGrid[i][j])
            return 0;

        let up = findObs(i - 1, j)
        let left = findObs(i, j - 1)
        return up + left
    }
    return findObs(m - 1, n - 1)
};

//Memoization
//TC- O(m*n) and SC- O(m+n)+O(m*n)
var uniquePathsWithObstacles = function (obstacleGrid) {
    let m = obstacleGrid.length;
    let n = obstacleGrid[0].length;
    let dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(-1));

    function findObs(i,j) {
        if(i === 0 && j === 0 && obstacleGrid[i][j] === 0)
            return 1;

        if(i < 0 || j < 0 || obstacleGrid[i][j])
            return 0;

        if(dp[i][j] !== -1)
            return dp[i][j]

        let up = findObs(i - 1, j)
        let left = findObs(i, j - 1)

        return dp[i][j] = up + left
    }
    return findObs(m - 1, n - 1)
};

//Unique Path III - TC: O(4^m*n) and SC: O(m*n)
//Intuition: We need to find all paths from start to end that cover all empty squares exactly once. 
// We can use backtracking to explore all possible paths while keeping track of visited squares and the count of remaining empty squares. 
// When we reach the end square, we check if all empty squares have been visited.
var uniquePathsIII = function (grid) {
    let n = grid.length;
    let m = grid[0].length;
    let visited = Array.from({ length: n }, () => new Array(m).fill(false));
    
    // Count empty squares and find start
    let emptyCount = 0;
    let startRow, startCol;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === 0) emptyCount++;
            if (grid[i][j] === 1) {
                startRow = i;
                startCol = j;
                emptyCount++; // Start counts as empty
            }
        }
    }
    
    function findObs(i, j, remaining) {
        // Base case: out of bounds or obstacle or already visited
        if (i < 0 || i >= n || j < 0 || j >= m || 
            grid[i][j] === -1 || visited[i][j]) {
            return 0;  // Changed from return; to return 0;
        }
        
        // Found end
        if (grid[i][j] === 2) {
            return remaining === 0 ? 1 : 0;  // Only count if visited all
        }
        
        visited[i][j] = true;
        
        let down = findObs(i + 1, j, remaining - 1) || 0;  // Add || 0
        let left = findObs(i, j - 1, remaining - 1) || 0;
        let right = findObs(i, j + 1, remaining - 1) || 0;
        let up = findObs(i - 1, j, remaining - 1) || 0;
        
        visited[i][j] = false;  // BACKTRACK - this was missing!
        
        return up + left + right + down;
    }
    
    return findObs(startRow, startCol, emptyCount - 1);  // Start from actual start
};

//function dfs(i, j) {
//     if (grid[i][j] === 2) {
//         return 1;  // ❌ Always count when reaching end
//     }
    
//     visited[i][j] = true;
    
//     let count = 0;
//     count += dfs(i+1, j);
//     count += dfs(i-1, j);
//     count += dfs(i, j+1);
//     count += dfs(i, j-1);
    
//     visited[i][j] = false;
//     return count;
// }
// ```

// **What happens:**
// ```
// Path 1: Start → Right → Down → End
// Visits: (0,0) → (0,1) → (1,1) → (1,2)
// Only 4 squares visited, but still counts as 1! ❌

// Path 2: Start → Down → Right → Right → End  
// Visits: (0,0) → (1,0) → (1,1) → (1,2)
// Only 4 squares visited, counts as 1! ❌

// PROBLEM: Both paths skip (0,2) and (1,0) but still get counted!