// Node class representing each node in the Segment Tree
class Node {
    constructor(start, end) {
        this.data = 0; // Initialize data to 0
        this.startInterval = start;
        this.endInterval = end;
        this.left = null;
        this.right = null;
    }
}

class SegmentTree {
    constructor(arr) {
        this.root = this._buildTree(arr, 0, arr.length - 1);
    }

    // Private method to recursively build the segment tree
    _buildTree(arr, start, end) {
        if (start === end) {
            let leaf = new Node(start, end);
            leaf.data = arr[start];
            return leaf;
        }

        let mid = Math.floor((start + end) / 2);
        let node = new Node(start, end);
        node.left = this._buildTree(arr, start, mid);
        node.right = this._buildTree(arr, mid + 1, end);
        node.data = node.left.data + node.right.data;
        return node;
    }

    // Public method to display the segment tree
    display() {
        this._display(this.root);
    }

    // Private method to recursively display the segment tree
    _display(node) {
        console.log(`Interval=[${node.startInterval}-${node.endInterval}] and data: ${node.data}`);
        if (node.left) {
            console.log(`Left child of [${node.startInterval}-${node.endInterval}]:`);
            this._display(node.left);
        }
        if (node.right) {
            console.log(`Right child of [${node.startInterval}-${node.endInterval}]:`);
            this._display(node.right);
        }
    }

    // Public method to perform a range sum query
    query(qsi, qei) {
        return this._query(this.root, qsi, qei);
    }

    // Private method to recursively perform a range sum query
    _query(node, qsi, qei) {
        if (node.startInterval >= qsi && node.endInterval <= qei) {
            // Node interval completely within query range
            return node.data;
        } else if (node.startInterval > qei || node.endInterval < qsi) {
            // Node interval completely outside query range
            return 0;
        } else {
            // Node interval partially overlaps with query range
            let leftSum = this._query(node.left, qsi, qei);
            let rightSum = this._query(node.right, qsi, qei);
            return leftSum + rightSum;
        }
    }

    // Public method to update an element in the array and segment tree
    update(index, value) {
        this._update(this.root, index, value);
    }

    // Private method to recursively update the segment tree after an array update
    _update(node, index, value) {
        if (index < node.startInterval || index > node.endInterval) {
            return; // Index is out of the current node's range
        }

        if (node.startInterval === node.endInterval) {
            // Leaf node reached
            node.data = value;
            return;
        }

        // Update left or right subtree based on index
        this._update(node.left, index, value);
        this._update(node.right, index, value);

        // Update current node's data after recursive updates
        node.data = node.left.data + node.right.data;
    }
}

// Example usage:
let arr = [3, 8, 6, 7, -2, -8, 4, 9];
let tree = new SegmentTree(arr);

// Display the segment tree structure
console.log("Segment Tree Structure:");
tree.display();

// Perform a range sum query
let sum = tree.query(1, 6);
console.log(`Sum from index 1 to 6: ${sum}`); // Output: Sum from index 1 to 6: 15

// Update an element in the array and segment tree
tree.update(2, 5); // Update index 2 to value 5
console.log("Updated Segment Tree Structure:");
tree.display();
