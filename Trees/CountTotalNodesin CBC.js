
//Brute Force - O(n) time complexity
var countNodes = function (root) {
    if (!root) return 0;
    return 1 + countNodes(root.left) + countNodes(root.right); // is preorder traversal
};

//optimized for complete binary tree - O(log n * log n)

var countNodes = function (root) {
    if (!root) return 0;

    function getLeftHeight(node) {
        let height = 0;
        while (node) {
            height++;
            node = node.left;
        }
        return height;
    }

    function getRightHeight(node) {
        let height = 0;
        while (node) {
            height++;
            node = node.right;
        }
        return height;
    }

    let leftHeight = getLeftHeight(root);
    let rightHeight = getRightHeight(root);

    // perfect binary tree
    if (leftHeight === rightHeight) {
        return Math.pow(2, leftHeight) - 1;
    }

    return 1 + countNodes(root.left) + countNodes(root.right);
};