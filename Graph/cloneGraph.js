
class Node {
  constructor(val) {
    this.val = val;
    this.neighbors = [];
  }
}


function cloneGraph(node) {
  if (!node) return null;

  const visited = new Map(); // Map original -> clone
  const queue = [node];

  // Clone the root node
  visited.set(node, new Node(node.val));

  while (queue.length > 0) {
    const current = queue.shift();

    for (let neighbor of current.neighbors) {
      if (!visited.has(neighbor)) {
        // Clone the neighbor if it hasn't been cloned
        visited.set(neighbor, new Node(neighbor.val));
        queue.push(neighbor);
      }

      // Connect the cloned current node to the cloned neighbor
      visited.get(current).neighbors.push(visited.get(neighbor));
    }
  }

  return visited.get(node);
}

// Creating a sample graph:
// 1 -- 2
// |    |
// 4 -- 3

const node1 = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);
const node4 = new Node(4);

node1.neighbors.push(node2, node4);
node2.neighbors.push(node1, node3);
node3.neighbors.push(node2, node4);
node4.neighbors.push(node1, node3);

const clonedGraph = cloneGraph(node1);
console.log(clonedGraph); // Should show a deep copy of the graph
