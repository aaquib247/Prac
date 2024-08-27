// Definition for a binary tree node.

var recoverTree = function(root) {
    let first = null;
    let second = null;
    let prev = null;
    
    // In-order traversal to find the swapped nodes
    function inOrderTraversal(node) {
        if (node === null) return;
        
        inOrderTraversal(node.left);
        
        if (prev && prev.val > node.val) {
            if (first === null) {
                first = prev;
            }
            second = node;
        }
        prev = node;
        
        inOrderTraversal(node.right);
    }
    
    inOrderTraversal(root);
    
    // Swap the values of the two nodes
    if (first && second) {
        let temp = first.val;
        first.val = second.val;
        second.val = temp;
    }
};

//-------------------------------------------

class Node {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class TwoNodeSwap {
    constructor() {
        this.first = null;
        this.second = null;
        this.prev = null;
    }

    // Function to find and swap the two nodes
    swapNodes(root) {
        this.iot(root);

        // Swap the values of the two nodes
        if (this.first && this.second) {
            const temp = this.first.val;
            this.first.val = this.second.val;
            this.second.val = temp;
        }
    }

    // In-order traversal to find the swapped nodes
    iot(node) {
        if (node === null) {
            return;
        }

        this.iot(node.left);

        if (this.prev && this.prev.val > node.val) {
            if (this.first === null) {
                this.first = this.prev;
            }
            this.second = node;
        }

        this.prev = node;

        this.iot(node.right);
    }

    // Function to print the tree in in-order
    printIOT(node) {
        if (node === null) {
            return;
        }
        this.printIOT(node.left);
        console.log(node.val);
        this.printIOT(node.right);
    }
}

// Example usage:
const root = new Node(1, 
                new Node(3, null, new Node(2)), 
                new Node(4));

const twoNodeSwap = new TwoNodeSwap();
console.log("Before swapping:");
twoNodeSwap.printIOT(root); // Print in-order before swapping

twoNodeSwap.swapNodes(root);

console.log("After swapping:");
twoNodeSwap.printIOT(root); // Print in-order after swapping
