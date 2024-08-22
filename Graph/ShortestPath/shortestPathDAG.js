function shortestPath(N, M, edges) {
    const inDegree = Array(N).fill(0);
    const adjList = Array(N).fill(null).map(() => []);
    
    // Build the adjacency list and in-degree array
    edges.forEach(([u, v, w]) => {
        adjList[u].push([v, w]);
        inDegree[v]++;
    });
    // Helper function to perform topological sort
    function topologicalSort() {

        const queue = [];
        const topoOrder = [];
        
        // Initialize queue with vertices having zero in-degree
        for (let i = 0; i < N; i++) {
            if (inDegree[i] === 0) {
                queue.push(i);
            }
        }
        
        // Process the queue
        while (queue.length > 0) {
            const u = queue.shift();
            topoOrder.push(u);
            
            adjList[u].forEach(([v, w]) => {
                inDegree[v]--;
                if (inDegree[v] === 0) {
                    queue.push(v);
                }
            });
        }
        
        return topoOrder;
    }
    
    // Get topological order
    const topoOrder = topologicalSort();
    
    // Initialize distances from source (vertex 0) to all other vertices
    const dist = Array(N).fill(Infinity);
    dist[0] = 0;
    
    // Relax edges in topological order
    topoOrder.forEach(u => {
        if (dist[u] !== Infinity) {
            adjList[u].forEach(([v, w]) => {
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                }
            });
        }
    });
    
    // Convert distances to the required output format
    return dist.map(d => (d === Infinity ? -1 : d));
}

// Example usage
console.log(shortestPath(4, 2, [[0, 1, 2], [0, 2, 1]])); // Output: [0, 2, 1, -1]
console.log(shortestPath(6, 7, [[0, 1, 2], [0, 4, 1], [4, 5, 4], [4, 2, 2], [1, 2, 3], [2, 3, 6], [5, 3, 1]])); // Output: [0, 2, 3, 6, 1, 5]
