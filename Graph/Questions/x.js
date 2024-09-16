// https://leetcode.com/problems/surrounded-regions/description/
/*
Idea is to traverse the corner of the matrix and do DFS if 0 found. Those wont be changed and rest cant be changed.
*/

function solve(board) {
    // if (board.length === 0 || board[0].length === 0) return;
    let row = board.length;
    let col = board[0].length;

    function dfs(r, c) {
        if (r < 0 || r >= row || c < 0 || c >= col || board[r][c] === 'X')
            return;
        board[r][c] = 'E'
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
            if (board[i][j] === 'O')
                board[i][j] = 'X'
            else if (board[i][j] === 'E')
                board[i][j] = 'O'
        }
    }
}

// Example usage:
const board1 = [
    ["X", "X", "X", "X"],
    ["X", "O", "O", "X"],
    ["X", "X", "O", "X"],
    ["X", "O", "X", "X"]
];
solve(board1);
console.log(board1);  // Expected output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]

const board2 = [["X"]];
solve(board2);
console.log(board2);  // Expected output: [["X"]]
