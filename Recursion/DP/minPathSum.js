//TC - O(2^m+n) and SC - O(m+n)
var minPathSum = function (grid) {
    let m = grid.length;
    let n = grid[0].length;

    function min(i, j) {
        if (i == 0 && j == 0)
            return grid[0][0];
        if (i < 0 || j < 0)
            return Number.MAX_SAFE_INTEGER;

        let up = grid[i][j] + min(i - 1, j)
        let left = grid[i][j] + min(i, j - 1)
 
        return Math.min(up, left)
    }
    return min(m - 1, n - 1)
};

//TC - O(m*n) and SC - O(m+n) + (m*n)
var minPathSum = function (grid) {
    let m = grid.length;
    let n = grid[0].length;
     let dp = Array.from({length:m+1},()=> new Array(n+1).fill(-1))

    function min(i, j) {
        if (i == 0 && j == 0)
            return grid[0][0];
        if (i < 0 || j < 0)
            return Number.MAX_SAFE_INTEGER;
        if(dp[i][j] !== -1)
          return dp[i][j]

        let up = grid[i][j] + min(i - 1, j)
        let left = grid[i][j] + min(i, j - 1)

        return dp[i][j] = Math.min(up, left)
    }
    return min(m - 1, n - 1)
};

//-----------------------------------------------------
//https://leetcode.com/problems/triangle/
//TC - 2^n
var minimumTotal = function (triangle) {
    let n = triangle.length;
    function min(i, j) {
        if (i === n - 1)
            return triangle[n - 1][j]

        let down = triangle[i][j] + min(i + 1, j)
        let diag = triangle[i][j] + min(i + 1, j + 1)

        return Math.min(down, diag)

    }
    return min(0, 0)

};
//TC - O(n*n) SC- O(n*n) + O(n)
var minimumTotal = function (triangle) {
    let n = triangle.length;
    let dp = Array.from({length:n},()=> new Array(n).fill(-1))
    function min(i, j) {
        if (i === n - 1)
            return triangle[n - 1][j]
        
        if(dp[i][j]!== -1)
         return dp[i][j]

        let down = triangle[i][j] + min(i + 1, j)
        let diag = triangle[i][j] + min(i + 1, j + 1)

        return dp[i][j] = Math.min(down, diag)

    }
    return min(0, 0)

};

// from variable to variable - both Min and Max
var minFallingPathSum = function(matrix) {
    let n = matrix.length;
    let m = matrix[0].length;
    const memo = Array.from({ length: n }, () => Array(m).fill(null));

  
    function findMinPath(i, j) {
    
        if (j < 0 || j >= m) return Number.MAX_SAFE_INTEGER;

      
        if (i === 0) return matrix[i][j];

        if (memo[i][j] !== null) return memo[i][j];

        // Calculate the falling path sum by moving to the next row (down, left diagonal, or right diagonal)
        let down = matrix[i][j] + findMinPath(i - 1, j); // Directly above
        let leftDiagonal = matrix[i][j] + findMinPath(i - 1, j - 1); // Left diagonal
        let rightDiagonal = matrix[i][j] + findMinPath(i - 1, j + 1); // Right diagonal

        // Return the minimum of the three possible directions
        return memo[i][j] = Math.min(down, Math.min(leftDiagonal, rightDiagonal));
    }

    // Try all columns in the first row as starting points and find the minimum
    let minPathSum = Number.MAX_SAFE_INTEGER;
    for (let col = 0; col < m; col++) {
        minPathSum = Math.min(minPathSum, findMinPath(n - 1, col));
    }

    return minPathSum;
};
//---------->>
var maxFallingPathSum = function(matrix) {
    let n = matrix.length;
    let m = matrix[0].length;

    // Helper function for recursion
    function findMaxPath(i, j) {
        // If we are out of bounds, return a very small number (effectively an invalid path)
        if (j < 0 || j >= m) return -Number.MAX_SAFE_INTEGER;

        // If we are at the first row, return the value itself
        if (i === 0) return matrix[i][j];

        // Calculate the falling path sum by moving to the next row (down, left diagonal, or right diagonal)
        let down = matrix[i][j] + findMaxPath(i - 1, j); // Directly above
        let leftDiagonal = matrix[i][j] + findMaxPath(i - 1, j - 1); // Left diagonal
        let rightDiagonal = matrix[i][j] + findMaxPath(i - 1, j + 1); // Right diagonal

        // Return the maximum of the three possible directions
        return Math.max(down, Math.max(leftDiagonal, rightDiagonal));
    }

    // Try all columns in the first row as starting points and find the maximum
    let maxPathSum = -Number.MAX_SAFE_INTEGER;
    for (let col = 0; col < m; col++) {
        maxPathSum = Math.max(maxPathSum, findMaxPath(n - 1, col));
    }

    return maxPathSum;
};

// Example Usage:
const matrix = [
    [2, 1, 3],
    [6, 5, 4],
    [7, 8, 9]
];

console.log("Maximum Falling Path Sum: " + maxFallingPathSum(matrix)); // Output: 19

