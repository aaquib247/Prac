// 1. Add root (if not leaf)
// 2. addLeftBoundary() - go down left
// 3. addLeaves() - collect all leaves
// 4. addRightBoundary() - go down right, reverse


/**
 * BOUNDARY TRAVERSAL OF BINARY TREE
 * 
 * PROBLEM: Print the boundary of a binary tree in anti-clockwise direction
 * 
 * BOUNDARY consists of:
 * 1. Root node
 * 2. Left boundary (excluding leaves)
 * 3. All leaf nodes (left to right)
 * 4. Right boundary (excluding leaves, in reverse)
 * 
 * VISUALIZATION:
 *         1
 *        / \
 *       2   3
 *      / \   \
 *     4   5   6
 *        / \   \
 *       7   8   9
 * 
 * Boundary: [1, 2, 4, 7, 8, 9, 6, 3]
 * 
 * Left boundary: 1 → 2 → 4
 * Leaves: 4, 7, 8, 9, 6
 * Right boundary (reverse): 3 → 6 (but 6 is leaf, so just 3)
 */

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
//TC: O(N) SC: O(H)
// ============================================
// MAIN SOLUTION
// ============================================

function boundaryTraversal(root) {
    if (!root) return [];
    
    const result = [];
    
    // Step 1: Add root (if not a leaf)
    if (!isLeaf(root)) {
        result.push(root.val);
    }
    
    // Step 2: Add left boundary (excluding leaves)
    addLeftBoundary(root.left, result);
    
    // Step 3: Add all leaves (left to right)
    addLeaves(root, result);
    
    // Step 4: Add right boundary in reverse (excluding leaves)
    addRightBoundary(root.right, result);
    
    return result;
}

// Helper: Check if node is a leaf
function isLeaf(node) {
    return node && !node.left && !node.right;
}

// Add left boundary (top to bottom, excluding leaves)
function addLeftBoundary(node, result) {
    while (node) {
        // Add only if not a leaf
        if (!isLeaf(node)) {
            result.push(node.val);
        }
        
        // Go to left child, if not available go to right
        node = node.left ? node.left : node.right;
    }
}

// Add all leaves (left to right using inorder)
function addLeaves(node, result) {
    if (!node) return;
    
    // Inorder traversal to get leaves left to right
    addLeaves(node.left, result);
    
    if (isLeaf(node)) {
        result.push(node.val);
    }
    
    addLeaves(node.right, result);
}

// Add right boundary in reverse (bottom to top, excluding leaves)
function addRightBoundary(node, result) {
    const temp = [];
    
    while (node) {
        // Add only if not a leaf
        if (!isLeaf(node)) {
            temp.push(node.val);
        }
        
        // Go to right child, if not available go to left
        node = node.right ? node.right : node.left;
    }
    
    // Add in reverse order
    for (let i = temp.length - 1; i >= 0; i--) {
        result.push(temp[i]);
    }
}

// ============================================
// VISUALIZATION HELPER
// ============================================

function visualizeTree(root, prefix = "", isLeft = true, isRoot = true) {
    if (!root) return;
    
    if (isRoot) {
        console.log(root.val);
    } else {
        console.log(prefix + (isLeft ? "├── " : "└── ") + root.val);
    }
    
    if (root.left || root.right) {
        if (root.left) {
            visualizeTree(root.left, prefix + (isLeft ? "│   " : "    "), true, false);
        }
        if (root.right) {
            visualizeTree(root.right, prefix + (isLeft ? "│   " : "    "), false, false);
        }
    }
}

function markBoundary(root) {
    const boundary = boundaryTraversal(root);
    console.log("\n📍 Boundary nodes (anti-clockwise):", boundary);
    console.log("\nBreakdown:");
    
    // Show which part each node belongs to
    const boundarySet = new Set(boundary);
    const leaves = [];
    
    function getLeaves(node) {
        if (!node) return;
        if (isLeaf(node)) leaves.push(node.val);
        getLeaves(node.left);
        getLeaves(node.right);
    }
    
    getLeaves(root);
    
    console.log("  Root:", root.val);
    console.log("  Left boundary: [going down left]");
    console.log("  Leaves:", leaves);
    console.log("  Right boundary: [going up right]");
}

// ============================================
// TEST CASES
// ============================================

console.log("=".repeat(60));
console.log("BOUNDARY TRAVERSAL OF BINARY TREE");
console.log("=".repeat(60));

// Test Case 1: Standard tree
console.log("\n📊 TEST CASE 1: Standard Tree");
/*
        1
       / \
      2   3
     / \   \
    4   5   6
       / \   \
      7   8   9
*/
let root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.right = new TreeNode(3);
root1.left.left = new TreeNode(4);
root1.left.right = new TreeNode(5);
root1.right.right = new TreeNode(6);
root1.left.right.left = new TreeNode(7);
root1.left.right.right = new TreeNode(8);
root1.right.right.right = new TreeNode(9);

console.log("\nTree Structure:");
visualizeTree(root1);
console.log("\nResult:", boundaryTraversal(root1));
console.log("Expected: [1, 2, 4, 7, 8, 9, 6, 3]");

// Test Case 2: Complete binary tree
console.log("\n" + "=".repeat(60));
console.log("\n📊 TEST CASE 2: Complete Binary Tree");
/*
        20
       /  \
      8    22
     / \   / \
    4  12 25  30
      / \
     10 14
*/
let root2 = new TreeNode(20);
root2.left = new TreeNode(8);
root2.right = new TreeNode(22);
root2.left.left = new TreeNode(4);
root2.left.right = new TreeNode(12);
root2.right.left = new TreeNode(25);
root2.right.right = new TreeNode(30);
root2.left.right.left = new TreeNode(10);
root2.left.right.right = new TreeNode(14);

console.log("\nTree Structure:");
visualizeTree(root2);
console.log("\nResult:", boundaryTraversal(root2));
console.log("Expected: [20, 8, 4, 10, 14, 25, 30, 22]");

// Test Case 3: Left skewed tree
console.log("\n" + "=".repeat(60));
console.log("\n📊 TEST CASE 3: Left Skewed Tree");
/*
      1
     /
    2
   /
  3
*/
let root3 = new TreeNode(1);
root3.left = new TreeNode(2);
root3.left.left = new TreeNode(3);

console.log("\nTree Structure:");
visualizeTree(root3);
console.log("\nResult:", boundaryTraversal(root3));
console.log("Expected: [1, 2, 3]");

// Test Case 4: Right skewed tree
console.log("\n" + "=".repeat(60));
console.log("\n📊 TEST CASE 4: Right Skewed Tree");
/*
  1
   \
    2
     \
      3
*/
let root4 = new TreeNode(1);
root4.right = new TreeNode(2);
root4.right.right = new TreeNode(3);

console.log("\nTree Structure:");
visualizeTree(root4);
console.log("\nResult:", boundaryTraversal(root4));
console.log("Expected: [1, 3, 2]");

// Test Case 5: Single node
console.log("\n" + "=".repeat(60));
console.log("\n📊 TEST CASE 5: Single Node");
let root5 = new TreeNode(1);

console.log("\nTree Structure:");
visualizeTree(root5);
console.log("\nResult:", boundaryTraversal(root5));
console.log("Expected: [1]");

// Test Case 6: Only root with two children (all leaves)
console.log("\n" + "=".repeat(60));
console.log("\n📊 TEST CASE 6: Root with Two Leaves");
/*
    1
   / \
  2   3
*/
let root6 = new TreeNode(1);
root6.left = new TreeNode(2);
root6.right = new TreeNode(3);

console.log("\nTree Structure:");
visualizeTree(root6);
console.log("\nResult:", boundaryTraversal(root6));
console.log("Expected: [1, 2, 3]");

// ============================================
// EXPLANATION
// ============================================

console.log("\n" + "=".repeat(60));
console.log("📚 EASY EXPLANATION");
console.log("=".repeat(60));
console.log(`
🎯 THE PROBLEM:
   Print the outer boundary of a tree in ANTI-CLOCKWISE order
   
   Think of it like walking around the tree's perimeter!

🔄 THE APPROACH (4 Steps):

1️⃣  ROOT:
    - Add root node (if it's not a leaf)

2️⃣  LEFT BOUNDARY:
    - Go down the LEFT side (top to bottom)
    - Add nodes, but NOT leaves
    - If no left child, go right
    
    Example:    1
               /
              2      ← Add this
             /
            4        ← Add this
           /
          7          ← DON'T add (it's a leaf)

3️⃣  LEAVES:
    - Add ALL leaf nodes from LEFT to RIGHT
    - Use inorder traversal (left → root → right)
    
    Example: [7, 8, 9, 6] in this order

4️⃣  RIGHT BOUNDARY:
    - Go down the RIGHT side (top to bottom)
    - Add nodes, but NOT leaves
    - If no right child, go left
    - Add in REVERSE order (bottom to top)
    
    Example:    3      ← Add this (but in reverse)
                 \\
                  6    ← Don't add (it's a leaf)

📊 VISUAL WALKTHROUGH:

        1            Step 1: Add root → [1]
       / \\
      2   3          Step 2: Left boundary → [1, 2]
     / \\   \\
    4   5   6       Step 3: Leaves → [1, 2, 4, 7, 8, 9, 6]
       / \\   \\
      7   8   9     Step 4: Right boundary (reverse) → [1, 2, 4, 7, 8, 9, 6, 3]

    Anti-clockwise: 1 → 2 → 4 → 7 → 8 → 9 → 6 → 3

⏱️  COMPLEXITY:
    Time: O(n) - visit each node once
    Space: O(h) - recursion stack for leaves

🎯 INTERVIEW TIP:
    "I'll collect the boundary in 4 parts:
     1) Root
     2) Left edge (top-down, no leaves)
     3) All leaves (left-to-right)
     4) Right edge (bottom-up, no leaves)
     
     This gives us the anti-clockwise boundary!"

🔑 KEY POINTS:
    - Leaf = node with no children
    - Left boundary goes down preferring left
    - Right boundary goes down preferring right, then reversed
    - Leaves added in inorder (left to right)
    - Don't duplicate root or leaves
`);

console.log("=".repeat(60));