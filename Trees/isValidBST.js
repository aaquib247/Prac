//https://leetcode.com/problems/validate-binary-search-tree/
var isValidBST = function(root) {
    function isValid(node, min, max) {
        if (!node) return true;

        if (node.val <= min || node.val >= max) return false;

        return isValid(node.left, min, node.val) &&
               isValid(node.right, node.val, max);
    }

    return isValid(root, -Infinity, Infinity);
};

//TC: O(N)
//SC: O(H) where H is height of tree due to recursion stack
//Example usage:
// const root = {
//     val: 2,
//     left: { val: 1, left: null, right: null },
//     right: { val: 3, left: null, right: null }
// };
// console.log(isValidBST(root)); // Output: true   