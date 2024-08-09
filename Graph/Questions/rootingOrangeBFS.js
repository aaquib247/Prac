var orangesRotting = function(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const queue = [];
    let freshCount = 0;
    let minutes = 0;
    
    // Initialize the queue with all rotten oranges and count fresh oranges
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 2) {
                queue.push([i, j, 0]); // [row, col, minute]
            } else if (grid[i][j] === 1) {
                freshCount++;
            }
        }
    }
    
    if (freshCount === 0) {
        return 0; // No fresh oranges initially
    }
    
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    while (queue.length > 0) {
        const [x, y, minute] = queue.shift();
        minutes = minute; // Update minute
        
        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            
            if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && grid[nx][ny] === 1) {
                grid[nx][ny] = 2; // Mark as rotten
                freshCount--;
                queue.push([nx, ny, minute + 1]);
            }
        }
    }
    
    return freshCount === 0 ? minutes : -1;
};
