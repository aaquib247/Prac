// TC - (2^m+n) and SC - (m+n)
function uniquePaths(i, j) {

    if (i == 0 && j == 0)
        return 1;
    if (i < 0 || j < 0)
        return 0;

    let up = uniquePaths(i - 1, j)
    let left = uniquePaths(i, j - 1)

    return up + left

}

let m = 3; // number of rows
let n = 3; // number of columns
console.log(uniquePaths(m - 1, n - 1));

// Memoization
// TC - O(m+n) and SC - (m+n) + (m*n)[dp array]

function uniquePathsMemo(i, j) {
    let dp = Array.from({ length: i + 1 }, () => new Array(j + 1).fill(-1));
    function memo(i, j) {
        if (i < 0 || j < 0)
            return 0;

        if (dp[i][j] !== -1)
            return dp[i][j]

        if (i == 0 && j == 0)
            return 1;

        let up = memo(i - 1, j)
        let left = memo(i, j - 1)

        return dp[i][j] = up + left
    }
    return memo(i, j)
}

let x = 3; // number of rows
let y = 3; // number of columns
console.log(uniquePathsMemo(x - 1, y - 1));

//Tabulation
// TC - O(m*n) and SC - (m*n)[dp array]
function uniquePathsTab(m, n) {
    let dp = Array.from({ length: m }, () => new Array(n).fill(-1));

    dp[0][0] = 1;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0)
                continue;
            else {
                let up = 0, left = 0;
                if (i > 0)
                    up = dp[i - 1][j]
                if (j > 0)
                    left = dp[i][j - 1]
                dp[i][j] = up + left;
            }
        }
    }
    return dp[m - 1][n - 1]
}
let u = 3; // number of rows
let v = 3; // number of columns
console.log(uniquePathsTab(u, v)); 


