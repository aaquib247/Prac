//https://leetcode.com/problems/diameter-of-binary-tree/submissions/1327221545/    T - O(n)
var diameterOfBinaryTree = function (root) {
    let diameter = 0; // Initialize diameter within the function scope

    function height(node) {
        if (node === null) {
            return 0;
        }

        let leftHeight = height(node.left);
        let rightHeight = height(node.right);

        // Calculate diameter passing through the current node
        let dia = leftHeight + rightHeight;
        diameter = Math.max(diameter, dia);

        // Return height of the subtree rooted at the current node
        return Math.max(leftHeight, rightHeight) + 1;
    }

    // Start calculating height and diameter from the root
    height(root);

    return diameter; // Return the maximum diameter found
};

//https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
var sortedArrayToBST = function (nums) {
    // Helper function to recursively build the BST
    function buildBST(left, right) {
        if (left > right) {
            return null;  // Base case: no elements to construct
        }

        // Find the middle element of the array
        let mid = Math.floor((left + right) / 2);

        // Create a new node with the middle value
        let node = new TreeNode(nums[mid]);

        // Recursively build the left and right subtrees
        node.left = buildBST(left, mid - 1);
        node.right = buildBST(mid + 1, right);

        return node;  // Return the constructed node
    }
    // Start building the BST from the entire array
    return buildBST(0, nums.length - 1);
};

//https://leetcode.com/problems/flatten-binary-tree-to-linked-list/
var flatten = function (root) {
    if (!root) return;

    let queue = []; // To store nodes in pre-order traversal order

    // Perform pre-order traversal and store nodes in the queue
    function preOrder(node) {
        if (!node) return;

        queue.push(node);

        preOrder(node.left);
        preOrder(node.right);
    }

    preOrder(root);

    // Construct the linked list from the queue
    let currentNode = root;
    for (let i = 1; i < queue.length; i++) {
        currentNode.left = null;
        currentNode.right = queue[i];
        currentNode = currentNode.right;
    }
};

//BetterWAy
var flatten = function (root) {
    let current = root;
    while (current != null) {
        if (current.left != null) {
            let temp = current.left;
            while (temp.right != null) {
                temp = temp.right;
            }

            temp.right = current.right;
            current.right = current.left;
            current.left = null;
        }
        current = current.right;
    }

};

//https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
var lowestCommonAncestor = function (root, p, q) {
    if (root == null) {
        return null;
    }

    if (root === p || root === q) {
        return root;
    }

    let left = lowestCommonAncestor(root.left, p, q)
    let right = lowestCommonAncestor(root.right, p, q)

    // Got from both side
    if (right != null && left != null) return root;

    // only one side found, no need to check the other
    return left == null ? right : left;

};

//https://leetcode.com/problems/kth-smallest-element-in-a-bst/
var kthSmallest = function (root, k) {
    // Array to store inorder traversal results
    let ans = [];
    function inorder(node) {
        if (!node) return;
        inorder(node.left);  // Traverse left subtree
        ans.push(node.val);  // Visit current node
        inorder(node.right); // Traverse right subtree
    }
    inorder(root);
    return ans[k - 1];
};

//https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
var buildTree = function(preorder, inorder) {
   if(preorder.length == 0)
    return null;

    let r = preorder[0];
    let index = 0;

    for(let i=0;i<inorder.length;i++){
       if(inorder[i] === r)
         index = i;
    }
    let root = new TreeNode(r);
    root.left = buildTree(preorder.slice(1,index+1),inorder.slice(0,index))
    root.right = buildTree(preorder.slice(index+1,preorder.length),inorder.slice(index+1,inorder.length))

    return root;
   
};

//Serialization (tree into strings) and Deserialization (strings to trees)
function serialize(root) {
    // Base case: If root is null, return "null"
    if (!root) {
        return 'null';
    }
    
    // Serialize the root node
    const serializedLeft = serialize(root.left);
    const serializedRight = serialize(root.right);
    
    return `${root.val},${serializedLeft},${serializedRight}`;
}

function deserialize(data) {
    // Split the serialized string into an array of values
    const nodes = data.split(',');
    
    // Recursive function to build the tree
    function buildTree() {
        // Get the next value from the array
        const val = nodes.shift();
        
        // Base case: If the value is "null", return null
        if (val === 'null') {
            return null;
        }
        
        // Create a new node with the extracted value
        const node = new TreeNode(parseInt(val));
        
        // Recursively build the left and right subtrees
        node.left = buildTree();
        node.right = buildTree();
        
        return node;
    }
    
    // Start building the tree from the root
    return buildTree();
}

//https://leetcode.com/problems/path-sum/
var hasPathSum = function (root, targetSum) {
    if (root == null)
        return false;
    targetSum = targetSum - root.val;
   if (targetSum === 0 && root.left === null && root.right === null) {
        return true;
    }
    // Recursively check left and right subtrees
    return hasPathSum(root.left, targetSum) || hasPathSum(root.right, targetSum);
}


//https://leetcode.com/problems/sum-root-to-leaf-numbers/
var sumNumbers = function (root) {
    return sumNumbersHelper(root, 0);
};
function sumNumbersHelper(node, currentSum) {
    if (node === null) {
        return 0;
    }
    // Calculate the current path sum
    currentSum = currentSum * 10 + node.val;
    // If it's a leaf node, return the path sum
    if (node.left === null && node.right === null) {
        return currentSum;
    }
    // Otherwise, recursively calculate the sum of left and right subtrees
    let leftSum = sumNumbersHelper(node.left, currentSum);
    let rightSum = sumNumbersHelper(node.right, currentSum);

    // Return the sum of both subtrees
    return leftSum + rightSum;
}

//https://leetcode.com/problems/binary-tree-maximum-path-sum
var maxPathSum = function (root) {
    let ans = -Infinity; // Initialize ans to a very small number
    
    helper(root);
    function helper(node) {
        if (node === null) {
            return 0;
        }

        let left = helper(node.left);
        let right = helper(node.right);

        // Ignore negative sums by taking Math.max with 0
        left = Math.max(0, left);
        right = Math.max(0, right);

        // Calculate the path sum including the current node
        let pathSum = left + right + node.val;

        // Update the global ans with the maximum path sum found so far
        ans = Math.max(ans, pathSum);

        // Return the maximum path sum that can extend further up to the parent nodes
        return Math.max(left, right) + node.val;
    }
    // Return the overall maximum path sum found
    return ans;
};

//Path Exists in Binary Tree from Root to Leaf - [3,9,12,8]
function findPath(node, arr) {
    if (node === null) {
      return arr.length === 0;
    }
    return helper(node, arr, 0);
  }
  function helper(node, arr, index) {
    if (node === null) {
      return false;
    }
    if (index >= arr.length || node.val !== arr[index]) {
      return false;
    }
    if (node.left === null && node.right === null && index === arr.length - 1) {
      return true;
    }
    return helper(node.left, arr, index + 1) || helper(node.right, arr, index + 1);
  }
  

  //https://leetcode.com/problems/binary-tree-paths/description/
  function binaryTreePaths(root) {
    const paths = [];
  
    // Helper function to perform DFS and collect paths
    function dfs(node, path) {
      if (!node) return;
  
      // Append the current node's value to the path
      path += node.val;
  
      // If it's a leaf node, add the path to the results
      if (!node.left && !node.right) {
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
  