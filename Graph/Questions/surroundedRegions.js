// https://leetcode.com/problems/surrounded-regions/description/
/*
Idea is to traverse the corner of the matrix and do DFS if 0 found. Those wont be changed and rest cant be changed.
*/

function solve(board) {
    if (board.length === 0 || board[0].length === 0) return;

    const rows = board.length;
    const cols = board[0].length;

    // DFS function to mark 'O's connected to border
    function dfs(r, c) {
        // Base case: check boundaries and if cell is 'O'
        if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== 'O') return;
        
        // Mark this cell as 'E' (escaped) to indicate it should not be flipped
        board[r][c] = 'E';
        
        // Explore the 4 connected cells
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }

    // Start DFS from the borders
    for (let r = 0; r < rows; r++) {
        dfs(r, 0);
        dfs(r, cols - 1);
    }
    for (let c = 0; c < cols; c++) {
        dfs(0, c);
        dfs(rows - 1, c);
    }

    // Convert all 'O's to 'X's and 'E's back to 'O's
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (board[r][c] === 'O') {
                board[r][c] = 'X';
            } else if (board[r][c] === 'E') {
                board[r][c] = 'O';
            }
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
