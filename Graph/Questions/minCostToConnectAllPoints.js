class DSU {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = Array(n).fill(0);
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x, y) {
        let px = this.find(x);
        let py = this.find(y);

        if (px === py) return false;

        if (this.rank[px] < this.rank[py]) {
            this.parent[px] = py;
        } else if (this.rank[px] > this.rank[py]) {
            this.parent[py] = px;
        } else {
            this.parent[py] = px;
            this.rank[px]++;
        }
        return true;
    }
}

var minCostConnectPoints = function(points) {
    const n = points.length;
    let edges = [];

    // Step 1: Build all edges
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const cost =
                Math.abs(points[i][0] - points[j][0]) +
                Math.abs(points[i][1] - points[j][1]);
            edges.push([cost, i, j]);
        }
    }  


    // Step 2: Sort edges by cost
    edges.sort((a, b) => a[0] - b[0]);

    // Step 3: DSU
    const dsu = new DSU(n);
    let totalCost = 0;
    let edgesUsed = 0;

    // Step 4: Kruskal
    for (let [cost, u, v] of edges) {
        if (dsu.union(u, v)) {
            totalCost += cost;
            edgesUsed++;
            if (edgesUsed === n - 1) break;
        }
    }

    return totalCost;
};

points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
console.log(minCostConnectPoints(points)); // Output: 20

//TC: O(E log E) where E is number of edges (here E = N*(N-1)/2)
//SC: O(N) for DSU structure