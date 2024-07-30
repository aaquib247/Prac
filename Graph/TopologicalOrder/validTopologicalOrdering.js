class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2) {
        // Check if vertices exist
        if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) {
            return "Vertex not found in the graph";
        }

        // Add vertex2 to vertex1's adjacency list
        this.adjacencyList[vertex1].push(vertex2);
    }

    isValidTopologicalSort(ordering) {
        const position = {}; // Map each vertex to its position in the ordering

        // Create a map of vertex positions
        for (let i = 0; i < ordering.length; i++) {
            position[ordering[i]] = i;
        }

        // Check all edges
        for (let vertex in this.adjacencyList) {
            for (const neighbor of this.adjacencyList[vertex]) {
                // Check if vertex appears before neighbor in the ordering
                if (position[vertex] > position[neighbor]) {
                    return false;
                }
            }
        }

        return true;
    }
}

// Example usage
const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');

graph.addEdge('A', 'B');
graph.addEdge('B', 'C');
graph.addEdge('C', 'D');

const ordering = ['A', 'B', 'C', 'D']; // A valid topological sort
console.log(graph.isValidTopologicalSort(ordering)); // Output: true

const invalidOrdering = ['A', 'C', 'B', 'D']; // An invalid topological sort
console.log(graph.isValidTopologicalSort(invalidOrdering)); // Output: false
