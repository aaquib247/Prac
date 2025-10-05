//https://leetcode.com/problems/min-cost-to-connect-all-points/description/

function minCostConnectPoints(points) {
    const n = points.length;

    // Union Find (Disjoint Set)
    const parent = Array.from({ length: n }, (_, i) => i);

    function find(x) {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]); // Path compression
        }
        return parent[x];
    }

    function union(x, y) {
        const rootX = find(x);
        const rootY = find(y);
        if (rootX === rootY) return false;
        parent[rootY] = rootX; // Union
        return true;
    }

    // Generate all possible edges
    const edges = [];
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const dist = Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
            edges.push([dist, i, j]);
        }
    }

    // Sort edges by cost
    edges.sort((a, b) => a[0] - b[0]);

    let totalCost = 0;
    let edgesUsed = 0;

    // for (let [cost, u, v] of edges) {
    //     if (union(u, v)) {
    //         totalCost += cost;
    //         edgesUsed++;
    //         if (edgesUsed === n - 1) break; // MST complete
    //     }
    // }
        for (let [cost, u, v] of edges) {
        if (parent[u] != parent[v]) {
            totalCost += cost;
            union(u,v)
            edgesUsed++;
            if (edgesUsed === n - 1) break; // MST complete
        }
    }

    return totalCost;
}

const points = [[0,0],[2,2],[3,10],[5,2],[7,0]];
console.log(minCostConnectPoints(points));  // Output: 20
