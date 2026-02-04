// Disjoint Set (Union-Find) implementation
//From Edges , create adjList and pass it in a method. There you create edge in the form of [u,v,w].
//Sort the Edge by Weight and initialize the DSU.
//If the parents are not similar add wights and perform UinonBySize else dont as both the nodes are already present 
// and added in the mst by sorted weight order.
class DisjointSet {
    constructor(n) {
        this.parent = new Array(n + 1).fill(0).map((_, index) => index);
        this.size = new Array(n + 1).fill(1);
    }

    findUPar(node) {
        if (this.parent[node] === node) {
            return node;
        }
        return this.parent[node] = this.findUPar(this.parent[node]);
    }

    unionBySize(u, v) {
        const ulp_u = this.findUPar(u);
        const ulp_v = this.findUPar(v);

        if (ulp_u === ulp_v) return;

        if (this.size[ulp_u] < this.size[ulp_v]) {
            this.parent[ulp_u] = ulp_v;
            this.size[ulp_v] += this.size[ulp_u];
        } else {
            this.parent[ulp_v] = ulp_u;
            this.size[ulp_u] += this.size[ulp_v];
        }
    }
}

class Solution {
    static spanningTree(V, edges) {
        // Sort the edges based on weight
        edges.sort((a, b) => a[2] - b[2]);

        const ds = new DisjointSet(V);
        let mstWt = 0;

        // Kruskal's Algorithm
        for (let i = 0; i < edges.length; i++) {
            const [u, v, wt] = edges[i];

            if (ds.findUPar(u) !== ds.findUPar(v)) {
                mstWt += wt;  // Add edge weight to MST weight
                ds.unionBySize(u, v);  // Union the sets
            }
        }

        return mstWt;
    }
}


// Example usage
const V = 5;
const adj = new Array(V).fill().map(() => []);
const edges = [
    [0, 1, 2],
    [0, 2, 1],
    [1, 2, 1],
    [2, 3, 2],
    [3, 4, 1],
    [4, 2, 2]
];

const mstWt = Solution.spanningTree(V, edges);
console.log("The sum of all the edge weights: " + mstWt); 
