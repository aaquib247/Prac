class DisjointSet {
    constructor(n) {
        // Initialize parent array where each node is its own parent
        this.parent = [];
        for (let i = 0; i < n; i++) {
            this.parent[i] = i;
        }

        // Initialize size array to keep track of the tree size
        this.size = Array(n).fill(1);
    }

    // Find the root of the set containing 'x' with path compression
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }

    // Union the sets containing 'x' and 'y' using union by size
    unionBySize(x, y) {
        const u = this.find(x);
        const v = this.find(y);

        if (u === v) return;

        if (this.size[u] < this.size[v]) {
            this.parent[u] = v;
            this.size[v] += this.size[u];
        } else {
            this.parent[v] = u;
            this.size[u] += this.size[v];
        }
    }

    // Check if 'x' and 'y' are in the same set
    connected(x, y) {
        return this.find(x) === this.find(y);
    }
}

// Function to find the number of provinces (connected components)
function findNumberOfProvinces(isConnected) {
    const n = isConnected.length;
    const ds = new DisjointSet(n);

    // Process the matrix and union the cities that are connected
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (isConnected[i][j] === 1) {
                ds.unionBySize(i, j);
            }
        }
    }

    // Count the number of disjoint sets (provinces)
    let provinces = 0;
    for (let i = 0; i < n; i++) {
        if (ds.find(i) === i) {
            provinces++;
        }
    }

    return provinces;
}

// Example usage:
const isConnected = [
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 1, 1, 1],
    [0, 0, 0, 1, 1]
];

console.log(findNumberOfProvinces(isConnected));  // Output: 2
