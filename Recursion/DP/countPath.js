//TC - O(m*n) and SC - O(N)
function Path(maze) {
    const rows = maze.length;
    const cols = maze[0].length;

    function countPath(i, j) {
        // Base case: If we've reached the top-left corner
        if (i === 0 && j === 0) {
            return 1;
        }
        // Out of bounds
        if (i < 0 || j < 0) {
            return 0;
        }

        // Count paths from the left and above
        const left = countPath(i - 1, j); // Move up
        const right = countPath(i, j - 1); // Move left

        return left + right; // Total paths
    }

    // Start counting paths from the bottom-right corner
    return countPath(rows - 1, cols - 1);
}

// Example usage
const maze1 = Array.from({ length: 2 }, () => Array(2).fill('*')); // 3x3 maze
console.log(maze);
console.log("Number of unique paths:", Path(maze1)); // Outputs the number of unique paths

// Memoization
//TC - O(m*n) and SC - O((N-1)+(M-1)) + O(M*N)
function Path(maze) {
    const rows = maze.length;
    const cols = maze[0].length;
    const dp = Array.from({ length: rows }, () => Array(cols).fill(-1))

    function countPath(i, j) {

        // Base case: If we've reached the top-left corner
        if (i === 0 && j === 0) {
            return 1;
        }
        // Out of bounds
        if (i < 0 || j < 0) {
            return 0;
        }

        if (dp[i][j] !== -1) {
            return dp[i][j];
        }

        // Count paths from the left and above
        const left = countPath(i - 1, j); // Move up
        const right = countPath(i, j - 1); // Move left

        dp[i][j] = left + right; // Total paths
        return dp[i][j]
    }

    // Start counting paths from the bottom-right corner
    return countPath(rows - 1, cols - 1);
}

// Example usage
const maze2 = Array.from({ length: 3 }, () => Array(3).fill('*')); // 3x3 maze
console.log(maze);
console.log("Number of unique paths:", Path(maze2)); // Outputs the number of unique paths


// TAB
//TC - O(m*n) and SC - O(M*N)
function Path(maze) {
    const m = maze.length;
    const n = maze[0].length;
    const dp = Array.from({ length: m }, () => Array(n).fill(-1))

    function countPath(r, c) {

        for (let i = 0; i < r; i++) {
            for (let j = 0; j < c; j++) {
                if (i === 0 && j === 0)
                    dp[i][j] = 1;
                else {
                    let left = 0;
                    let right = 0;
                    if (i > 0) {
                        left = dp[i - 1][j];
                    }

                    if (j > 0) {
                        right = dp[i][j - 1]; 
                    }

                    dp[i][j] = left + right
                }
            }
        }
        return dp[m - 1][n - 1];

    }

    // Start counting paths from the bottom-right corner
    return countPath(m, n);
}

// Example usage
const maze3 = Array.from({ length: 3 }, () => Array(3).fill('*')); // 3x3 maze
console.log(maze1);
console.log("Number of unique paths:", Path(maze3)); // Outputs the number of unique paths

//space optimization
//TC - O(m*n) and SC - O(N)
function Path(maze) {
    const m = maze.length;
    const n = maze[0].length;

    function countPath(r, c) {

        let prev = Array(c).fill(0)

        for (let i = 0; i < r; i++) {
            let temp = Array(c).fill(0)
            for (let j = 0; j < c; j++) {
                if (i === 0 && j === 0)
                    temp[j] = 1;
                else {
                    let up = 0;
                    let left = 0;
                    if (i > 0) {
                        up = prev[j];
                    }

                    if (j > 0) {
                        left = temp[j - 1];
                    }

                    temp[j] = up + left
                }
            }
            prev = temp

        }
        return prev[c - 1];

    }

    // Start counting paths from the bottom-right corner
    return countPath(m, n);
}

// Example usage
const maze4 = Array.from({ length: 3 }, () => Array(3).fill('*')); // 3x3 maze
console.log(maze1);
console.log("Number of unique paths:", Path(maze4)); // Outputs the number of unique paths