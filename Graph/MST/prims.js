const { MinHeap } = require('heap'); // Assuming 'heap' is installed and provides a MinHeap

class Graph {
    constructor(N) {
        this.N = N; // Number of vertices
        this.adjList = Array.from({ length: N }, () => []);
    }

    addEdge(u, v, w) {
        this.adjList[u].push({ vertex: v, weight: w });
        this.adjList[v].push({ vertex: u, weight: w }); // For undirected graph
    }

    primMST(start) {
        const visited = new Set(); // Track vertices included in MST
        const minHeap = new MinHeap((a, b) => a[1] - b[1]); // Min-heap based on edge weight
        const key = Array(this.N).fill(Infinity); // Minimum weight to connect each vertex to MST
        const parent = Array(this.N).fill(null); // Store parent of each vertex in MST
        let mstWeight = 0;

        key[start] = 0;
        minHeap.add([start, 0]);

        while (!minHeap.isEmpty()) {
            const [u, uKey] = minHeap.remove();

            if (visited.has(u)) continue; // Skip already included vertices in MST

            visited.add(u);
            mstWeight += uKey;

            for (const { vertex: v, weight: w } of this.adjList[u]) {
                if (!visited.has(v) && w < key[v]) {
                    key[v] = w;
                    parent[v] = u;
                    minHeap.add([v, w]);
                }
            }
        }

        // Return MST weight and parent array for edges
        return { mstWeight, parent };
    }
}

// Example usage
const N = 5; // Number of vertices
const graph = new Graph(N);

graph.addEdge(0, 1, 2);
graph.addEdge(0, 3, 6);
graph.addEdge(1, 2, 3);
graph.addEdge(1, 3, 8);
graph.addEdge(1, 4, 5);
graph.addEdge(2, 4, 7);
graph.addEdge(3, 4, 9);

const { mstWeight, parent } = graph.primMST(0);
console.log("Weight of MST:", mstWeight);
console.log("Parent array:", parent);
