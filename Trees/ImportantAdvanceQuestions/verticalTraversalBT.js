class TreeNode {
    constructor(val = 0, left = null, right = null) {
      this.val = val;
      this.left = left;
      this.right = right;
    }
  }
  
  class VerticalTraversal {
    verticalTraversal(root) {
      if (!root) return [];
  
      // Map to store column index to list of [row, value] pairs
      const columnTable = {};
      // Queue for BFS: stores [node, column, row]
      const queue = [[root, 0, 0]];
  
      // Track the range of columns
      let minColumn = 0;
      let maxColumn = 0;
  
      while (queue.length > 0) {
        const [node, col, row] = queue.shift();
  
        if (!columnTable[col]) {
          columnTable[col] = [];
        }
        columnTable[col].push([row, node.val]);
  
        minColumn = Math.min(minColumn, col);
        maxColumn = Math.max(maxColumn, col);
  
        if (node.left) {
          queue.push([node.left, col - 1, row + 1]);
        }
        if (node.right) {
          queue.push([node.right, col + 1, row + 1]);
        }
      }
  
      // Prepare the result
      const result = [];
      for (let col = minColumn; col <= maxColumn; col++) {
        if (columnTable[col]) {
          // Sort first by row, then by value
          columnTable[col].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
          // Extract the values
          result.push(columnTable[col].map(([_, value]) => value));
        }
      }
  
      return result;
    }
  }
  