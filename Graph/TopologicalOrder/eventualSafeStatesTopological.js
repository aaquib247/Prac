function eventualSafeNodes(graph) {
    const n = graph.length;
    // const reverseGraph = Array.from({ length: n }, () => []);
    const reverseGraph = Array(n).fill(null).map(()=>[]);
    const inDegree = Array(n).fill(0)

    // Step 1: Build the reverse graph and calculate out-degrees
    for (let u = 0; u < n; u++) {
        for (const v of graph[u]) {
            reverseGraph[v].push(u);
            inDegree[u]++
        }
    }

    const queue = [];
    const safe = []
   
    for(let i = 0; i < n; i++){
       if(inDegree[i] === 0)
         queue.push(i)
    }

    while(queue.length>0){
        let curr = queue.shift();
        safe.push(curr);

        for(let n of reverseGraph[curr]){
            inDegree[n]--;
            if(inDegree[n] === 0)
                queue.push(n)
        }
    }

    return safe.sort((a,b) => a-b);
    
}

// Example usage:
const graph1 = [[1,2],[2,3],[5],[0],[5],[],[]];
const graph2 = [[1,2,3,4],[1,2],[3,4],[0,4],[]];

console.log(eventualSafeNodes(graph1)); // Output: [2, 4, 5, 6]
console.log(eventualSafeNodes(graph2)); // Output: [4]
