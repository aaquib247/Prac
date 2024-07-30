class DisjointSet {
    constructor(size) {
        // Initialize parent array where each node is its own parent
        this.parent = [];
        for (let i = 0; i < size; i++) {
            this.parent[i] = i;
        }

        // Initialize rank array to keep track of the tree depth
        this.rank = Array(size).fill(0);
    }

    // Find the root of the set containing 'x' with path compression
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }

    // Union the sets containing 'x' and 'y' using union by rank
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX !== rootY) {
            if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX] += 1; // Increase rank if both trees have the same rank
            }
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
ds.union(1, 2);
ds.union(2, 3);
ds.union(4, 5);

// Check if elements are connected
console.log(ds.connected(1, 3)); // Output: true (1 and 3 are in the same set)
console.log(ds.connected(1, 4)); // Output: false (1 and 4 are in different sets)

// Union more sets
ds.union(3, 4);

// Check again
console.log(ds.connected(1, 4)); // Output: true (1 and 4 are now in the same set)
