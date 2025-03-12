//Also checks of the graph is connected or not.
//TC is Constant.

class DisjointSet {
    constructor(n) {
        // Initialize parent array where each node is its own parent
        this.parent = [];
        for (let i = 0; i < n; i++) {
            this.parent[i] = i;
        }

        // Initialize rank array to keep track of the tree depth
        this.size = Array(n).fill(1);
    }

    // Find the root of the set containing 'x' with path compression
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }

    // Union the sets containing 'x' and 'y' using union by rank
    unionBySize(x, y) {
        const u = this.find(x);
        const v = this.find(y);

        if (u === v) return;

        if (this.size[u] < this.size[v]) {
            this.parent[u] = v;
            this.size[v] += this.size[u]
        } else {
            this.parent[v] = u;
            this.size[u] += this.size[v]
        }
    }

    // Check if 'x' and 'y' are in the same set
    connected(x, y) {
        return this.find(x) === this.find(y);
    }
}

// Example usage:
const ds = new DisjointSet(10);

// Union some sets
ds.unionBySize(1, 2);
ds.unionBySize(2, 3);
ds.unionBySize(4, 5);

// Check if elements are connected
console.log(ds.connected(1, 3)); // Output: true (1 and 3 are in the same set)
console.log(ds.connected(1, 4)); // Output: false (1 and 4 are in different sets)

// Union more sets
ds.unionBySize(3, 4);

// Check again
console.log(ds.connected(1, 4)); // Output: true (1 and 4 are now in the same set)
