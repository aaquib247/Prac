/**
 * GRAPH VALID TREE
 * 
 * Problem: Given n nodes (0 to n-1) and edges, determine if they form a valid tree.
 * 
 * A valid tree must satisfy:
 * 1. Connected: All nodes are reachable from any node
 * 2. No cycles: No path leads back to itself
 * 3. Tree property: Exactly n-1 edges for n nodes
 * 
 * Example 1:
 * Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
 * Output: true
 * 
 * Example 2:
 * Input: n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]
 * Output: false (has cycle: 1-2-3-1)
 */

// ============================================
// APPROACH 1: BFS with Visited Set (RECOMMENDED)
// ============================================
// Most intuitive for interviews

function validTree(n, edges) {
    // Tree must have exactly n-1 edges ---> if cycle exists or disconnected, this fails
    // 1-2-3-1 has 3 edges for 3 nodes (cycle)
    if (edges.length !== n - 1) return false;
    
    // Build adjacency list
    const graph = Array(n).fill(0).map(() => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }
    
    // BFS to check if all nodes are connected
    const visited = new Set();
    const queue = [0];
    visited.add(0);
    
    while (queue.length > 0) {
        const node = queue.shift();
        
        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    
    // All nodes must be reachable (connected)
    return visited.size === n;
}

// Time: O(n + e) where e = edges.length
// Space: O(n + e) for graph and visited set


// ============================================
// APPROACH 2: DFS with Parent Tracking
// ============================================
// Detects cycles by tracking parent


// ============================================
// APPROACH 3: Union-Find (Disjoint Set Union)
// ============================================
// Best for multiple queries or online algorithms

class UnionFind {
    constructor(n) {
        this.parent = Array(n).fill(0).map((_, i) => i);
        this.rank = Array(n).fill(1);
        this.components = n;
    }
    
    find(x) {
        // Path compression
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
    
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        // Already in same set (cycle detected)
        if (rootX === rootY) return false;
        
        // Union by rank
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
        
        this.components--;
        return true;
    }
    
    isConnected() {
        return this.components === 1;
    }
}

function validTreeUnionFind(n, edges) {
    // Tree must have exactly n-1 edges
    if (edges.length !== n - 1) return false;
    
    const uf = new UnionFind(n);
    
    // Try to union all edges
    for (const [u, v] of edges) {
        // If union returns false, cycle detected
        if (!uf.union(u, v)) return false;
    }
    
    // Check if all nodes are in one component
    return uf.isConnected();
}

// Time: O(n + e × α(n)) ≈ O(n + e) where α is inverse Ackermann
// Space: O(n)


// ============================================
// TEST CASES
// ============================================

console.log("=== APPROACH 1: BFS ===");
console.log(validTree(5, [[0,1],[0,2],[0,3],[1,4]])); // true
console.log(validTree(5, [[0,1],[1,2],[2,3],[1,3],[1,4]])); // false
console.log(validTree(1, [])); // true
console.log(validTree(2, [[0,1]])); // true
console.log(validTree(2, [])); // false

console.log("\n=== APPROACH 2: DFS ===");
console.log(validTreeDFS(5, [[0,1],[0,2],[0,3],[1,4]])); // true
console.log(validTreeDFS(5, [[0,1],[1,2],[2,3],[1,3],[1,4]])); // false

console.log("\n=== APPROACH 3: Union-Find ===");
console.log(validTreeUnionFind(5, [[0,1],[0,2],[0,3],[1,4]])); // true
console.log(validTreeUnionFind(5, [[0,1],[1,2],[2,3],[1,3],[1,4]])); // false


// ============================================
// KEY INSIGHTS FOR GOOGLE INTERVIEWS
// ============================================

/*
1. TREE PROPERTIES (memorize these!):
   - n nodes → exactly n-1 edges
   - Connected (all reachable)
   - No cycles
   
2. WHICH APPROACH TO USE:
   - Interview (time pressure): BFS approach (most intuitive)
   - Follow-up optimizations: Mention Union-Find
   - If asked about cycles: DFS with parent tracking
   
3. EDGE CASES TO MENTION:
   - Empty graph (n=1, edges=[])
   - Disconnected graph (too few edges)
   - Cycle (too many edges or wrong structure)
   
4. COMPLEXITY ANALYSIS:
   - All approaches are O(n + e) time
   - Space: O(n + e) for graph representation
   
5. COMMON MISTAKES:
   ❌ Not checking n-1 edges first (saves time!)
   ❌ Using array instead of Set for visited (slower)
   ❌ Forgetting undirected graph means u-v AND v-u
   
6. OPTIMIZATION TIPS:
   - Early return: Check edges.length !== n-1 first
   - Use Set instead of array for O(1) lookup
   - In DFS, track parent to avoid false cycle detection
*/