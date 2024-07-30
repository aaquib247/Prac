function shortestPathBFS(N, edges, src) {
    // Step 1: Create an adjacency list for the graph
    const adjList = Array(N).fill(null).map(() => []);
    edges.forEach(([u, v]) => {
        adjList[u].push(v);
        adjList[v].push(u); // Because it's an undirected graph
    });

    // Step 2: Initialize distances and BFS structures
    const dist = Array(N).fill(Infinity);
    const queue = [];
    const visited = new Set();

    // Start BFS from the source vertex
    dist[src] = 0;
    queue.push(src);
    visited.add(src);

    // Step 3: Perform BFS
    while (queue.length > 0) {
        const u = queue.shift();
        
        adjList[u].forEach(v => {
            if (!visited.has(v)) {
                visited.add(v);
                dist[v] = dist[u] + 1;
                queue.push(v);
            }
        });
    }

    // Convert Infinity distances to -1 (for unreachable nodes)
    return dist.map(d => d === Infinity ? -1 : d);
}

// Example usage
const N = 6; // Number of vertices
const edges = [[0, 1], [0, 4], [1, 2], [2, 3], [4, 5], [5, 3]];
const src = 0; // Source vertex

console.log(shortestPathBFS(N, edges, src)); // Output: [0, 1, 2, 3, 1, 2]
