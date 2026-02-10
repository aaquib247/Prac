var shortestAlternatingPaths = function(n, redEdges, blueEdges) {
    // Build graphs
    const redGraph = Array.from({length: n}, () => []);
    const blueGraph = Array.from({length: n}, () => []);
    
    for (let [u, v] of redEdges) {
        redGraph[u].push(v);
    }
    for (let [u, v] of blueEdges) {
        blueGraph[u].push(v);
    }
    
    // Queue: [node, last_color, steps]
    // Color: 0=red, 1=blue
    const queue = [[0, 0, 0], [0, 1, 0]];  // Start with both colors
    const visited = {};
    visited['0,0'] = true;
    visited['0,1'] = true;
    
    const answer = Array(n).fill(-1);
    
    while (queue.length > 0) {
        const [node, lastColor, steps] = queue.shift();
        
        // Record first time reaching this node
        if (answer[node] === -1) {
            answer[node] = steps;
        }
        
        // Next edge must be opposite color
        if (lastColor === 0) {  // Last was red, next must be blue
            for (let neighbor of blueGraph[node]) {
                const key = `${neighbor},1`;
                if (!visited[key]) {
                    visited[key] = true;
                    queue.push([neighbor, 1, steps + 1]);
                }
            }
        } else {  // Last was blue, next must be red
            for (let neighbor of redGraph[node]) {
                const key = `${neighbor},0`;
                if (!visited[key]) {
                    visited[key] = true;
                    queue.push([neighbor, 0, steps + 1]);
                }
            }
        }
    }
    
    return answer;
};

console.log(shortestAlternatingPaths(3, [[0,1],[1,2]], [])); // [0,1,-1]
console.log(shortestAlternatingPaths(3, [[0,1]], [[2,1]])); // [0,1,-1]