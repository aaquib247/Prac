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
    detectCycle() {
        const visited = new Set(); // Set of nodes that have been fully processed
        const recStack = new Set(); // Set of nodes in the current path (recursion stack)

        for (let vertex in this.adjacencyList) {
            if (!visited.has(vertex)) {
                if (this._hasCycle(vertex, visited, recStack)) {
                    return true;
                }
            }
        }
        return false;
    }

    _hasCycle(v, visited, recStack) {
        visited.add(v);
        recStack.add(v);

        for (const neighbor of this.adjacencyList[v]) {
            if (!visited.has(neighbor)) {
                if (this._hasCycle(neighbor, visited, recStack)) {
                    return true;
                }
            } else if (recStack.has(neighbor)) {
                // If neighbor is in the recursion stack, a cycle is detected
                return true;
            }
        }

        recStack.delete(v); // Remove from recursion stack before backtracking
        return false;
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
graph.addEdge('D', 'B'); // Adding this edge creates a cycle

console.log(graph.detectCycle()); // Output: true

//Longets Cycle in Directed Graph
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

    getLongestCycleLength() {
        const visited = new Set(); // Set of nodes that have been fully processed
        const recStack = new Set(); // Set of nodes in the current path (recursion stack)
        let longestCycle = 0;

        // Iterate through all vertices in the graph
        for (let vertex in this.adjacencyList) {
            if (!visited.has(vertex)) {
                const cycleLength = this._detectCycleAndLength(vertex, visited, recStack, []);
                if (cycleLength > longestCycle) {
                    longestCycle = cycleLength;
                }
            }
        }

        // If we found a cycle, return its length, otherwise return 0
        return longestCycle === 0 ? -1 : longestCycle;
    }

    _detectCycleAndLength(v, visited, recStack, path) {
        visited.add(v);
        recStack.add(v);
        path.push(v); // Add current vertex to the path

        for (const neighbor of this.adjacencyList[v]) {
            if (!visited.has(neighbor)) {
                const cycleLength = this._detectCycleAndLength(neighbor, visited, recStack, path);
                if (cycleLength > 0) {
                    return cycleLength; // Return cycle length when cycle is found
                }
            } else if (recStack.has(neighbor)) {
                // Cycle detected: calculate its length
                const cycleStartIndex = path.indexOf(neighbor);
                const cycle = path.slice(cycleStartIndex);
                return cycle.length;
            }
        }

        recStack.delete(v); // Remove from recursion stack before backtracking
        path.pop(); // Remove current vertex from the path as we backtrack
        return 0; // No cycle detected from this vertex
    }
}
