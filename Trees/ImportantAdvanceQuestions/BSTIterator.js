/**
 * BST ITERATOR - COMPLETE SOLUTION
 */

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// ============================================
// SOLUTION 1: ARRAY APPROACH (EASIEST)
// ============================================
//TC O(N) SC O(N)
var BSTIterator = function(root) {
    this.nodes = [];
    this.index = 0;
    this.inorder(root);
};

BSTIterator.prototype.inorder = function(node) {
    if (!node) return;
    this.inorder(node.left);
    this.nodes.push(node.val);
    this.inorder(node.right);
};

BSTIterator.prototype.next = function() {
    return this.nodes[this.index++];
};

BSTIterator.prototype.hasNext = function() {
    return this.index < this.nodes.length;
};

// ============================================
// SOLUTION 2: STACK APPROACH (OPTIMAL - RECOMMENDED)
// ============================================
//TC O(h) SC O(h)
var BSTIterator_Optimal = function(root) {
    this.stack = [];
    this.pushLeft(root);
};

BSTIterator_Optimal.prototype.pushLeft = function(node) {
    while (node) {
        this.stack.push(node);
        node = node.left;
    }
};

BSTIterator_Optimal.prototype.next = function() {
    const node = this.stack.pop();
    if (node.right) {
        this.pushLeft(node.right);
    }
    return node.val;
};

BSTIterator_Optimal.prototype.hasNext = function() {
    return this.stack.length > 0;
};

// ============================================
// TESTS
// ============================================

console.log("=".repeat(60));
console.log("BST ITERATOR - SOLUTIONS");
console.log("=".repeat(60));

// Create test tree
/*
        7
       / \
      3   15
         /  \
        9   20
*/
let root = new TreeNode(7);
root.left = new TreeNode(3);
root.right = new TreeNode(15);
root.right.left = new TreeNode(9);
root.right.right = new TreeNode(20);

console.log("\nTree: ");
console.log("        7");
console.log("       / \\");
console.log("      3   15");
console.log("         /  \\");
console.log("        9   20");

// Test Array Approach
console.log("\n--- Array Approach ---");
let iterator1 = new BSTIterator(root);
console.log("next():", iterator1.next());        // 3
console.log("next():", iterator1.next());        // 7
console.log("hasNext():", iterator1.hasNext());  // true
console.log("next():", iterator1.next());        // 9
console.log("next():", iterator1.next());        // 15
console.log("next():", iterator1.next());        // 20
console.log("hasNext():", iterator1.hasNext());  // false

// Test Stack Approach
console.log("\n--- Stack Approach (Optimal) ---");
let iterator2 = new BSTIterator_Optimal(root);
console.log("next():", iterator2.next());        // 3
console.log("next():", iterator2.next());        // 7
console.log("hasNext():", iterator2.hasNext());  // true
console.log("next():", iterator2.next());        // 9
console.log("next():", iterator2.next());        // 15
console.log("next():", iterator2.next());        // 20
console.log("hasNext():", iterator2.hasNext());  // false

console.log("\n" + "=".repeat(60));
console.log("COMPLEXITY ANALYSIS");
console.log("=".repeat(60));
console.log(`
Array Approach:
  Time: Constructor O(n), next() O(1), hasNext() O(1)
  Space: O(n)

Stack Approach (Optimal):
  Time: Constructor O(h), next() O(1) amortized, hasNext() O(1)
  Space: O(h) where h = height
  
For LeetCode, use Stack Approach (optimal)!
`);