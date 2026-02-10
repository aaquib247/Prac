
//Intuition: For each cell containing '1', we can form a square whose size is determined by the minimum size of squares that can be formed to the right, down, and diagonally down-right of that cell.
// We add 1 to this minimum size to account for the current cell itself. If a cell contains '0', it cannot contribute to any square, so its size is 0.
//My sol:
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const dp = Array.from({ length: rows }, () => Array(cols).fill(-1));

    function dfs(r, c) {

        if(c >= cols || r >= rows || matrix[r][c] === '0')
            return 0;

        if (dp[r][c] !== -1) return dp[r][c];

        return dp[r][c] = 1 + Math.min(dfs(r + 1, c), dfs(r + 1, c + 1), dfs(r, c + 1))
    }

    let maxSquare = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === '1') {
                maxSquare = Math.max(maxSquare, dfs(i, j));
            }
        }
    }

    return maxSquare * maxSquare; // Area = size²
};

//------------------------------------------------------------------


function maximalSquare(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    function solve(i, j) {
        // Base case: out of bounds
        if (i >= rows || j >= cols) return 0;

        // If current cell is '1', check right, down, and diagonal
        if (matrix[i][j] === "1") { 
            const right = solve(i, j + 1);
            const down = solve(i + 1, j);
            const diag = solve(i + 1, j + 1);
            return 1 + Math.min(right, down, diag);
        }

        // If current cell is '0', it can't be part of any square
        return 0;
    }

    let maxSquare = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const squareSize = solve(i, j);
            maxSquare = Math.max(maxSquare, squareSize);
        }
    }

    return maxSquare * maxSquare; // Area = size²
}

//Memoization
var maximalSquare = function(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;

    const dp = Array.from({ length: m }, () => Array(n).fill(-1));
    let maxSide = 0;

    function helper(i, j) {
        if (i >= m || j >= n) return 0;

        if (dp[i][j] !== -1) return dp[i][j];

        // Explore only if the current cell is '1'
        if (matrix[i][j] === '1') {
            const right = helper(i, j + 1);
            const down = helper(i + 1, j);
            const diag = helper(i + 1, j + 1);

            dp[i][j] = 1 + Math.min(right, down, diag);
            maxSide = Math.max(maxSide, dp[i][j]);
            return dp[i][j];
        } else {
            dp[i][j] = 0;
            return 0;
        }
    }

    // Run helper from every cell
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            helper(i, j);
        }
    }

    return maxSide * maxSide; // return area
};
