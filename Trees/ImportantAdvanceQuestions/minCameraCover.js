//Minimum Number of Cameras to Monitor All Nodes in a Binary Tree
//https://leetcode.com/problems/minimum-number-of-cameras-in-binary-tree/description/
//TC: O(N) SC: O(H) H is height of tree due to recursion stack

//Intuition:
//We can use a depth-first search (DFS) approach to traverse the binary tree and determine the optimal placement of cameras. 
//Each node can be in one of three states:
//0: The node needs a camera.
//1: The node has a camera.
//2: The node is covered (does not need a camera).
function minCameraCover(root) {
    let cameras = 0;
    
    function dfs(node) {
        // null = already safe (don't need camera)
        if (!node) return 2;
        
        // Ask children first
        let left = dfs(node.left);
        let right = dfs(node.right);
        
        // If ANY child screams "HELP!" (0)
        if (left === 0 || right === 0) {
            cameras++;      // Put camera here
            return 1;       // Tell parent "I'm protecting you!"
        }
        
        // If ANY child has camera (1)
        if (left === 1 || right === 1) {
            return 2;       // Tell parent "I'm safe!"
        }
        
        // Both children safe but no cameras
        return 0;           // Tell parent "I need help!"
    }
    
    // If root still needs help, add camera
    if (dfs(root) === 0) cameras++;
    
    return cameras;
}
//example usage:
// Constructing the binary tree:
//       0
//      / \
//     0   0
//    / \
//   0   0

const tree = {
    val: 0,
    left: {
        val: 0,
        left: { val: 0, left: null, right: null },
        right: { val: 0, left: null, right: null }
    },
    right: { val: 0, left: null, right: null }
};

console.log(minCameraCover(tree)); // Output: 2

// The optimal placement is to put one camera at the root, which covers all nodes in the tree.