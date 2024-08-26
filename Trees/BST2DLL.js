// Definition for a binary tree node.
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Definition for a doubly linked list node.
class LLNode {
    constructor(val, prev = null, next = null) {
        this.val = val;
        this.prev = prev;
        this.next = next;
    }
}

// DoubleLinkedList class to convert BST to a doubly linked list
class DoubleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    convert(root) {
        if (root === null) {
            return null;
        }

        this.helper(root);
        return this.head;
    }

    helper(node) {
        if (node === null) {
            return;
        }

        // Traverse left subtree
        this.helper(node.left);

        // Create a new doubly linked list node
        const newNode = new LLNode(node.val);

        if (this.head === null) {
            // Initialize head and tail
            this.head = newNode;
            this.tail = newNode;
        } else {
            // Append to the end of the list
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }

        // Traverse right subtree
        this.helper(node.right);
    }
}

// Example usage:
const root = new TreeNode(4,
                new TreeNode(2, new TreeNode(1), new TreeNode(3)),
                new TreeNode(5));

const dll = new DoubleLinkedList();
const doublyLinkedListHead = dll.convert(root);

// Function to print the doubly linked list
function printDoublyLinkedList(head) {
    let node = head;
    let result = '';
    while (node !== null) {
        result += node.val + ' <-> ';
        node = node.next;
    }
    console.log(result.slice(0, -4)); // Remove trailing " <-> "
}

printDoublyLinkedList(doublyLinkedListHead);
