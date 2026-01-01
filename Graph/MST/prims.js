import MinHeap from "./MinHeap.js";

class Graph {
  constructor(V) {
    this.V = V;
    this.adjList = Array.from({ length: V }, () => []);
  }

  addEdge(u, v, w) {
    this.adjList[u].push([v, w]);
    this.adjList[v].push([u, w]); // undirected
  }

  // Prim's MST method inside Graph class
  primMST() {
    const visited = new Array(this.V).fill(0);
    const mst = [];
    const pq = new MinHeap();

    // start from node 0
    pq.insert([0, 0, -1]); // [weight, node, parent]

    while (!pq.isEmpty() && mst.length < this.V - 1) {
      const [wt, node, parent] = pq.extractMin();

      if (visited[node] === 1) continue;

      visited[node] = 1;

      if (parent !== -1) {
        mst.push([wt, node, parent]);
      }

      for (let [adjNode, edgeWt] of this.adjList[node]) {
        if (visited[adjNode] === 0) {
          pq.insert([edgeWt, adjNode, node]);
        }
      }
    }

    return mst;
  }
}

const graph = new Graph(5);

graph.addEdge(0, 1, 2);
graph.addEdge(0, 3, 6);
graph.addEdge(1, 2, 3);
graph.addEdge(1, 3, 8);
graph.addEdge(1, 4, 5);
graph.addEdge(2, 4, 7);
graph.addEdge(3, 4, 9);

const mstResult = graph.primMST();

console.log("Edges in the Minimum Spanning Tree:");
for (let [wt, node, parent] of mstResult) {
  console.log(`Parent: ${parent}, Node: ${node}, Weight: ${wt}`);
}
