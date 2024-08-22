var cheapestFlights = function(n, flights, src, dst, K) {
    // Create adjacency list
    const adj = Array.from({ length: n }, () => []);
    for (const [from, to, cost] of flights) {
        adj[from].push([to, cost]);
    }

    // Create a queue for BFS. Each element will be [node, stops, cost]
    const queue = [[src, 0, 0]];

    // Distance array to store the minimum cost to reach each node
    const dist = Array(n).fill(Infinity);
    dist[src] = 0;

    while (queue.length > 0) {
        const [node, stops, cost] = queue.shift();

        // If we exceed the number of stops, continue
        if (stops > K) continue;

        // Traverse all adjacent nodes
        for (const [neighbor, weight] of adj[node]) {
            const newCost = cost + weight;
            // Update the cost and add to queue if a cheaper route is found
            if (newCost < dist[neighbor] && stops <= K) {
                dist[neighbor] = newCost;
                queue.push([neighbor, stops + 1, newCost]);
            }
        }
    }

    // Return the minimum cost to reach the destination, or -1 if unreachable
    return dist[dst] === Infinity ? -1 : dist[dst];
};

// Test case
const n = 4;
const src = 0;
const dst = 3;
const K = 1;
const flights = [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]];

console.log(cheapestFlights(n, flights, src, dst, K)); // Output: 700
