class Graph {
    constructor(graphData) {
        this.adjacencyList = {};
        this.initializeGraph(graphData);
    }

    initializeGraph(graphData) {
        for (let i = 0; i < graphData.length; i++) {
            this.adjacencyList[i] = graphData[i];
        }
    }

    getSafeNodes() {
        const visited = new Set(); // To track fully processed nodes
        const recStack = new Set(); // To track nodes in the current DFS path
        const unsafeNodes = new Set(); // Nodes that are part of a cycle
        const terminalNodes = new Set(); // Terminal nodes
        const safeNodes = new Set(); // Safe nodes

        // Identify terminal nodes (nodes with no outgoing edges)
        for (let vertex in this.adjacencyList) {
            if (this.adjacencyList[vertex].length === 0) {
                terminalNodes.add(Number(vertex));
            }
        }

        // Detect cycles and unsafe nodes
        for (let vertex in this.adjacencyList) {
            if (!visited.has(Number(vertex))) {
                this._detectCycle(Number(vertex), visited, recStack, unsafeNodes);
            }
        }

        // Determine safe nodes
        for (let vertex in this.adjacencyList) {
            if (!unsafeNodes.has(Number(vertex))) {
                safeNodes.add(Number(vertex));
            }
        }

        // Convert to sorted array
        return Array.from(safeNodes).sort((a, b) => a - b);
    }

    _detectCycle(vertex, visited, recStack, unsafeNodes) {
        visited.add(vertex);
        recStack.add(vertex);

        for (const neighbor of this.adjacencyList[vertex]) {
            if (!visited.has(neighbor)) {
                if (this._detectCycle(neighbor, visited, recStack, unsafeNodes)) {
                    unsafeNodes.add(neighbor); // Add neighbor to unsafe nodes
                    unsafeNodes.add(vertex); // Add current node to unsafe nodes
                    return true;
                }
            } else if (recStack.has(neighbor)) {
                // Cycle detected; add all nodes in the cycle to unsafeNodes
                unsafeNodes.add(neighbor);
                unsafeNodes.add(vertex);
                return true;
            }
        }

        recStack.delete(vertex); // Remove from recursion stack before backtracking
        return false;
    }
}

// Example usage
const graphData1 = [[1, 2], [2, 3], [5], [0], [5], [], []];
const graph1 = new Graph(graphData1);
console.log(graph1.getSafeNodes()); // Output: [2, 4, 5, 6]

const graphData2 = [[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []];
const graph2 = new Graph(graphData2);
console.log(graph2.getSafeNodes()); // Output: [4]
