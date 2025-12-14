// Simple BFS using Queue
var levelOrder = function (root) {
    let result = [];

    if (root === null) {
        return result;
    }

    let queue = [];
    queue.push(root);

    while (queue.length > 0) {
        let levelSize = queue.length;
        let currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            let currentNode = queue.shift();
            currentLevel.push(currentNode.val);

            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
        }

        result.push(currentLevel);
    }

    return result;
};

// Avg of levels in Binary Tree  and we knw levels means BFS to be used

var averageOfLevels = function (root) {
    let result = [];

    if (root === null) {
        return result;
    }

    let queue = [];
    queue.push(root);

    while (queue.length > 0) {
        let levelSize = queue.length;
        // let currentLevel = [];
        let sum = 0;

        for (let i = 0; i < levelSize; i++) {
            let currentNode = queue.shift();
            sum = sum + currentNode.val;
            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
        }
        result.push(sum / (levelSize));

        // result.push(currentLevel);
    }

    return result;
};

// Right View  [1,3,4]
//    1  <--
//   / \
//  2   3  <--
//   \   \
//    5   4  <---

var rightSideView = function (root) {
    let result = [];

    if (!root) {
        return result;
    }

    let queue = [];
    queue.push(root);

    while (queue.length > 0) {
        let levelSize = queue.length;
        let rightmostValue = null;

        for (let i = 0; i < levelSize; i++) {
            let currentNode = queue.shift();
            // Capture the rightmost node's value in this level
            rightmostValue = currentNode.val;

            // Enqueue the child nodes
            if (currentNode.left) {
                queue.push(currentNode.left);
            }
            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }

        // Add the rightmost value of the current level to the result
        result.push(rightmostValue);
    }

    return result;
};

// ZigZag Traversal - In every alternate level print in reverse order 
var zigzagLevelOrder = function (root) {

    if (root == null) return [];

    let deque = [];
    let result = []
    let level = 0;
    deque.unshift(root);

    while (deque.length > 0) {

        let levelSize = deque.length;
        let currentLevel = [];
        let flag = false;

        for (let i = 0; i < levelSize; i++) {
            if (level % 2 == 0) {
                let currentNode = deque.shift();
                currentLevel.push(currentNode.val);

                if (currentNode.left !== null) {
                    deque.push(currentNode.left);
                }
                if (currentNode.right !== null) {
                    deque.push(currentNode.right);
                }
            }
            else {
                let currentNode = deque.pop();
                currentLevel.push(currentNode.val);

                if (currentNode.right !== null) {
                    deque.unshift(currentNode.right);
                }
                if (currentNode.left !== null) {
                    deque.unshift(currentNode.left);
                }
            }

        }
        level = level + 1;
        result.push(currentLevel);
    }
    return result;

};

//leetcode.com/problems/populating-next-right-pointers-in-each-node/
//withQueue
var connect = function (root) {
    if (!root) {
        return root;
    }

    let queue = [];
    queue.push(root);

    while (queue.length > 0) {
        let levelSize = queue.length;

        for (let i = 0; i < levelSize; i++) {
            let currentNode = queue.shift();

            // Connect the nodes at the same level
            if (i < levelSize - 1) {
                currentNode.next = queue[0];
            }

            // Push the children of the current node into the queue
            if (currentNode.left) {
                queue.push(currentNode.left);
            }
            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }
    }

    return root;
};

//withoutQueue
var connect = function (root) {
    if (!root) {
        return root;
    }

    let leftmost = root;
    while (leftmost.left !== null) {
        let current = leftmost;
        while (current != null) {
            current.left.next = current.right;
            if (current.next != null) {
                current.right.next = current.next.left;
            }
            current = current.next;
        }
        leftmost = leftmost.left;
    }

    return root;
};

// https://leetcode.com/problems/cousins-in-binary-tree/
var isCousins = function(root, x, y) {
    let xx = findNode(root, x); // Find node with value x
    let yy = findNode(root, y); // Find node with value y

    // Check if both nodes are found and have the same level, and they are not siblings
    return (
      (level(root, xx, 0) === level(root, yy, 0)) && (!isSibling(root, xx, yy))
    );
};

// Function to find a node with given value x in the tree
function findNode(node, x) {
    if (node === null) {
      return null;
    }
    if (node.val === x) {
      return node;
    }
    let n = findNode(node.left, x);
    if (n !== null) {
      return n;
    }
    return findNode(node.right, x);
}

// Function to check if two nodes are siblings in the tree
function isSibling(node, x, y) {
    if (node === null) {
        return false;
    }

    return (
        (node.left === x && node.right === y) || (node.left === y && node.right === x) ||
        isSibling(node.left, x, y) || isSibling(node.right, x, y)
    );
}

// Function to calculate the level of a node in the tree
function level(root, node, currentLevel) {
    if (root === null) {
        return -1; // Node not found
    }
    if (root === node) {
        return currentLevel;
    }
    // Check in the left subtree
    let leftLevel = level(root.left, node, currentLevel + 1);
    if (leftLevel !== -1) {
        return leftLevel;
    }
    // Check in the right subtree
    return level(root.right, node, currentLevel + 1);
}

//https://leetcode.com/problems/symmetric-tree/
var isSymmetric = function (root) {
    if (root === null) {
        return true; // An empty tree is symmetric
    }
    let queue = [];
    queue.push(root.left);
    queue.push(root.right);
    let currentLevel = [];

    while (queue.length > 0) {
        let l = queue.shift();
        let r = queue.shift();

        if (l === null && r === null)
            continue;

        if (l == null || r == null)
            return false;

        if (l.val != r.val)
            return false;

        queue.push(l.left);
        queue.push(r.right);
        queue.push(l.right);
        queue.push(r.left);
    }
    return true;
};

var isSymmetric = function(root) {
    if (!root) return true;

    return isMirror(root.left, root.right);
};

var isSymmetric = function(root) {
    if (!root) return true;
    return isMirror(root.left, root.right);
};

function isMirror(left, right) {
    if (!left && !right) return true;   // both null
    if (!left || !right) return false;  // one null, one not
    if (left.val !== right.val) return false; // values differ

    return (
        isMirror(left.left, right.right) &&
        isMirror(left.right, right.left)
    );
}
