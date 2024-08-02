class LLNode {
    constructor(val) {
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class DoubleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    convert(root) {
        if (root === null) {
            return null;
        }

        this.head = null;
        this.tail = null;

        this.helper(root);

        return this.head;
    }

    helper(node) {
        if (node === null) {
            return;
        }

        // Traverse the left subtree
        this.helper(node.left);

        // Create a new doubly linked list node
        const newNode = new LLNode(node.val);

        // If the list is empty, initialize head and tail
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            // Add newNode to the end of the list
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }

        // Traverse the right subtree
        this.helper(node.right);
    }
}

// Example usage:
// Constructing the binary search tree:
//       4
//      / \
//     2   6
//    / \   \
//   1   3   5

const tree = new TreeNode(4);
tree.left = new TreeNode(2, new TreeNode(1), new TreeNode(3));
tree.right = new TreeNode(6, null, new TreeNode(5));

const dll = new DoubleLinkedList();
const doublyLinkedListHead = dll.convert(tree);

// Print the doubly linked list
let current = doublyLinkedListHead;
while (current !== null) {
    console.log(current.val);
    current = current.next;
}
