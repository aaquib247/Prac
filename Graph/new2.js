class TreeNode {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

function lowestCommonAncestor(root, p, q) {
    if (root === null) return null;

    if (root === p || root === q) return root;

    let left = lowestCommonAncestor(root.left, p, q);
    let right = lowestCommonAncestor(root.right, p, q);

    if (left && right) return root;

    return left === null ? right : left;
}

function pathExists(root, arr) {
    if (root == null)
        return false;
   return  helper(root, arr, 0);
}

function helper(root, arr, index) {
    if (root === null)
        return false;

    if (index >= arr.length || root.value !== arr[index])
        return false;

    if (root.right === null && root.left === null && index === arr.length - 1)
        return true;


    return helper(root.left, arr, index + 1) || helper(root.right, arr, index + 1)
}

// Example usage

// Construct the tree:
//       3
//      / \
//     5   1
//    / \ / \
//   6  2 0  8
//     / \
//    7   4

const root = new TreeNode(3);
const node5 = new TreeNode(5);
const node1 = new TreeNode(1);
const node6 = new TreeNode(6);
const node2 = new TreeNode(2);
const node0 = new TreeNode(0);
const node8 = new TreeNode(8);
const node7 = new TreeNode(7);
const node4 = new TreeNode(4);

root.left = node5;
root.right = node1;
node5.left = node6;
node5.right = node2;
node1.left = node0;
node1.right = node8;
node2.left = node7;
node2.right = node4;

// // Test
// const p = node6;
// const q = node2;
// console.log(lowestCommonAncestor(root, p, q)); // Should print node with value 5

// const p2 = node5;
// const q2 = node4;
// console.log(lowestCommonAncestor(root, p2, q2)); // Should print node with value 5

const arr = [3, 5, 2, 4]
console.log(pathExists(root, arr))



