function shortestPath(grid, source, destination) {
    const n = grid.length;
    const m = grid[0].length;

    const [startRow, startCol] = source;
    const [destRow, destCol] = destination;

    // Edge Case: if the source is the destination
    if (startRow === destRow && startCol === destCol) return 0;

    // Create a queue for BFS: stores [row, col, distance]
    const queue = [[startRow, startCol, 0]];

    // Create a visited array to track visited cells
    const visited = Array.from({ length: n }, () => Array(m).fill(false));
    visited[startRow][startCol] = true;

    // Directions for Up, Right, Down, Left
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

    while (queue.length > 0) {
        const [row, col, currentDist] = queue.shift();

        // Check all 4 possible directions
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            // Check boundaries, if the cell is valid (value 1), and not visited
            if (
                newRow >= 0 && newRow < n &&
                newCol >= 0 && newCol < m &&
                grid[newRow][newCol] === 1 &&
                !visited[newRow][newCol]
            ) {
                // If we have reached the destination, return the distance
                if (newRow === destRow && newCol === destCol) {
                    return currentDist + 1;
                }

                // Mark the cell as visited and add it to the queue
                visited[newRow][newCol] = true;
                queue.push([newRow, newCol, currentDist + 1]);
            }
        }
    }

    // If no path found
    return -1;
}

// Time Complexity: O(N * M) where N is the number of rows and M is the number of columns
// Space Complexity: O(N * M) for the visited matrix and the queue in the worst case

// Example usage
const grid1 = [
    [1, 1, 1, 1],
    [1, 1, 0, 1],
    [1, 1, 1, 1],
    [1, 1, 0, 0],
    [1, 0, 0, 1]
];
const source1 = [0, 1];
const destination1 = [2, 2];
console.log(shortestPath(grid1, source1, destination1)); // Output: 3

const grid2 = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 1, 0, 1]
];
const source2 = [0, 0];
const destination2 = [3, 4];
console.log(shortestPath(grid2, source2, destination2)); // Output: -1
