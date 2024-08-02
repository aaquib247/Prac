class TreeNode {
    constructor(val = 0, left = null, right = null) {
      this.val = val;
      this.left = left;
      this.right = right;
    }
  }
  
  class TwoSum {
    constructor() {
      this.set = new Set(); // To keep track of seen values
    }
  
    findTarget(root, k) {
      return this.helper(root, k);
    }
  
    helper(node, k) {
      if (node === null) {
        return false;
      }
  
      // Check if the complement of the current node's value exists in the set
      if (this.set.has(k - node.val)) {
        return true;
      }
  
      // Add the current node's value to the set
      this.set.add(node.val);
  
      // Recursively check left and right subtrees
      return this.helper(node.left, k) || this.helper(node.right, k);
    }
  }
  