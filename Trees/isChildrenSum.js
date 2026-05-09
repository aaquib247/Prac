// Definition for a binary tree node
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Function to check Children Sum Property
var isChildrenSum = function(root) {
    if (!root) return true; // empty tree
    if (!root.left && !root.right) return true; // leaf node

    let leftVal = root.left ? root.left.val : 0;
    let rightVal = root.right ? root.right.val : 0;

    if (root.val !== leftVal + rightVal) return false;

    return isChildrenSum(root.left) && isChildrenSum(root.right);
};

// Example usage:

// Constructing tree:
//         10
//        /  \
//       8    2
//      / \    \
//     3   5    2

const root = new TreeNode(
    10,
    new TreeNode(8, new TreeNode(3), new TreeNode(5)),
    new TreeNode(2, null, new TreeNode(2))
);

// Check Children Sum Property
console.log(isChildrenSum(root)); // Output: true


// Function to check Children Sum Property
var isChildrenSum = function(root) {
    if (!root) return true; // empty tree
    if (!root.left && !root.right) return true; // leaf node

    if (root.val !== root.left.val + root.right.val) return false;

    return isChildrenSum(root.left) && isChildrenSum(root.right);
};