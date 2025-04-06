function exist(board, word) {
    const rows = board.length;
    const cols = board[0].length;
    
    // Helper function for DFS
    function dfs(i, j, wordIndex) {
        // If we've completed the word, return true
        if (wordIndex === word.length) {
            return true;
        }
        
        // If out of bounds or the current cell doesn't match the word character, return false
        if (i < 0 || i >= rows || j < 0 || j >= cols || board[i][j] !== word[wordIndex]) {
            return false;
        }

        // Temporarily mark the cell as visited
        const temp = board[i][j];
        board[i][j] = '#'; // '#' marks the visited cell

        // Explore all 4 directions: up, down, left, right
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

        for (let [dx, dy] of directions) {
            const newI = i + dx;
            const newJ = j + dy;
            if (dfs(newI, newJ, wordIndex + 1)) {
                return true;
            }
        }

        // Backtrack and unmark the cell
        board[i][j] = temp;

        return false;
    }

    // Start DFS from each cell in the grid
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j] === word[0] && dfs(i, j, 0)) {
                return true;
            }
        }
    }

    return false;
}

// Example usage:
const board = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E']
];
const word = "ABCCED";
console.log(exist(board, word));  // Output: true

const word2 = "SEE";
console.log(exist(board, word2));  // Output: true

const word3 = "ABCB";
console.log(exist(board, word3));  // Output: false
