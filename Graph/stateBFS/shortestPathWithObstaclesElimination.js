var shortestPath = function(grid, k) {
    const n = grid.length;
    const m = grid[0].length;

    // State = (row, col, obstacles_remaining, steps)
    const queue = [[0, 0, k, 0]];
    const visited = {};
    visited[`0,0,${k}`] = true;

    const directions = [[1,0], [-1,0], [0,1], [0,-1]];

    while (queue.length > 0) {
        const [row, col, remaining, steps] = queue.shift();

        // Reached destination
        if (row === n - 1 && col === m - 1) {
            return steps;
        }

        for (let [dx, dy] of directions) {
            const newRow = row + dx;
            const newCol = col + dy;

            // Out of bounds
            if (newRow < 0 || newRow >= n || newCol < 0 || newCol >= m) {
                continue;
            }

            let newRemaining = remaining;
            if (grid[newRow][newCol] === 1) {
                newRemaining--;
            }

            if (newRemaining < 0) continue;

            const key = `${newRow},${newCol},${newRemaining}`;

            if (!visited[key]) {
                visited[key] = true;
                queue.push([newRow, newCol, newRemaining, steps + 1]);
            }
        }
    }

    return -1;
};
//TC: O(n*m*k) where n and m are the dimensions of the grid and k is the number of obstacles that can be eliminated.
//SC: O(n*m*k) for the visited set and the queue in the worst case.
console.log(shortestPath([[0,0,0],[1,1,0],[0,0,0],[0,1,1],[0,0,0]], 1)); // Output: 6   
console.log(shortestPath([[0,1,1],[1,1,1],[1,0,0]], 1)); // Output: -1