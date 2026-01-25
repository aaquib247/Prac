/**
 * RECOVER BINARY SEARCH TREE (LeetCode 99)
 * 
 * PROBLEM: Two nodes of a BST are swapped by mistake. Recover the tree.
 * 
 * KEY INSIGHT:
 * - BST Inorder Traversal = Sorted Array
 * - If two nodes swapped → array has TWO violations
 * 
 * EXAMPLE:
 * Correct BST:  [1, 2, 3, 4, 5]
 * After swap:   [1, 4, 3, 2, 5]  (2 and 4 swapped)
 *                    ↑  ↑  ↑
 *              Violations: 4>3 and 3>2
 * 
 * PATTERN:
 * - First violation: first = 4, second = 3
 * - Second violation: second = 2 (update second)
 * - Swap first(4) and second(2)
 */

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// ============================================
// SOLUTION 1: SIMPLE ARRAY APPROACH (EASIEST)
// ============================================

function recoverTree_Array(root) {
    const nodes = [];
    
    // Step 1: Collect all nodes in inorder (should be sorted)
    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        nodes.push(node);
        inorder(node.right);
    }
    
    inorder(root);
    
    // Step 2: Find the two swapped nodes
    let first = null, second = null;
    
    for (let i = 0; i < nodes.length - 1; i++) {
        if (nodes[i].val > nodes[i + 1].val) {
            // Found a violation
            if (!first) {
                // First violation
                first = nodes[i];
                second = nodes[i + 1];
            } else {
                // Second violation (update second)
                second = nodes[i + 1];
            }
        }
    }
    
    // Step 3: Swap the values
    if (first && second) {
        let temp = first.val;
        first.val = second.val;
        second.val = temp;
    }
}

// ============================================
// SOLUTION 2: OPTIMAL O(1) SPACE (MORRIS TRAVERSAL)
// ============================================

function recoverTree_Optimal(root) {
    let first = null, second = null;
    let prev = null;
    
    // Inorder traversal to find violations
    function inorder(node) {
        if (!node) return;
        
        inorder(node.left);
        
        // Check for violation: prev > current
        if (prev && prev.val > node.val) {
            if (!first) {
                // First violation
                first = prev;
                second = node;
            } else {
                // Second violation (update second)
                second = node;
            }
        }
        
        prev = node;
        inorder(node.right);
    }
    
    inorder(root);
    
    // Swap the values
    if (first && second) {
        let temp = first.val;
        first.val = second.val;
        second.val = temp;
    }
}

// ============================================
// VISUALIZATION & TESTING
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

function getInorder(root) {
    const result = [];
    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        result.push(node.val);
        inorder(node.right);
    }
    inorder(root);
    return result;
}

function cloneTree(root) {
    if (!root) return null;
    const newNode = new TreeNode(root.val);
    newNode.left = cloneTree(root.left);
    newNode.right = cloneTree(root.right);
    return newNode;
}

// ============================================
// TEST CASES
// ============================================

console.log("=".repeat(60));
console.log("RECOVER BINARY SEARCH TREE");
console.log("=".repeat(60));

// Test Case 1: Adjacent nodes swapped
console.log("\n📊 TEST CASE 1: Adjacent Nodes Swapped");
/*
  Correct:   1         Swapped:   3
            / \                  / \
           2   3                2   1
*/
console.log("\nOriginal (Incorrect) Tree:");
let root1 = new TreeNode(3);
root1.left = new TreeNode(1);
root1.right = new TreeNode(2);

visualizeTree(root1);
console.log("\nInorder before:", getInorder(root1));
console.log("Expected sorted: [1, 2, 3]");

recoverTree_Array(root1);
console.log("\nAfter recovery:");
visualizeTree(root1);
console.log("Inorder after:", getInorder(root1));

// Test Case 2: Non-adjacent nodes swapped
console.log("\n" + "=".repeat(60));
console.log("\n📊 TEST CASE 2: Non-Adjacent Nodes Swapped");
/*
  Correct:     3         Swapped:     3
              / \                    / \
             1   4                  4   1
                / \                    / \
               2   5                  2   5
*/
console.log("\nOriginal (Incorrect) Tree:");
let root2 = new TreeNode(3);
root2.left = new TreeNode(4);
root2.right = new TreeNode(1);
root2.right.left = new TreeNode(2);
root2.right.right = new TreeNode(5);

visualizeTree(root2);
console.log("\nInorder before:", getInorder(root2));
console.log("Expected sorted: [1, 2, 3, 4, 5]");

recoverTree_Optimal(root2);
console.log("\nAfter recovery:");
visualizeTree(root2);
console.log("Inorder after:", getInorder(root2));

// Test Case 3: Large tree
console.log("\n" + "=".repeat(60));
console.log("\n📊 TEST CASE 3: Larger Tree");
/*
  Correct:      5         Swapped:      5
               / \                     / \
              3   7                   3   7
             / \ / \                 / \ / \
            2  4 6  8               2  8 6  4
*/
console.log("\nOriginal (Incorrect) Tree:");
let root3 = new TreeNode(5);
root3.left = new TreeNode(3);
root3.right = new TreeNode(7);
root3.left.left = new TreeNode(2);
root3.left.right = new TreeNode(8);  // Should be 4
root3.right.left = new TreeNode(6);
root3.right.right = new TreeNode(4);  // Should be 8

visualizeTree(root3);
console.log("\nInorder before:", getInorder(root3));
console.log("Expected sorted: [2, 3, 4, 5, 6, 7, 8]");

let root3_clone = cloneTree(root3);
recoverTree_Array(root3_clone);
console.log("\nAfter recovery (Array method):");
visualizeTree(root3_clone);
console.log("Inorder after:", getInorder(root3_clone));

// Test Case 4: Root swapped
console.log("\n" + "=".repeat(60));
console.log("\n📊 TEST CASE 4: Root Swapped with Leaf");
/*
  Correct:     2         Swapped:     1
              / \                    / \
             1   3                  2   3
*/
console.log("\nOriginal (Incorrect) Tree:");
let root4 = new TreeNode(1);
root4.left = new TreeNode(2);
root4.right = new TreeNode(3);

visualizeTree(root4);
console.log("\nInorder before:", getInorder(root4));
console.log("Expected sorted: [1, 2, 3]");

recoverTree_Optimal(root4);
console.log("\nAfter recovery:");
visualizeTree(root4);
console.log("Inorder after:", getInorder(root4));

// ============================================
// DETAILED EXPLANATION
// ============================================

console.log("\n" + "=".repeat(60));
console.log("📚 DETAILED EXPLANATION");
console.log("=".repeat(60));
console.log(`
🎯 THE PROBLEM:
   Two nodes in a BST are swapped by mistake. Fix the tree!
   
💡 KEY INSIGHT:
   BST property: Inorder traversal = SORTED array
   If two nodes swapped → array has violations

📊 EXAMPLE:
   Correct BST inorder:  [1, 2, 3, 4, 5]
   After swapping 2 & 4: [1, 4, 3, 2, 5]
                             ↑  ↑  ↑
   
   Violations where arr[i] > arr[i+1]:
   - First:  4 > 3  → first = 4, second = 3
   - Second: 3 > 2  → second = 2 (update)
   
   Swap first(4) and second(2) → [1, 2, 3, 4, 5] ✅

🔍 TWO CASES:

Case 1: ADJACENT nodes swapped
   [1, 3, 2, 4, 5]
       ↑  ↑
   Only ONE violation: 3 > 2
   Swap: first = 3, second = 2

Case 2: NON-ADJACENT nodes swapped
   [1, 4, 3, 2, 5]
       ↑  ↑  ↑
   TWO violations:
   - First: 4 > 3  → first = 4, second = 3
   - Second: 3 > 2 → second = 2 (update!)
   Swap: first = 4, second = 2

🔧 ALGORITHM (Simple Array Approach):

1. Do inorder traversal → collect all nodes
2. Find violations where nodes[i] > nodes[i+1]
3. Track first and second violation
4. Swap the values

function recoverTree(root) {
    nodes = inorder(root);  // [1, 4, 3, 2, 5]
    
    first = null, second = null;
    
    for each adjacent pair:
        if (violation found):
            if (first is null):
                first = current
                second = next
            else:
                second = next  // Update for 2nd violation
    
    swap(first.val, second.val);
}

🚀 OPTIMAL APPROACH (O(1) Space):

   Same logic but use inorder traversal with prev pointer
   No need to store all nodes in array!
   
   prev = null
   
   During inorder:
       if (prev && prev.val > current.val):
           // Found violation
           if (!first):
               first = prev
               second = current
           else:
               second = current

⏱️  COMPLEXITY:

Array Approach:
   Time: O(n) - one inorder traversal
   Space: O(n) - store all nodes

Optimal Approach:
   Time: O(n) - one inorder traversal
   Space: O(h) - recursion stack only

🎯 INTERVIEW EXPLANATION:

"In a BST, inorder traversal gives sorted order. If two nodes 
are swapped, the sorted order is violated at 1 or 2 positions.

For adjacent swaps: one violation
For non-adjacent: two violations, update second pointer

I'll do inorder traversal, track violations, then swap the 
two problematic nodes. Time O(n), Space O(n) with array or 
O(h) if we track prev pointer during traversal."

🔑 KEY POINTS:
   - BST inorder = sorted
   - Two swaps = max 2 violations
   - First violation: mark first & second
   - Second violation: update second only
   - Swap values, not nodes
`);

console.log("=".repeat(60));