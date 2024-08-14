class Solution {
    // Depth-First Search to explore and mark the shape of the island
    dfs(row, col, grid, vis, shape, row0, col0) {
      // Single return condition for boundaries, water cells, and visited cells
      if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] === 0 || vis[row][col]) {
        return;
      }
      
      // Mark the cell as visited
      vis[row][col] = 1;
      
      // Record the shape relative to the starting point
      shape.push(`${row - row0},${col - col0}`);
  
      // Explore all four directions explicitly
      this.dfs(row + 1, col, grid, vis, shape, row0, col0); // Move down
      this.dfs(row - 1, col, grid, vis, shape, row0, col0); // Move up
      this.dfs(row, col + 1, grid, vis, shape, row0, col0); // Move right
      this.dfs(row, col - 1, grid, vis, shape, row0, col0); // Move left
    }
  
    // Convert the shape array into a string format to store in a Set
    serializeShape(shape) {
      return shape.sort().join(';'); // Sort the shape coordinates and join them into a single string
    }
  
    // Count the number of distinct islands
    countDistinctIslands(grid) {
      const rows = grid.length;
      const cols = grid[0].length;
      const vis = Array.from({ length: rows }, () => Array(cols).fill(0));
      const uniqueShapes = new Set();
  
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (grid[i][j] === 1 && !vis[i][j]) {
            const shape = [];
            this.dfs(i, j, grid, vis, shape, i, j);
            const serializedShape = this.serializeShape(shape);
            uniqueShapes.add(serializedShape);
          }
        }
      }
  
      return uniqueShapes.size;
    }
  }
  
  // Example usage
  const grid = [
    [1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1],
    [1, 1, 0, 1, 0]
  ];
  
  const solution = new Solution();
  const result = solution.countDistinctIslands(grid);
  console.log(result); // Output: number of distinct islands
  