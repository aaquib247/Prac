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

    topologicalSortDFS() {
        const visited = {}; // Object to track visited nodes
        const stack = [];

        const dfs = (vertex) => {
            if (visited[vertex]) return; // Skip already visited nodes

            visited[vertex] = true; // Mark the node as visited

            for (const neighbor of this.adjacencyList[vertex]) {
                if (!visited[neighbor]) {
                    dfs(neighbor);
                }
            }

            stack.push(vertex); // Push node onto stack after visiting all its neighbors
        };

        // Perform DFS from all unvisited vertices
        for (let vertex in this.adjacencyList) {
            if (!visited[vertex]) {
                dfs(vertex);
            }
        }

        return stack.reverse(); // Return reversed stack to get the topological order
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
// graph.addEdge('D', 'B');

console.log(graph.topologicalSortDFS()); // Output: ['A', 'B', 'C', 'D']
