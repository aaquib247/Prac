/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function (matrix) {
    let n = matrix.length;
    let m = matrix[0].length;
    let max = 0;
    let directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]
    function dfs(i, j, prev) {
        if (i < 0 || i >= n || j < 0 || j >= m || matrix[i][j] <= prev)
            return 0;

        let best = 0;
        best = Math.max(
            dfs(i + 1, j, matrix[i][j]),
            dfs(i, j + 1, matrix[i][j]),
            dfs(i - 1, j, matrix[i][j]),
            dfs(i, j - 1, matrix[i][j])
        )

        return 1 + best;

    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            max = Math.max(max, dfs(i, j, -Infinity))
        }
    }

    return max;

};

console.log(longestIncreasingPath([[9, 9, 4], [6, 6, 8], [2, 1, 1]])); // Output: 4
console.log(longestIncreasingPath([[3, 4, 5], [3, 2, 6], [2, 2, 1]])); // Output: 4