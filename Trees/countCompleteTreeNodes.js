//LOG(N) solution:  Any traversal and counting will be O(N).
// let c = 0; // Counter for nodes

// function count(root) {
//     if (!root) return;  // Base case: if the node is null, return

//     c++;  // Increment the count when visiting a node

//     count(root.left);  // Recursively count nodes in the left subtree
//     count(root.right); // Recursively count nodes in the right subtree
// }

class TreeNode {
    constructor(x) {
        this.val = x;
        this.left = null;
        this.right = null;
    }
}
//TC(N) SC(H)
//// ✅ CORRECT SIMPLE VERSION
class SolutionCorrect {
    countNodes(root) {
        if (!root) return 0;
        return 1 + this.countNodes(root.left) + this.countNodes(root.right);
    }
}

//TC: O(log N * log N) where N is number of nodes
//SC: O(H) where H is height of tree due to recursion stack
// ✅ CORRECT OPTIMIZED VERSION (for Complete Binary Trees)
class Solution {
    countNodes(root) {
        if (!root) return 0;
        
        let leftHeight = this.getLeftHeight(root);
        let rightHeight = this.getRightHeight(root);
        
        // For complete trees: if left path = right path, left subtree is perfect
        if (leftHeight === rightHeight) {
            return Math.pow(2, leftHeight) - 1; // Same as Math.pow(2, leftHeight) - 1
        }
        
        // Otherwise, recurse
        return 1 + this.countNodes(root.left) + this.countNodes(root.right);
    }
    
    getLeftHeight(node) {
        let height = 0;
        while (node) {
            height++;
            node = node.left;
        }
        return height;
    }
    
    getRightHeight(node) {
        let height = 0;
        while (node) {
            height++;
            node = node.right;
        }
        return height;
    }
}

// Driver code
function main() {
    // Create a binary tree
    let root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);

    // Create solution object
    let sol = new Solution();

    // Count total nodes
    let totalNodes = sol.countNodes(root);

    // Output result
    console.log("Total number of nodes in the tree: " + totalNodes);  // Output: 6
}

main();


//Input Tree:
//         1
//        / \
//       2   3
//      / \  /
//     4  5 6

//Output:
// Total number of nodes in the Complete Binary Tree: 6 

// TC: O(log N * log N) where N is number of nodes --> beacuse we calculate height in O(log N) and do this for each level O(log N)
// SC: O(H) where H is height of tree due to recursion stack    
