//https://leetcode.com/problems/subtree-of-another-tree/

function isSubtree(root, subRoot) {
    if (!root) return false;

    // Check if trees rooted at current node match
    if (isSameTree(root, subRoot)) return true;

    // Otherwise, check left and right subtrees
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

function isSameTree(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    if (p.val !== q.val) return false;

    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
