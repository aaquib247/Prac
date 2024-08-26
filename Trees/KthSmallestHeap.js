// Definition for a binary tree node.
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

// Import the heap library for max-heap operations
const MaxHeap = require('collections/heap'); // Use a heap library for simplicity

function kthSmallest(root, k) {
    const maxHeap = new MaxHeap([], null, (a, b) => a - b); // Max-heap, smallest elements at the top
    let count = 0;

    function inorderTraversal(node) {
        if (node === null) return;

        inorderTraversal(node.left);

        // Push current node value into the max-heap
        maxHeap.push(node.val);

        // Maintain heap size to be at most k
        if (maxHeap.length > k) {
            maxHeap.pop(); // Remove the largest element (which is the root of max-heap)
        }

        inorderTraversal(node.right);
    }

    inorderTraversal(root);

    // The root of the max-heap is the k-th smallest element
    return maxHeap.peek();
}

// Example usage:
const root = new TreeNode(5, 
                new TreeNode(3, new TreeNode(2), new TreeNode(4)), 
                new TreeNode(6, null, new TreeNode(7)));
console.log(kthSmallest(root, 3)); // Output: 4 (3rd smallest element)

//------------------------------------------------------------

// Definition for a binary tree node.
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// KthSmallest class to find the k-th smallest element in the BST
class KthSmallest {
    constructor() {
        this.k = 0;
        this.ans = null;
    }

    kthSmallest(root1, k) {
        this.k = k;
        this.helper(root1);
        return this.ans;
    }

    helper(node) {
        if (node === null) {
            return;
        }

        // In-order traversal: Visit left subtree
        this.helper(node.left);

        // Process current node
        this.k--;
        if (this.k === 0) {
            this.ans = node.val;
            return;
        }
        
        // Continue with right subtree if needed
        this.helper(node.right);
    }
}

// Example usage:
const root1 = new TreeNode(5, 
                new TreeNode(3, new TreeNode(2), new TreeNode(4)), 
                new TreeNode(6, null, new TreeNode(7)));

const kthSmallestFinder = new KthSmallest();
console.log(kthSmallestFinder.kthSmallest(root, 3)); // Output: 4 (3rd smallest element)


//---------------------------------------------------------

const { PriorityQueue } = require('collections/heap');

// Definition for a binary tree node.
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// KthSmallest class to find the k-th smallest element in the BST
class KthSmallest {
    kthSmallest2(root2, k) {
        const minHeap = new PriorityQueue([], null, (a, b) => a - b); // Min-heap
        this.helper(root2, minHeap, k);

        // Extract k elements from the heap
        let ans = 0;
        for (let i = 0; i < k; i++) {
            ans = minHeap.pop();
        }
        return ans;
    }

    helper(node, minHeap, k) {
        if (node === null) {
            return;
        }

        this.helper(node.left, minHeap, k);
        minHeap.add(node.val);
        this.helper(node.right, minHeap, k);
    }
}

// Example usage:
const root2 = new TreeNode(5, 
                new TreeNode(3, new TreeNode(2), new TreeNode(4)), 
                new TreeNode(6, null, new TreeNode(7)));

const kthSmallestFinder2 = new KthSmallest();
console.log(kthSmallestFinder.kthSmallest(root, 3)); // Output: 4 (3rd smallest element)
