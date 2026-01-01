// ===== N-ARY TREE NODE DEFINITION =====
class Node {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

// ===== SAMPLE TREE CONSTRUCTION =====
// Tree structure:
//         1
//       / | \
//      2  3  4
//        / \
//       5   6

const root = new Node(1, [
  new Node(2),
  new Node(3, [
    new Node(5),
    new Node(6),
  ]),
  new Node(4),
]);

// ===== TRAVERSAL FUNCTIONS =====

// Preorder Traversal (Root -> Children)
function preorder(root) {
  const result = [];

  function dfs(node) {
    if (!node) return;
    result.push(node.val);
    for (const child of node.children) {
      dfs(child);
    }
  }

  dfs(root);
  return result;
}

// Postorder Traversal (Children -> Root)
function postorder(root) {
  const result = [];

  function dfs(node) {
    if (!node) return;
    for (const child of node.children) {
      dfs(child);
    }
    result.push(node.val);
  }

  dfs(root);
  return result;
}

// Level Order Traversal (Breadth-First Search)
function levelOrder(root) {
  const result = [];
  if (!root) return result;

  const queue = [root];
  while (queue.length > 0) {
    const level = [];
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      for (const child of node.children) {
        queue.push(child);
      }
    }

    result.push(level);
  }

  return result;
}

// ===== PROPERTY FUNCTIONS =====

// Maximum Depth of the Tree
var maxDepth = function(root) {
    if (!root) return 0;

    let max = 0;
    for (let child of root.children) {
        max = Math.max(max, maxDepth(child));
    }

    return max + 1;
};

// Count Total Leaf Nodes
function countLeafNodes(root) {
  if (!root) return 0;
  if (root.children.length === 0) return 1;

  let count = 0;
  for (const child of root.children) {
    count += countLeafNodes(child);
  }

  return count;
}

// ===== RUNNING ALL FUNCTIONS =====
console.log("Preorder Traversal: ", preorder(root));      // [1, 2, 3, 5, 6, 4]
console.log("Postorder Traversal: ", postorder(root));    // [2, 5, 6, 3, 4, 1]
console.log("Level Order Traversal: ", levelOrder(root)); // [[1], [2, 3, 4], [5, 6]]
console.log("Max Depth: ", maxDepth(root));               // 3
console.log("Leaf Node Count: ", countLeafNodes(root));   // 4 (Nodes 2, 5, 6, 4)


//k-th Largest Level Sum — N-ary Tree (BFS)
var kthLargestLevelSum = function (root, k) {
    if (!root) return -1;

    let queue = [root];
    let sums = [];
    let idx = 0;

    while (idx < queue.length) {
        let size = queue.length - idx;
        let sum = 0;

        for (let i = 0; i < size; i++) {
            let node = queue[idx++];
            sum += node.val;
            //instead of left and right, we have children array
            for (let child of node.children) {
                if (child) queue.push(child);
            }
        }

        sums.push(sum);
    }

    if (k > sums.length) return -1;

    sums.sort((a, b) => b - a);
    return sums[k - 1];
};
