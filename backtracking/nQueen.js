function solveNQueens(n) {
    const board = Array.from({ length: n }, () => Array(n).fill(false));
    return placeQueens(board, 0);
}

function placeQueens(board, row) {
    if (row === board.length) {
        display(board);
        console.log();
        return 1;
    }

    let count = 0;

    for (let col = 0; col < board.length; col++) {
        if (isSafe(board, row, col)) {
            board[row][col] = true;
            count += placeQueens(board, row + 1);
            board[row][col] = false;
        }
    }

    return count;
}

function isSafe(board, row, col) {
    // Check vertical column
    for (let i = 0; i < row; i++) {
        if (board[i][col]) {
            return false;
        }
    }

    // Check diagonal left
    let maxLeft = Math.min(row, col);
    for (let i = 1; i <= maxLeft; i++) {
        if (board[row - i][col - i]) {
            return false;
        }
    }

    // Check diagonal right
    let maxRight = Math.min(row, board.length - col - 1);
    for (let i = 1; i <= maxRight; i++) {
        if (board[row - i][col + i]) {
            return false;
        }
    }

    return true;
}

function display(board) {
    board.forEach(row => {
        console.log(row.map(cell => (cell ? 'Q' : 'X')).join(' '));
    });
}

// Example usage
const n = 4;
console.log(`Total solutions for ${n}-Queens problem: ${solveNQueens(n)}`);
