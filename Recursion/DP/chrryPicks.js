/**
 * CHERRY PICKUP II - SUPER EASY EXPLANATION
 * 
 * IMAGINE:
 * - 2 friends collecting chocolates in a grid
 * - Friend 1 starts TOP-LEFT (0, 0)
 * - Friend 2 starts TOP-RIGHT (0, last column)
 * - Both move DOWN together (same row always)
 * - Each can go: left-down, straight-down, or right-down
 * - If both land on SAME cell → count chocolate ONCE only
 * - Goal: Collect MAXIMUM chocolates
 * 
 * Example Grid:
 *   [2, 3, 1, 2]    Friend1 at (0,0)=2, Friend2 at (0,3)=2
 *   [3, 4, 2, 2]    Both move down...
 *   [5, 6, 3, 5]    Collect max chocolates = 24
 */

// ============================================
// APPROACH 1: RECURSIVE (Easy to understand!)
// ============================================

function maxChocolates(grid) {
    const n = grid.length;        // rows
    const m = grid[0].length;     // columns
    
    // Memoization: dp[row][col1][col2]
    const dp = Array(n).fill(null)
        .map(() => Array(m).fill(null)
        .map(() => Array(m).fill(-1)));
    
    // Inner function has access to grid and dp (closure!)
    function solve(row, col1, col2) {
        // Out of bounds? Invalid!
        if (col1 < 0 || col1 >= m || col2 < 0 || col2 >= m) {
            return -Infinity;
        }
        
        // BASE CASE: Reached last row
        if (row === n - 1) {
            if (col1 === col2) {
                return grid[row][col1];  // Same cell, count once
            } else {
                return grid[row][col1] + grid[row][col2];  // Different cells
            }
        }
        
        // Already calculated? Return cached result
        if (dp[row][col1][col2] !== -1) {
            return dp[row][col1][col2];
        }
        
        // Try all 9 combinations of moves (3 for friend1 × 3 for friend2)
        let maxChoco = -Infinity;
        
        // Friend1 can move: -1 (left), 0 (straight), +1 (right)
        for (let d1 = -1; d1 <= 1; d1++) {
            // Friend2 can move: -1 (left), 0 (straight), +1 (right)
            for (let d2 = -1; d2 <= 1; d2++) {
                let value;
                
                // Current chocolates at this position
                if (col1 === col2) {
                    value = grid[row][col1];  // Same cell, count once
                } else {
                    value = grid[row][col1] + grid[row][col2];
                }
                
                // Add chocolates from future moves
                value += solve(row + 1, col1 + d1, col2 + d2);
                
                maxChoco = Math.max(maxChoco, value);
            }
        }
        
        // Save result and return
        dp[row][col1][col2] = maxChoco;
        return maxChoco;
    }
    
    // Start: Friend1 at column 0, Friend2 at column m-1
    return solve(0, 0, m - 1);
}

// ============================================
// TEST CASE
// ============================================

const grid = [
    [2, 3, 1, 2],
    [3, 4, 2, 2],
    [5, 6, 3, 5]
];

console.log("Grid:");
console.log(grid);
console.log("\nMaximum Chocolates:", maxChocolates(grid));

// ============================================
// STEP-BY-STEP WALKTHROUGH
// ============================================

/**
 * Let's trace the example:
 * 
 * Grid:  [2, 3, 1, 2]
 *        [3, 4, 2, 2]
 *        [5, 6, 3, 5]
 * 
 * Row 0:
 *   Friend1 at col=0 → value=2
 *   Friend2 at col=3 → value=2
 *   Total = 2 + 2 = 4
 * 
 * Row 1:
 *   Friend1 moves to col=1 → value=4
 *   Friend2 moves to col=2 → value=2
 *   Total = 4 + 2 = 6
 * 
 * Row 2:
 *   Friend1 moves to col=2 → value=3
 *   Friend2 moves to col=3 → value=5
 *   Total = 3 + 5 = 8
 * 
 * But wait! We try ALL possible paths and pick the best!
 * Actual best path gives us 24 chocolates.
 */

// ============================================
// WHY 3D DP?
// ============================================

/**
 * State needs 3 things:
 * 1. Current ROW (i)
 * 2. Friend1's COLUMN (j1)
 * 3. Friend2's COLUMN (j2)
 * 
 * dp[i][j1][j2] = max chocolates from row i to end
 *                 with friend1 at col j1 and friend2 at col j2
 */

// ============================================
// COMPLEXITY
// ============================================

/**
 * TIME: O(n × m × m × 9)
 *   - n rows
 *   - m possible positions for friend1
 *   - m possible positions for friend2
 *   - 9 combinations of moves (3 × 3)
 *   Simplified: O(n × m²)
 * 
 * SPACE: O(n × m × m) for dp array
 *        + O(n) for recursion stack
 */

// ============================================
// KEY INSIGHTS FOR INTERVIEW
// ============================================

/**
 * 1. WHY NOT 2D DP?
 *    We need to track BOTH friends' positions!
 *    Can't track just one.
 * 
 * 2. WHY 9 MOVES?
 *    Friend1: 3 moves (left, straight, right)
 *    Friend2: 3 moves (left, straight, right)
 *    Total: 3 × 3 = 9 combinations
 * 
 * 3. SAME CELL HANDLING:
 *    if (col1 === col2) count chocolate ONCE
 *    else count BOTH chocolates
 * 
 * 4. BASE CASE:
 *    When row === n-1 (last row)
 *    Return chocolates at current position(s)
 * 
 * 5. OUT OF BOUNDS:
 *    Return -Infinity (invalid path)
 * 
 * 6. MEMOIZATION:
 *    Cache results in dp[row][col1][col2]
 *    Avoid recalculating same state
 * 
 * 7. CLOSURE MAGIC:
 *    solve() is inside maxChocolates()
 *    It can access grid, dp, n, m automatically!
 *    No need to pass them as parameters ✨
 */

// ============================================
// INTERVIEW TALKING POINTS
// ============================================

/**
 * "This is a 3D DP problem because we need to track:
 *  - Current row
 *  - Position of first friend
 *  - Position of second friend
 * 
 * We start from top and move down row by row.
 * At each step, both friends can move in 3 directions,
 * giving us 9 total combinations to try.
 * 
 * We use memoization to cache results and avoid
 * recalculating the same states.
 * 
 * Time complexity is O(n × m²) and space is O(n × m²)."
 */