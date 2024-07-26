function allPathPrint(p, maze, r, c, path, step) {
    if (r === maze.length - 1 && c === maze[0].length - 1) {
        path[r][c] = step;
        path.forEach(arr => console.log(arr));
        console.log(p);
        console.log();
        return;
    }

    if (!maze[r][c]) {
        return;
    }

    // Marking the current cell as visited
    maze[r][c] = false;
    path[r][c] = step;

    if (r < maze.length - 1) {
        allPathPrint(p + 'D', maze, r + 1, c, path, step + 1);
    }

    if (c < maze[0].length - 1) {
        allPathPrint(p + 'R', maze, r, c + 1, path, step + 1);
    }

    if (r > 0) {
        allPathPrint(p + 'U', maze, r - 1, c, path, step + 1);
    }

    if (c > 0) {
        allPathPrint(p + 'L', maze, r, c - 1, path, step + 1);
    }

    // Backtracking: Unmark the current cell
    maze[r][c] = true;
    path[r][c] = 0;
}

// Example usage:
const board = [
    [true, true, true],
    [true, true, true],
    [true, true, true]
];

const path = new Array(board.length).fill().map(() => new Array(board[0].length).fill(0));

allPathPrint("", board, 0, 0, path, 1);
