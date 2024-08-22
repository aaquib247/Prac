function shortestPath(grid, source, destination) {
    const n = grid.length;
    const m = grid[0].length;

    const [startRow, startCol] = source;
    const [destRow, destCol] = destination;

    // Edge Case: if the source is the destination
    if (startRow === destRow && startCol === destCol) return 0;

    // Create a queue for BFS: stores [row, col, distance]
    const queue = [[startRow, startCol, 0]];

    // Initialize distance matrix with Infinity
    const dist = Array.from({ length: n }, () => Array(m).fill(Infinity));
    dist[startRow][startCol] = 0;

    // Directions for Up, Right, Down, Left
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

    while (queue.length > 0) {
        const [row, col, currentDist] = queue.shift();

        // Check all 4 possible directions
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            // Check boundaries and if the cell is valid (value 1)
            if (
                newRow >= 0 && newRow < n &&
                newCol >= 0 && newCol < m &&
                grid[newRow][newCol] === 1 &&
                currentDist + 1 < dist[newRow][newCol]
            ) {
                // Update the distance to the new cell
                dist[newRow][newCol] = currentDist + 1;

                // Check if we have reached the destination
                if (newRow === destRow && newCol === destCol) {
                    return currentDist + 1;
                }

                // Add the new cell to the queue
                queue.push([newRow, newCol, currentDist + 1]);
            }
        }
    }

    // If no path found
    return -1;
}

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
