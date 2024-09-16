// Define the TreeNode class
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Define the TopView class
class TopView {
    topView(root) {
        if (!root) return [];
        
        const map = new Map();  // Map to store the top node at each column index
        const queue = [];       // Queue for BFS
        
        let minCol = 0, maxCol = 0;
        
        queue.push([root, 0]);  // Start with root node at column 0
        
        while (queue.length > 0) {
            const [node, col] = queue.shift();
            
            if (node) {
                // Add the node to the map if no node has been added to this column yet
                if (!map.has(col)) {
                    map.set(col, node.val);
                }
                
                minCol = Math.min(minCol, col);
                maxCol = Math.max(maxCol, col);
                
                if (node.left) queue.push([node.left, col - 1]);
                if (node.right) queue.push([node.right, col + 1]);
            }
        }
        
        // Collect results from the map sorted by column index
        const result = [];
        for (let i = minCol; i <= maxCol; i++) {
            result.push(map.get(i));
        }
        
        return result;
    }
}

// Example usage
const root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);

const topView = new TopView();
console.log(topView.topView(root));  // Output: [9, 3, 20, 7]
