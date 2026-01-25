//Intuition: Explore all paths using DFS and backtracking
//Keep track of visited cells to avoid cycles
//When reaching the destination cell, add the current path to results
//Backtrack by unmarking the cell as visited and removing last direction from path

//TC: Exponential in nature, as we may explore all possible paths in worst case
//SC: O(N) for visited array and recursion stack where N is number of cells in maze
function ratInMaze(maze) {
    const n = maze.length;
    const res = [];
    const visited = Array.from({ length: n }, () => Array(n).fill(false));

    function dfs(i, j, path) {
        // Out of bounds or blocked or visited
        if (
            i < 0 || j < 0 || i >= n || j >= n ||
            maze[i][j] === 0 || visited[i][j]
        ) return;

        // Destination reached
        if (i === n - 1 && j === n - 1) {
            res.push(path);
            return;
        }

        visited[i][j] = true;

        dfs(i + 1, j, path + 'D'); // Down
        dfs(i, j + 1, path + 'R'); // Right
        dfs(i - 1, j, path + 'U'); // Up
        dfs(i, j - 1, path + 'L'); // Left

        visited[i][j] = false; // backtrack
    }

    if (maze[0][0] === 1) dfs(0, 0, '');

    return res;
}


const maze = [
    [1, 0, 0, 0],
    [1, 1, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 1]
];

console.log(ratInMaze(maze));
// Output: [ 'DDRDRR', 'DRDDRR' ]