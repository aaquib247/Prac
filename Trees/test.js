class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function binaryTreePaths(root) {
    const paths = [];

    // Helper function to perform DFS and collect paths
    function dfs(node, path) {
        if (node === null) return;

        // Append the current node's value to the path
        path += node.val;

        // If it's a leaf node, add the path to the results
        if (node.left === null && node.right === null) {
            paths.push(path);
        } else {
            // Continue to traverse the tree
            if (node.left) {
                dfs(node.left, path + '->');
            }
            if (node.right) {
                dfs(node.right, path + '->');
            }
        }
    }

    dfs(root, '');
    return paths;
}

// Example Usage
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.right = new TreeNode(6);

console.log(binaryTreePaths(root));
// Output: ["1->2->4", "1->2->5", "1->3->6"]



// class TreeNode {
//     constructor(val = 0, left = null, right = null) {
//         this.val = val;
//         this.left = left;
//         this.right = right;
//     }
// }

// var maxPathSum = function (root) {
//     let ans = -Infinity; // Initialize ans to a very small number

//     function helper(node) {
//         if (node === null) {
//             return 0; // Base case: return 0 for null nodes
//         }

//         // Recursively get the maximum path sum of left and right subtrees
//         let left = helper(node.left);
//         let right = helper(node.right);

//         // Calculate the path sum including the current node
//         let pathSum = Math.max(0, left) + Math.max(0, right) + node.val;

//         // Update the global ans with the maximum path sum found so far
//          ans = Math.max(ans, pathSum);

//         // Return the maximum path sum extending to the current node
//         // This is to return to parent which is max left or right coz the pathsum will calculate both left and right leading to an incorrect answer.
//         return Math.max(0, Math.max(left, right) + node.val);
//     }

//     helper(root);
//     // Return the overall maximum path sum found
//     return ans;
// };

// // Example Usage
// const root = new TreeNode(10);
// root.left = new TreeNode(2);
// root.right = new TreeNode(-3);
// root.left.left = new TreeNode(1);
// root.left.right = new TreeNode(3);

// console.log(maxPathSum(root)); // Output: 15 (Path: 10 -> 2 -> 3)


// function findPath(root, path) {

//     if (root === null) {
//         return false;
//     }

//     if (root.val != path[0])
//         return false;
//     else {
//         path.shift();
//         if (root.left === null && root.right === null)
//             return true;

//     }

//     return findPath(root.left,path) || findPath(root.right,path)
// }

// class TreeNode {
//     constructor(val = 0, left = null, right = null) {
//         this.val = val;
//         this.left = left;
//         this.right = right;
//     }
// }

// const root = new TreeNode(1);
// root.left = new TreeNode(2);
// root.right = new TreeNode(3);
// root.left.left = new TreeNode(4);
// root.left.right = new TreeNode(5);
// root.right.right = new TreeNode(6);

// console.log(findPath(root, [1,2,3]))