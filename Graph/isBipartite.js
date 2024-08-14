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

    // Method to check if the graph is bipartite
    isBipartite() {
        const colors = {}; // Dictionary to store colors of vertices
        const queue = []; // Queue for BFS

        // Check all components of the graph
        // Check all components of the graph
        for (let vertex of Object.keys(this.adjacencyList)) {
            if (!(vertex in colors)) {
                // Start BFS for this component
                queue.push(vertex);
                colors[vertex] = 0; // Start coloring with 0

                while (queue.length > 0) {
                    const current = queue.shift();

                    // Traverse all adjacent vertices
                    for (const neighbor of this.adjacencyList[current]) {
                        if (!(neighbor in colors)) {
                            // Color the neighbor with the opposite color
                            colors[neighbor] = 1 - colors[current];
                            queue.push(neighbor);
                        } else if (colors[neighbor] === colors[current]) {
                            // If neighbor has the same color, not bipartite
                            return false;
                        }
                    }
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

/*

var isBipartite = function(graph) {
    const m = graph.length;
    const adjList = {};

    // Build adjacency list from graph
    for (let i = 0; i < m; i++) {
        adjList[i] = graph[i];
    }

    const colour = {};

    function bfs(start) {
        let queue = [start];
        colour[start] = 0; // Start coloring with 0

        while (queue.length > 0) {
            const currVertex = queue.shift();

            for (const neighbour of adjList[currVertex]) {
                if (!colour[neighbour]) {
                    // If not colored, color with opposite color
                    colour[neighbour] = 1 - colour[currVertex];
                    queue.push(neighbour);
                } else if (colour[neighbour] === colour[currVertex]) {
                    // If neighbor has the same color as the current vertex
                    return false;
                }
            }
        }
        return true;
    }

    for (let vertex in Object.keys(adjList)) {
        if (!colour[vertex]) { // If not yet colored
            if (!bfs(vertex)) {
                return false;
            }
        }
    }

    return true;
};
*/
