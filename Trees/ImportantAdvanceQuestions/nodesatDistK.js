// Step 1: Add Parent Pointers
//    Before:          After:
//       3               3
//      / \             /↕\
//     5   1           5↔ 3 ↔1
//    / \             /↕\ /↕\
//   6   2           6  2 0  8

// Step 2: Now it's a GRAPH! Each node has 3 neighbors:
//    - Left child
//    - Right child  
//    - Parent

// Step 3: Do BFS from target (like finding friends on social media)
//    - Distance 0: target
//    - Distance 1: target's neighbors
//    - Distance K: ANSWER!

// 1. Build parent map (so we can go UP)
// 2. Start BFS from target
// 3. Track distance and visited nodes
// 4. Collect all nodes at distance K
// ```

// ### Visual Example:
// ```
// Target = 5, K = 2

//        3 ←── Distance 2 from 5
//       / \
//      5   1 ←── Distance 2 from 5
//     / \
//    6   2
//       / \
//      7   4 ←── Both distance 2 from 5

// Answer: [3, 1, 7, 4]

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function distanceK_BFS(root, target, k) {
    // Step 1: Build parent pointers (convert to graph)
    const parentMap = new Map();
    
    function buildParentMap(node, parent = null) {
        if (!node) return;
        parentMap.set(node, parent);
        buildParentMap(node.left, node);
        buildParentMap(node.right, node);
    }
    
    buildParentMap(root);
    
    // Step 2: BFS from target
    const queue = [[target, 0]]; // [node, distance]
    const visited = new Set([target]);
    const result = [];
    
    while (queue.length > 0) {
        const [node, dist] = queue.shift();
        
        // Found nodes at distance K
        if (dist === k) {
            result.push(node.val);
            continue;
        }
        
        // Explore neighbors: left, right, parent
        const neighbors = [
            node.left,
            node.right,
            parentMap.get(node)
        ];
        
        for (const neighbor of neighbors) {
            if (neighbor && !visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, dist + 1]);
            }
        }
    }
    
    return result;
}


// Example usage:
// Constructing the binary tree:
//        3
//       / \
//      5   1
//     / \  / \
//    6  2 0   8
//      / \
//     7   4

const root = new TreeNode(3);
root.left = new TreeNode(5);
root.right = new TreeNode(1);
root.left.left = new TreeNode(6);
root.left.right = new TreeNode(2);
root.right.left = new TreeNode(0);
root.right.right = new TreeNode(8);
root.left.right.left = new TreeNode(7);
root.left.right.right = new TreeNode(4);

const target = root.left; // Node with value 5
const k = 2;

console.log(distanceK_BFS(root, target, k)); // Output: [7, 4, 1]
// Explanation: Nodes at distance 2 from target (5) are 7, 4, and 1.    
//   Time: O(n) - visit each node once
//     Space: O(n) - parent map + visited set