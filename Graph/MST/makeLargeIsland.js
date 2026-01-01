/**
 * 827. MAKING A LARGE ISLAND - DSU APPROACH
 * 
 * PROBLEM: Grid with 1s (land) and 0s (water). 
 * Flip ONE 0 to 1. What's the largest island you can make?
 * 
 * SIMPLE STRATEGY:
 * 1. Use DSU to connect all existing islands
 * 2. For each water cell (0), see which islands it touches
 * 3. Calculate: 1 + sum of neighbor island sizes
 * 4. Return maximum
 */

// ============================================
// UNION-FIND CLASS (Simple Version)
// ============================================
class DSU {
    constructor(n) {
        // parent[i] = parent of node i
        this.parent = Array(n).fill(0).map((_, i) => i);
        
        // size[i] = size of component where i is root
        this.size = Array(n).fill(1);
    }
    
    // Find root with path compression
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }
    
    // Union by size
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX === rootY) return; // Already connected
        
        // Attach smaller tree under larger tree
        if (this.size[rootX] < this.size[rootY]) {
            this.parent[rootX] = rootY;
            this.size[rootY] += this.size[rootX];
        } else {
            this.parent[rootY] = rootX;
            this.size[rootX] += this.size[rootY];
        }
    }
}

// ============================================
// MAIN SOLUTION
// ============================================
function largestIsland(grid) {
    const n = grid.length;
    const dsu = new DSU(n * n);
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // right, down, left, up
    
    // ========================================
    // STEP 1: Connect all existing islands
    // ========================================
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            if (grid[row][col] === 1) {
                const currentIdx = row * n + col; // Convert 2D to 1D
                
                // Check all 4 neighbors
                for (const [dr, dc] of directions) {
                    const newRow = row + dr;
                    const newCol = col + dc;
                    
                    // Check if neighbor is valid and is land
                    if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n 
                        && grid[newRow][newCol] === 1) {
                        const neighborIdx = newRow * n + newCol;
                        dsu.union(currentIdx, neighborIdx);
                    }
                }
            }
        }
    }
    
    // ========================================
    // STEP 2: Try flipping each water cell
    // ========================================
    let maxSize = 0;
    
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            if (grid[row][col] === 0) {
                // Find unique neighboring islands (using their roots)
                const neighborRoots = new Set();
                
                for (const [dr, dc] of directions) {
                    const newRow = row + dr;
                    const newCol = col + dc;
                    
                    // Check if neighbor is valid and is land
                    if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n 
                        && grid[newRow][newCol] === 1) {
                        const neighborIdx = newRow * n + newCol;
                        neighborRoots.add(dsu.find(neighborIdx)); // Add root, not index!
                    }
                }
                
                // Calculate new island size if we flip this water cell
                let newSize = 1; // The flipped cell itself
                for (const root of neighborRoots) {
                    newSize += dsu.size[root]; // Add size of each unique island
                }
                
                maxSize = Math.max(maxSize, newSize);
            }
        }
    }
    
    // ========================================
    // STEP 3: Handle edge case (all land)
    // ========================================
    // If grid is already all 1s, no water to flip
    // Answer is the size of the largest existing island
    // Since we tried all water cells above, if maxSize is still 0,
    // it means there were no water cells (all land)
    // In that case, the answer is the entire grid size
    return maxSize === 0 ? n * n : maxSize;
}

// ============================================
// TEST CASES
// ============================================
console.log("=== Test Case 1 ===");
console.log("Grid: [[1,0],[0,1]]");
console.log("Expected: 3");
console.log("Result:", largestIsland([[1,0],[0,1]]));
console.log();

console.log("=== Test Case 2 ===");
console.log("Grid: [[1,1],[1,0]]");
console.log("Expected: 4");
console.log("Result:", largestIsland([[1,1],[1,0]]));
console.log();

console.log("=== Test Case 3 (All land) ===");
console.log("Grid: [[1,1],[1,1]]");
console.log("Expected: 4");
console.log("Result:", largestIsland([[1,1],[1,1]]));
console.log();

console.log("=== Test Case 4 (Larger grid) ===");
console.log("Grid: [[1,0,1],[0,0,0],[1,0,1]]");
console.log("Expected: 3");
console.log("Result:", largestIsland([[1,0,1],[0,0,0],[1,0,1]]));

// ============================================
// VISUAL WALKTHROUGH (Example 1)
// ============================================
/**
 * Grid: [[1,0],[0,1]]
 * 
 * INITIAL STATE:
 *   [1, 0]  (row 0)
 *   [0, 1]  (row 1)
 * 
 * Convert to indices:
 *   [0, 1]
 *   [2, 3]
 * 
 * ─────────────────────────────────────────
 * STEP 1: CONNECT EXISTING ISLANDS
 * ─────────────────────────────────────────
 * 
 * Cell (0,0) = 1:
 *   Index = 0
 *   Check neighbors: right(1), down(2), left(X), up(X)
 *   - right(1): grid[0][1] = 0 (water, skip)
 *   - down(2): grid[1][0] = 0 (water, skip)
 *   No unions performed
 * 
 * Cell (1,1) = 1:
 *   Index = 3
 *   Check neighbors: right(X), down(X), left(2), up(1)
 *   - left(2): grid[1][0] = 0 (water, skip)
 *   - up(1): grid[0][1] = 0 (water, skip)
 *   No unions performed
 * 
 * After Step 1:
 *   Component 0: size = 1 (just cell 0)
 *   Component 3: size = 1 (just cell 3)
 * 
 * ─────────────────────────────────────────
 * STEP 2: TRY FLIPPING EACH WATER CELL
 * ─────────────────────────────────────────
 * 
 * Cell (0,1) = 0 [water]:
 *   Index = 1
 *   Check neighbors: right(X), down(3), left(0), up(X)
 *   
 *   - left(0): grid[0][0] = 1 ✓
 *     root = find(0) = 0
 *     neighborRoots.add(0)
 *   
 *   - down(3): grid[1][1] = 1 ✓
 *     root = find(3) = 3
 *     neighborRoots.add(3)
 *   
 *   neighborRoots = {0, 3}
 *   
 *   newSize = 1 (flipped cell)
 *           + size[0] (component 0)
 *           + size[3] (component 3)
 *           = 1 + 1 + 1 = 3
 *   
 *   maxSize = max(0, 3) = 3
 * 
 * Cell (1,0) = 0 [water]:
 *   Index = 2
 *   Check neighbors: right(3), down(X), left(X), up(0)
 *   
 *   neighborRoots = {0, 3}
 *   newSize = 1 + 1 + 1 = 3
 *   maxSize = max(3, 3) = 3
 * 
 * ─────────────────────────────────────────
 * STEP 3: CHECK EXISTING ISLANDS
 * ─────────────────────────────────────────
 * Check all cells: getSize(0)=1, getSize(1)=1, etc.
 * maxSize = max(3, 1) = 3
 * 
 * FINAL ANSWER: 3 ✓
 */

// ============================================
// KEY POINTS FOR GOOGLE INTERVIEW
// ============================================
/**
 * 1. WHY USE SET FOR neighborRoots?
 *    Same island might be adjacent from multiple directions!
 *    
 *    Example:  [1, 1]
 *              [0, 1]
 *    
 *    Water at (1,0) touches island from UP and RIGHT
 *    Both belong to same component!
 *    Set prevents counting same island twice ✓
 * 
 * 2. WHY getIndex(row, col) = row * n + col?
 *    Converts 2D position to 1D array index
 *    
 *    For n=2:
 *    (0,0) → 0*2 + 0 = 0
 *    (0,1) → 0*2 + 1 = 1
 *    (1,0) → 1*2 + 0 = 2
 *    (1,1) → 1*2 + 1 = 3
 * 
 * 3. WHY CHECK IF maxSize === 0?
 *    Edge case: Grid is all 1s (no water to flip)
 *    - If no water cells exist, we never enter Step 2 loop
 *    - maxSize stays 0
 *    - In this case, answer is entire grid: n × n
 *    - Much faster than looping through all cells!
 * 
 * 4. TIME COMPLEXITY:
 *    - Connect islands: O(n² × α(n)) ≈ O(n²)
 *    - Try flipping: O(n²)
 *    - Total: O(n²)
 * 
 * 5. SPACE COMPLEXITY:
 *    - DSU arrays: O(n²)
 *    - Total: O(n²)
 * 
 * 6. HOW TO EXPLAIN IN INTERVIEW:
 *    "I'll use Union-Find to efficiently track island components.
 *     First, I'll connect all existing land cells.
 *     Then, for each water cell, I'll check which unique islands
 *     surround it and calculate the resulting size if flipped.
 *     The Set ensures I don't count the same island twice."
 */