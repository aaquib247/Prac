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
        this.adjacencyList[vertex1].push(vertex2);
        this.adjacencyList[vertex2].push(vertex1);
    }

    hasCycle() {
        const vertices = Object.keys(this.adjacencyList);
        const visited = {};
        const parent = {};

        for (let vertex of vertices) {
            if (!visited[vertex]) {
                if (this.isCyclicBFS(vertex, visited, parent)) {
                    return true;
                }
            }
        }
        return false;
    }

    isCyclicBFS(startVertex, visited, parent) {
        const queue = [];
        queue.push(startVertex);
        visited[startVertex] = true;
        parent[startVertex] = null;

        while (queue.length > 0) {
            const currentVertex = queue.shift();

            for (let neighbor of this.adjacencyList[currentVertex]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                    parent[neighbor] = currentVertex;
                } else if (neighbor !== parent[currentVertex]) {
                    return true; // Cycle detected
                }
            }
        }

        return false;
    }
}

// Example usage:
let graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addEdge('A', 'B');
graph.addEdge('B', 'C');
graph.addEdge('C', 'D');
graph.addEdge('D', 'A');

console.log(graph.hasCycle()); // Output: true (Cycle exists)

let graph2 = new Graph();
graph2.addVertex('A');
graph2.addVertex('B');
graph2.addVertex('C');
graph2.addEdge('A', 'B');
graph2.addEdge('B', 'C');

console.log(graph2.hasCycle()); // Output: false (No cycle exists)
