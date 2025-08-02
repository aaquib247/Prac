//DSU
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

// Main solution class
class Solution {
    static findWay(V, edges) {
        let count = 0;
        let extraEdge = 0;

        const ds = new DisjointSet(V);

        for (let i = 0; i < edges.length; i++) {
            const [u, v] = edges[i];
            if (ds.findUPar(u) === ds.findUPar(v))
                extraEdge++;
            else
                ds.unionBySize(u, v);
        }

        for (let i = 0; i < V; i++) {
            if (ds.parent[i] === i)
                count++;
        }

        if (extraEdge >= count - 1) {
            console.log("no of extra edges: " + extraEdge + ", no of components: " + count);
            return count - 1;
        }
        else
            return -1;
    }
}

// Example usage
const V = 8;
const edges = [[0, 1], [0, 2], [0, 3], [1, 2], [2, 3], [4, 5], [5, 6], [7, 8]];

const ways = Solution.findWay(V, edges);
console.log("No of Ways to make a Network Connected with existing extra edges: " + ways);