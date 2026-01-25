// Define the TreeNode class
class TreeNode {
    constructor(val = 0, left = null, right = null) {
      this.val = val;
      this.left = left;
      this.right = right;
    }
  }
  
  // Define the VerticalTraversal class
  class VerticalTraversal {
    verticalTraversal(root) {
      if (!root) return [];
  
      const ans = [];
      const map = new Map();  // Map to store the nodes' values by column index
      const queue = [];       // Queue for BFS
  
      let minCol = 0, maxCol = 0;
      
      queue.push([root, 0]);  // Start with root node at column 0
  
      while (queue.length > 0) {
        const [node, col] = queue.shift();
  
        if (node) {
          if (!map.has(col)) {
            map.set(col, []);
          }
          map.get(col).push(node.val);
  
          minCol = Math.min(minCol, col);
          maxCol = Math.max(maxCol, col);
  
          if (node.left) queue.push([node.left, col - 1]);
          if (node.right) queue.push([node.right, col + 1]);
        }
      }
  
      for (let i = minCol; i <= maxCol; i++) {
        ans.push(map.get(i) || []);
      }
  
      return ans;
    }
  }
  //TC : O(N) where N is the number of nodes in the tree
  //SC : O(N) for the map and queue
  // Example usage:
  const root = new TreeNode(3);
  root.left = new TreeNode(9);
  root.right = new TreeNode(20);
  root.right.left = new TreeNode(15);
  root.right.right = new TreeNode(7);
  
  const traversal = new VerticalTraversal();
  console.log(traversal.verticalTraversal(root));  // Output: [[9], [3, 15], [20], [7]]
  