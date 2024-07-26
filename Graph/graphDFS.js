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
        if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) {
            return "Vertex not found in the graph";
        }

        this.adjacencyList[vertex1].push(vertex2);
        this.adjacencyList[vertex2].push(vertex1); // for undirected graph
    }

    dfs(startVertex) {
        const visited = {};
        const result = [];

        const dfsRecursive = (vertex) => {
            visited[vertex] = true;
            result.push(vertex);
            this.adjacencyList[vertex].forEach(neighbor => {
                if (neighbor !== null && !visited[neighbor]) {
                    dfsRecursive(neighbor);
                }
            });
        };

        dfsRecursive(startVertex);

        return result;
    }
}

// Example usage:
let graph = new Graph();

graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'E');

console.log(graph.dfs('A')); // Output: ['A', 'B', 'D', 'C', 'E']
