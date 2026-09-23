function exist(board, word) {
    const rows = board.length;
    const cols = board[0].length;

    const visited = Array.from(
        { length: rows },
        () => Array(cols).fill(false)
    );

    function dfs(i, j, wordIndex) {

        // Word completely matched
        if (wordIndex === word.length) {
            return true;
        }

        // Out of bounds
        if (
            i < 0 ||
            i >= rows ||
            j < 0 ||
            j >= cols
        ) {
            return false;
        }

        // Already visited
        if (visited[i][j]) {
            return false;
        }

        // Character doesn't match
        if (board[i][j] !== word[wordIndex]) {
            return false;
        }

        // Mark as visited
        visited[i][j] = true;

        // Try all 4 directions
        const found =
            dfs(i + 1, j, wordIndex + 1) ||
            dfs(i - 1, j, wordIndex + 1) ||
            dfs(i, j + 1, wordIndex + 1) ||
            dfs(i, j - 1, wordIndex + 1);

        // Backtrack
        visited[i][j] = false;

        return found;
    }

    // Try starting from every cell
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

            if (board[i][j] === word[0]) {
                if (dfs(i, j, 0)) {
                    return true;
                }
            }

        }
    }

    return false;
}


// Example
const board = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E']
];

console.log(exist(board, "ABCCED")); // true
console.log(exist(board, "SEE"));    // true
console.log(exist(board, "ABCB"));   // false

//////////////////////////////////////////////////////
//Visited array approach

function dfs(i, j, wordIndex) {

    // Word completely matched
    if (wordIndex === word.length) {
        return true;
    }

    // Invalid position, already visited, or wrong character
    if (
        i < 0 ||
        i >= rows ||
        j < 0 ||
        j >= cols ||
        visited[i][j] ||
        board[i][j] !== word[wordIndex]
    ) {
        return false;
    }

    // Mark as visited
    visited[i][j] = true;

    const found =
        dfs(i + 1, j, wordIndex + 1) ||
        dfs(i - 1, j, wordIndex + 1) ||
        dfs(i, j + 1, wordIndex + 1) ||
        dfs(i, j - 1, wordIndex + 1);

    // Backtrack
    visited[i][j] = false;

    return found;
}