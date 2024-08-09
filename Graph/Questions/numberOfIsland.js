//leetcode.com/problems/number-of-islands/

//BFS
function numIslands(grid) {
    const n = grid.length;
    const m = grid[0].length;
    let islandCount = 0;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    function bfs(x, y) {
        const queue = [[x, y]];
        grid[x][y] = '0'; // Mark as visited
        
        while (queue.length > 0) {
            const [currX, currY] = queue.shift();
            for (const [dx, dy] of directions) {
                const newX = currX + dx;
                const newY = currY + dy;
                if (newX >= 0 && newX < n && newY >= 0 && newY < m && grid[newX][newY] === '1') {
                    grid[newX][newY] = '0'; // Mark as visited
                    queue.push([newX, newY]);
                }
            }
        }
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === '1') {
                bfs(i, j);
                islandCount++;
            }
        }
    }

    return islandCount;
}

//DFS
function numIslands(grid) {
    const n = grid.length;
    const m = grid[0].length;
    let islandCount = 0;

    function dfs(x, y) {
        if (x < 0 || x >= n || y < 0 || y >= m || grid[x][y] === '0') {
            return;
        }
        grid[x][y] = '0'; // Mark as visited
        // Explore all four directions
        dfs(x + 1, y);
        dfs(x - 1, y);
        dfs(x, y + 1);
        dfs(x, y - 1);
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === '1') {
                dfs(i, j);
                islandCount++;
            }
        }
    }

    return islandCount;
}

