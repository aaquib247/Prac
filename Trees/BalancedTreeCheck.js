//https://leetcode.com/problems/balanced-binary-tree/

//Find Height and just add 2 conditions to check if left and right are balanced and if the height difference is more than 1. 
// If any of the conditions fail, return -1. Finally, check if the output is -1 or not to determine if the tree is balanced.

var isBalanced = function (root) {

    function f(root) {
        if (!root) return 0;

        let left = f(root.left);
        let right = f(root.right);

        if(left === -1 || right === -1) return -1;

        if(Math.abs(left-right) > 1) return -1;

        return Math.max(left, right) + 1;
    }

    let output = f(root);
    return output !== -1;

};