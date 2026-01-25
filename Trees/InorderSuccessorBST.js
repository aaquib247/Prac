class TreeNode {
    constructor(x) {
        this.val = x;
        this.left = null;
        this.right = null;
    }
}

class Solution {
    inorderSuccessor(root, p) {
        let successor = null;
        //successor is the smallest node greater than p
        while (root) {
            // If p's value is smaller, move right, keeping track of potential successor
            if (p.val < root.val) {
                successor = root;
                root = root.left;
            } 
            // If p's value is greater, move right
            else {
                root = root.right;
            }
        }
        
        return successor;
    }
}

// Helper function to build a simple BST and test
function buildBST() {
    const root = new TreeNode(5);
    root.left = new TreeNode(3);
    root.right = new TreeNode(6);
    root.left.left = new TreeNode(2);
    root.left.right = new TreeNode(4);
    return root;
}

    //     5
    //    / \
    //   3   6
    //  / \
    // 2   4


// Test the code
const root = buildBST();
const solution = new Solution();

// Test for the inorder successor of node with value 4
const p = root.left.right; // Node 4
const successor = solution.inorderSuccessor(root, p);

if (successor) {
    console.log("Inorder Successor of " + p.val + " is: " + successor.val);
} else {
    console.log("Inorder Successor does not exist.");
}

//--------------
class TreeNode {
    constructor(x) {
        this.val = x;
        this.left = null;
        this.right = null;
    }
}

class Solution {
    inorderPredecessor(root, p) {
        let predecessor = null;
        
        while (root) {
            // If p's value is greater, move right, keeping track of potential predecessor
            if (p.val > root.val) {
                predecessor = root;
                root = root.right;
            } 
            // If p's value is smaller, move left
            else {
                root = root.left;
            }
        }
        
        return predecessor;
    }
}

// Helper function to build a simple BST and test
function buildBST() {
    const root = new TreeNode(5);
    root.left = new TreeNode(3);
    root.right = new TreeNode(6);
    root.left.left = new TreeNode(2);
    root.left.right = new TreeNode(4);
    return root;
}

    //     5
    //    / \
    //   3   6
    //  / \
    // 2   4


// Test the code
// const root = buildBST();
// const solution = new Solution();

// // Test for the inorder predecessor of node with value 4
// const p = root.left.right; // Node 4
// const predecessor = solution.inorderPredecessor(root, p);

// if (predecessor) {
//     console.log("Inorder Predecessor of " + p.val + " is: " + predecessor.val);
// } else {
//     console.log("Inorder Predecessor does not exist.");
// }

