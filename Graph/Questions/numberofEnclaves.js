//https://leetcode.com/problems/number-of-enclaves/
/// same as surrounded regions

var numEnclaves = function (grid) {
    let row = grid.length;
    let col = grid[0].length;
    let count = 0;

    function dfs(r, c) {
        if (r < 0 || r >= row || c < 0 || c >= col || grid[r][c] !== 1)
            return;

        grid[r][c] = -1;

        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    }

    for (let r = 0; r < row; r++) {
        dfs(r, 0)
        dfs(r, col - 1)
    }

    for (let c = 0; c < col; c++) {
        dfs(0, c)
        dfs(row - 1, c)
    }

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (grid[i][j] === 1)
                count++;
        }
    }

    return count;

};