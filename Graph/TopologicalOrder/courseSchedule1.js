var canFinish = function (n, prerequisites) {
    if (n === 1) return true;
    const adjList = Array(n).fill(null).map(() => []);
    const inDegree = Array(n).fill(0);

    // Build graph and compute in-degrees
    for (const [dest, src] of prerequisites) {
        adjList[src].push(dest);
        inDegree[dest]++;
    }

    // Initialize the queue with nodes having zero in-degree
    const queue = [];
    for (let i = 0; i < n; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    const result = [];

    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);

        // Decrease the in-degree of the adjacent nodes
        for (const neighbor of adjList[node]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }

    // If the result contains all nodes, return the result
    if (result.length === n) {
        return true; 
        // return result;  - for courseScheduleII
    } else {
        // Cycle detected, return empty array
        return false;
        // return [] - for courseScheduleII
    }
}

console.log(canFinish(4,[[1,0],[0,1]]))
console.log(canFinish(4,[[1,0]]))