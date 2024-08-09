function findProvincesDFS(isConnected) {
    const n = isConnected.length;
    const adjList = {}
  
    // Convert the adjacency matrix to an adjacency list
    for (let i = 0; i < n; i++) {
        adjList[i]=[];
        for (let j = 0; j < n; j++) {
            if (isConnected[i][j] === 1) {
                adjList[i].push(j);
            }
        }
    }
  
    const visited = new Array(n).fill(false);
    let provinceCount = 0;
  
    function dfs(start) {
        visited[start] = true;
        for (const neighbor of adjList[start]) {
            if (!visited[neighbor]) {
                dfs(neighbor);
            }
        }
    }
  
    for (let i of Object.keys(adjList)) {
        if (!visited[i]) {
            dfs(i);
            provinceCount++;
        }
    }
  
    return provinceCount;
}

// Example usage:
const isConnected1 = [[1,1,0],[1,1,0],[0,0,1]];
console.log(findProvincesDFS(isConnected1)); // Output: 2

const isConnected2 = [[1,0,0],[0,1,0],[0,0,1]];
console.log(findProvincesDFS(isConnected2)); // Output: 3



// function findCircleNum(isConnected) {
//     const n = isConnected.length;
//     const adjList = Array(n).fill(null).map(()=>[])
  
//     // Convert the adjacency matrix to an adjacency list
//     for (let i = 0; i < n; i++) {
//       for (let j = 0; j < n; j++) {
//         if (isConnected[i][j] === 1) {
//           adjList[i].push(j);
//         }
//       }
//     }

//     let provinceCount = 0;
//     const visited = new Array(n).fill(false);
  
//     for (let i = 0; i < n; i++) {
//       if (!visited[i]) {
//         bfs(i);
//         provinceCount++;
//       }
//     }

  
//     function bfs(start) {
//       const queue = [start];
//       visited[start] = true;
  
//       while (queue.length > 0) {
//         const node = queue.shift();
//         for (const neighbor of adjList[node]) {
//           if (!visited[neighbor]) {
//             visited[neighbor] = true;
//             queue.push(neighbor);
//           }
//         }
//       }
//     }
  
  
//     return provinceCount;
//   }
  
//   // Example usage:
//   const isConnected1 = [[1,1,0],[1,1,0],[0,0,1]];
//   console.log(findCircleNum(isConnected1)); // Output: 2
  
//   const isConnected2 = [[1,0,0],[0,1,0],[0,0,1]];
//   console.log(findCircleNum(isConnected2)); // Output: 3

  