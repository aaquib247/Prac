class Graph {
    constructor(numVertices) {
        this.numVertices = numVertices;
        this.adjMatrix = [];
        
        // Initialize the adjacency matrix with all zeros
        for (let i = 0; i < numVertices; i++) {
            this.adjMatrix[i] = [];
            for (let j = 0; j < numVertices; j++) {
                this.adjMatrix[i][j] = 0;
            }
        }
    }

    // Method to add an edge between two vertices
    addEdge(vertex1, vertex2) {
        if (vertex1 >= 0 && vertex1 < this.numVertices && vertex2 >= 0 && vertex2 < this.numVertices) {
            // Assuming an undirected graph, so we set both cells to 1
            this.adjMatrix[vertex1][vertex2] = 1;
            this.adjMatrix[vertex2][vertex1] = 1;
        } else {
            return "Vertex index out of bounds";
        }
    }

    // Method to print the adjacency matrix
    printGraph() {
        for (let i = 0; i < this.numVertices; i++) {
            console.log(this.adjMatrix[i].join(' '));
        }
    }
}

// Example usage:
let graph = new Graph(4); // Create a graph with 4 vertices

// Add edges
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 2);
graph.addEdge(2, 3);

// Print the adjacency matrix
graph.printGraph();
