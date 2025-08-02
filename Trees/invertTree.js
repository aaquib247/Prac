var invertTree = function(root) {

    if(!root) return null;

    let temp = root.left;
    root.left = root.right;
    root.right = temp;

    invertTree(root.left)
    invertTree(root.right)

    return root
    
};

//BFS
var invertTree = function(root) {
    if (!root) return null;

    let queue = [root];

    while (queue.length > 0) {
        let node = queue.shift();

        // Swap children
        [node.left, node.right] = [node.right, node.left];

        // Add children to queue
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }

    return root;
};
