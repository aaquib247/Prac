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
        this.adjacencyList[vertex2].push(vertex1); // Since the graph is undirected
    }

    hasCycle() {
        const visited = {};
        const parent = {}; // To keep track of the parent node in the DFS tree

        for (let vertex of Object.keys(this.adjacencyList)) {
            if (!visited[vertex]) {
                if (this.isCyclicDFS(vertex, visited, parent)) {
                    return true;
                }
            }
        }
        return false;
    }

    isCyclicDFS(vertex, visited, parent) {
        visited[vertex] = true;

        for (let neighbor of this.adjacencyList[vertex]) {
            if (!visited[neighbor]) {
                parent[neighbor] = vertex;
                if (this.isCyclicDFS(neighbor, visited, parent)) {
                    return true;
                }
            } else if (neighbor !== parent[vertex]) {
                return true; // A cycle is detected
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
