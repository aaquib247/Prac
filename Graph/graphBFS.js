class GraphBFS {
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

    // Method to perform Breadth-First Search (BFS)
    bfs(startingNode) {
        const visited = {};
        const queue = [startingNode]; // Initialize the queue with the starting node
        const result = []; // To store the BFS traversal result
    
        visited[startingNode] = true; // Mark the starting node as visited
    
        while (queue.length > 0) { // Loop until the queue is empty
            const currentVertex = queue.shift(); // Dequeue the front vertex from the queue
            result.push(currentVertex); // Add the current vertex to the result array
    
            // Iterate over all adjacent vertices of the current vertex
            for (let neighbor of this.adjacencyList[currentVertex]) {
                if (!visited[neighbor]) { // If the neighbor has not been visited
                    visited[neighbor] = true; // Mark it as visited
                    queue.push(neighbor); // Enqueue the neighbor to the queue
                }
            }
        }
    
        return result; // Return the BFS traversal result
    }
    
}

// Example usage:
let graph1 = new GraphBFS();

// Add vertices
graph1.addVertex('A');
graph1.addVertex('B');
graph1.addVertex('C');
graph1.addVertex('D');
graph1.addVertex('E');

// Add edges for an undirected graph
graph1.addEdge('A', 'B');
graph1.addEdge('A', 'C');
graph1.addEdge('B', 'D');
graph1.addEdge('C', 'E');
graph1.addEdge('D', 'E');

// Perform BFS starting from vertex 'A'
console.log("BFS traversal starting from vertex 'A':", graph1.bfs('A')); // Output: ['A', 'B', 'C', 'D', 'E']
