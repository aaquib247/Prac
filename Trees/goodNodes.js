//intuition: A node is good if on the path from root to that node, there are no nodes with a value greater than that node's value.

//DFS
//approach: Keep track of the maximum value seen on the path from the root to the current node. 
// If the current node's value is greater than or equal to this maximum, it's a good node. Update the maximum and continue the DFS traversal.

var goodNodes = function(root) {
    let count = 0;

    function dfs(node, maxSoFar) {
        if (!node) return;

        // If current node >= max seen so far, it's a good node
        if (node.val >= maxSoFar) {
            count++;
        }

        // Update max and go deeper
        let newMax = Math.max(maxSoFar, node.val);
        dfs(node.left, newMax);
        dfs(node.right, newMax);
    }

    dfs(root, -Infinity);
    return count;
};

// Example:
//        3
//       / \
//      1   4
//     /   / \
//    3   1   5
// Good nodes: 3, 3, 4, 5 → answer = 4