//https://leetcode.com/problems/two-sum-iv-input-is-a-bst/description/

// Definition for a binary tree node.
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

function findTarget(root, k) {
    const seen = new Set();

    function inorderTraversal(node) {
        if (!node) return false;

        // Check if the complement is in the set
        if (seen.has(k - node.val)) {
            return true;
        }

        // Add the current node's value to the set
        seen.add(node.val);

        // Continue the traversal
        return inorderTraversal(node.left) || inorderTraversal(node.right);
    }

    return inorderTraversal(root);
}

// Example usage:
const root1 = new TreeNode(5,
    new TreeNode(3, new TreeNode(2), new TreeNode(4)),
    new TreeNode(6, null, new TreeNode(7)));
console.log(findTarget(root1, 9));  // Output: true

const root2 = new TreeNode(5,
    new TreeNode(3, new TreeNode(2), new TreeNode(4)),
    new TreeNode(6, null, new TreeNode(7)));
console.log(findTarget(root2, 28)); // Output: false
