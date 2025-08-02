//https://leetcode.com/problems/same-tree/

var isSameTree = function(p, q) {
    if (!p && !q) return true;           // both are null
    if (!p || !q) return false;          // only one is null
    if (p.val !== q.val) return false;   // value mismatch

    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};