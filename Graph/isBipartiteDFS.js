class GraphBipartite {
    constructor() {
        this.adjacencyList = {};
    }

    // Method to add a vertex to the graph
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    // Method to add an edge between two vertices
    addEdge(vertex1, vertex2) {
        // Check if vertices exist
        if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) {
            return "Vertex not found in the graph";
        }

        // Add vertex2 to vertex1's adjacency list
        this.adjacencyList[vertex1].push(vertex2);
        // Add vertex1 to vertex2's adjacency list (for undirected graph)
        this.adjacencyList[vertex2].push(vertex1);
    }

    // Method to check if the graph is bipartite using DFS
    isBipartite() {
        const colors = {}; // Dictionary to store colors of vertices

        // Helper function for DFS
        const dfs = (vertex, color) => {
            if (vertex in colors) {
                return colors[vertex] === color;
            }

            colors[vertex] = color;

            for (const neighbor of this.adjacencyList[vertex]) {
                if (!dfs(neighbor, 1 - color)) {
                    return false;
                }
            }

            return true;
        };

        // Check all components of the graph
        for (let vertex of Object.keys(this.adjacencyList)) {
            if (!(vertex in colors)) {
                if (!dfs(vertex, 0)) {
                    return false;
                }
            }
        }

        return true;
    }
}

// Example usage:
let graph = new GraphBipartite();

// Add vertices
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');

// Add edges for an undirected graph
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'D');

// Check if the graph is bipartite
console.log("Is the graph bipartite?", graph.isBipartite()); // Output: false

// Creating a bipartite graph example
let bipartiteGraph = new GraphBipartite();

// Add vertices
bipartiteGraph.addVertex('A');
bipartiteGraph.addVertex('B');
bipartiteGraph.addVertex('C');
bipartiteGraph.addVertex('D');

// Add edges for a bipartite graph
bipartiteGraph.addEdge('A', 'B');
bipartiteGraph.addEdge('A', 'C');
bipartiteGraph.addEdge('B', 'D');
bipartiteGraph.addEdge('C', 'D');

// Check if the bipartiteGraph is bipartite
console.log("Is the bipartiteGraph bipartite?", bipartiteGraph.isBipartite()); // Output: true
