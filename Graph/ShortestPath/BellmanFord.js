class Graph {
    constructor(N) {
        this.N = N; // Number of vertices
        this.adjList = Array.from({ length: N }, () => []); // Initialize adjacency list
    }

    addEdge(u, v, w) {
        this.adjList[u].push([v, w]);
        // For directed graph, no need to add reverse edge
    }

    bellmanFord(source) {
        // Initialize distances from source to all vertices as Infinity
        const dist = Array(this.N).fill(Infinity);
        dist[source] = 0;

        // Relax edges |V| - 1 times
        for (let i = 1; i < this.N; i++) {
            for (let u = 0; u < this.N; u++) {
                for (const [v, weight] of this.adjList[u]) {
                    if (dist[u] !== Infinity && dist[u] + weight < dist[v]) {
                        dist[v] = dist[u] + weight;
                    }
                }
            }
        }

        // Check for negative weight cycles
        for (let u = 0; u < this.N; u++) {
            for (const [v, weight] of this.adjList[u]) {
                if (dist[u] !== Infinity && dist[u] + weight < dist[v]) {
                    throw new Error("Graph contains a negative-weight cycle");
                }
            }
        }

        // Convert distances to -1 for unreachable nodes
        return dist.map(d => (d === Infinity ? -1 : d));
    }
}

// Example usage
const N = 5; // Number of vertices
const graph = new Graph(N);

graph.addEdge(0, 1, 1);
graph.addEdge(0, 2, 4);
graph.addEdge(1, 2, 2);
graph.addEdge(1, 3, 6);
graph.addEdge(2, 3, 3);
graph.addEdge(3, 4, 2);
graph.addEdge(4, 1, -5);

try {
    const distances = graph.bellmanFord(0);
    console.log("Shortest distances from source '0':", distances);
} catch (error) {
    console.error(error.message);
}
