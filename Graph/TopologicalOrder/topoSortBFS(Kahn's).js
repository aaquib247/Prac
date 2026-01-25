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

    topologicalSortKahn() {
        const inDegree = {};
        const queue = [];
        const topoOrder = [];

        // Initialize in-degree of all vertices to 0
        for (let vertex in this.adjacencyList) {
            inDegree[vertex] = 0;
        }

        // Compute in-degrees
        for (let vertex in this.adjacencyList) {
            for (const neighbor of this.adjacencyList[vertex]) {
                inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
            }
        }

        // Enqueue vertices with in-degree of 0
        for (let vertex in this.adjacencyList) {
            if (inDegree[vertex] === 0) {
                queue.push(vertex);
            }
        }

        while (queue.length > 0) {
            const vertex = queue.shift();
            topoOrder.push(vertex);

            for (const neighbor of this.adjacencyList[vertex]) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] === 0) {
                    queue.push(neighbor);
                }
            }
        }

        // Check if topological sorting was successful (i.e., all vertices are included)
        if (topoOrder.length === Object.keys(this.adjacencyList).length) {
            return topoOrder;
        } else {
            return "Graph is not a DAG; topological sort not possible";
        }
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
// Uncomment the following line to test a case where topological sort is not possible due to a cycle
graph.addEdge('D', 'A');

console.log(graph.topologicalSortKahn()); // Output: ['A', 'B', 'C', 'D']
//TC: O(V + E)
//SC: O(V + E)