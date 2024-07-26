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

    // Method to add an undirected edge between two vertices with a weight
    addEdge(vertex1, vertex2, weight) {
        // Check if vertices exist
        if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) {
            return "Vertex not found in the graph";
        }

        // Add vertex2 to vertex1's adjacency list with the weight
        this.adjacencyList[vertex1].push({ node: vertex2, weight });
        
        // Add vertex1 to vertex2's adjacency list with the weight
        //undirected
        this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }

    // Method to print the graph
    printGraph() {
        const vertices = Object.keys(this.adjacencyList);

        for (let vertex of vertices) {
            let output = `${vertex} -> `;
            for (let neighbor of this.adjacencyList[vertex]) {
                output += `${neighbor.node} (${neighbor.weight}), `;
            }
            console.log(output.slice(0, -2)); // Remove the trailing comma and space
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

// Add weighted edges for an undirected graph
graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'C', 1);
graph.addEdge('C', 'D', 3);

// Print the graph
graph.printGraph();
