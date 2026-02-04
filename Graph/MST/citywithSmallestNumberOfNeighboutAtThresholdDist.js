var findTheCity = function (n, edges, distanceThreshold) {

    let dist = Array.from({ length: n }, () => new Array(n).fill(Infinity));
    for (let i = 0; i < n; i++) {
        dist[i][i] = 0
    }

    for (const[u, v, w] of edges) {
        dist[u][v] = w;
        dist[v][u] = w;
    }

    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j])
            }
        }
    }

    let city = 0;
    let min = Infinity;

    for (let i = 0; i < n; i++) {
        let count = 0;
        for (let j = 0; j < n; j++) {
            if (i !== j && dist[i][j] <= distanceThreshold) {
                count++;
            }
        }
        if (count <= min) {
            min = count;
            city = i;
        }
    }

    return city;

};
//TC: O(n^3)
//SC: O(n^2)
console.log(findTheCity(4, [[0, 1, 3], [1, 2, 1], [1, 3, 4], [2, 3, 1]], 4)); //3
console.log(findTheCity(5, [[0, 1, 2], [0, 4, 8], [1, 2, 3], [1, 4, 2], [2, 3, 1], [3, 4, 1]], 2)); //0