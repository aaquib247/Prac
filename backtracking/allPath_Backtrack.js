function allPathPrint(p, maze, r, c) {
    if (r === maze.length - 1 && c === maze[0].length - 1) {
        console.log(p)
        return;
    }

    if (!maze[r][c]) {
        return;
    }

    // Marking the current cell as visited
    maze[r][c] = false;

    if (r < maze.length - 1) {
        allPathPrint(p + 'D', maze, r + 1, c);
    }

    if (c < maze[0].length - 1) {
        allPathPrint(p + 'R', maze, r, c + 1);
    }

    if (r > 0) {
        allPathPrint(p + 'U', maze, r - 1, c);
    }

    if (c > 0) {
        allPathPrint(p + 'L', maze, r, c - 1);
    }

    // Backtracking: Unmark the current cell
    maze[r][c] = true;
}

// Example usage:
const board = [
    [true, true, true],
    [true, true, true],
    [true, true, true]
];


allPathPrint("", board, 0, 0);
