function deleteNode(root, key) {
    if (!root) return null;

    if (key < root.val) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        root.right = deleteNode(root.right, key);
    } else {
        // Node to delete found

        // Case 1: No child
        if (!root.left && !root.right) return null;

        // Case 2: One child
        if (!root.left) return root.right;
        if (!root.right) return root.left;

        // Case 3: Two children
        // Find inorder successor (smallest in right subtree)
        let successor = root.right;
        while (successor.left) {
            successor = successor.left;
        }

        // Replace value
        root.val = successor.val;

        // Delete the successor
        root.right = deleteNode(root.right, successor.val);
    }

    return root;
}
