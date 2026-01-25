//TC: O(h) where h is the height of the tree
//SC: O(h) for the recursion stack
function deleteNode(root, key) {
    if (!root) return null;

    if (key < root.val) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        root.right = deleteNode(root.right, key);
    } else {
        // Node to delete found

        // Case 1: No child
        if (!root.left && !root.right) return null;

        // Case 2: One child
        if (!root.left) return root.right;
        if (!root.right) return root.left;

        // Case 3: Two children
        // Find inorder successor (smallest in right subtree)
        let successor = root.right;
        while (successor.left) {
            successor = successor.left;
        }

        // Replace value
        root.val = successor.val;

        // Delete the successor
        root.right = deleteNode(root.right, successor.val);
    }

    return root;
}

// Example usage:
// Define a simple TreeNode class for testing
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Create a sample BST
let root = new TreeNode(5);
root.left = new TreeNode(3);
root.right = new TreeNode(7);
root.left.left = new TreeNode(2);
root.left.right = new TreeNode(4);
root.right.right = new TreeNode(8);         
// Delete a node
root = deleteNode(root, 3);
console.log(root);  // Output the modified tree structure   
module.exports = deleteNode;
