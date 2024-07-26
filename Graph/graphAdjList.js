class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    // Method to add a vertex to the graph
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    // Method to add an undirected edge between two vertices
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

    // Method to print the graph
    printGraph() {
        for (let vertex in this.adjacencyList) {
            console.log(`${vertex} -> ${this.adjacencyList[vertex].join(' ')}`);
        }
    }
}

// Example usage:
let graph = new Graph();

// Add vertices
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');

// Add edges
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'D');

// Print the graph
graph.printGraph();
