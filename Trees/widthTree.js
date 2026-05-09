var widthOfBinaryTree = function (root) {
    if (!root) return 0;

    let queue = [[root, 0]]; // [node, index]
    let maxWidth = 0;

    while (queue.length) {
        let size = queue.length;
        let minIndex = queue[0][1]; // normalize

        let first = 0, last = 0;

        for (let i = 0; i < size; i++) {
            let [node, index] = queue.shift();
            
            //bring index to 0 for current level
            let currIndex = index - minIndex;

            if (i === 0) first = currIndex;
            if (i === size - 1) last = currIndex;

            if (node.left) queue.push([node.left, 2 * currIndex + 1]);
            if (node.right) queue.push([node.right, 2 * currIndex + 2]);
        }

        maxWidth = Math.max(maxWidth, last - first + 1);
    }

    return maxWidth;
};

// Definition for a binary tree node
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Construct the tree:
//         1
//       /   \
//      2     3
//       \       \
//        5       9

const root = new TreeNode(
    1,
    new TreeNode(2, null, new TreeNode(5)),
    new TreeNode(3, null, new TreeNode(9))
);

console.log(widthOfBinaryTree(root));