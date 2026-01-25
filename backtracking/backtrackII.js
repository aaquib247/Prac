/**
 * COMPLETE BACKTRACKING PATTERNS GUIDE
 * All Remaining Problems with Universal Patterns
 * 
 * 🎯 THE MASTER PATTERN RECOGNITION GUIDE
 */

console.log("=".repeat(80));
console.log("COMPLETE BACKTRACKING PATTERNS - ALL REMAINING PROBLEMS");
console.log("=".repeat(80));

// ============================================
// PATTERN 1: SUBSETS/COMBINATIONS
// (You already know this!)
// ============================================

console.log("\n📦 PATTERN 1: SUBSETS/COMBINATIONS");
console.log("-".repeat(80));
console.log("Template: for loop starting from 'index', move to i+1");
console.log("Use for: Subsets, Combination Sum");
console.log("✅ YOU ALREADY HAVE THIS!\n");

// ============================================
// PATTERN 2: PERMUTATIONS (NEW!)
// ============================================

console.log("\n🔄 PATTERN 2: PERMUTATIONS (ORDER MATTERS!)");
console.log("-".repeat(80));
console.log("KEY DIFFERENCE: Can pick ANY unused element (not just forward)");
console.log("Template: for loop from 0, use 'used' array to track");
console.log();

// ──────────────────────────────────────────
// PROBLEM 7: PERMUTATIONS
// ──────────────────────────────────────────

console.log("📋 PROBLEM 7: PERMUTATIONS (46. Permutations)");
console.log("-".repeat(80));

function permute(nums) {
    const result = [];
    const used = Array(nums.length).fill(false);
    
    function backtrack(current) {
        // BASE: collected all elements
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }
        
        // EXPLORE: try EVERY element (not just forward!)
        for (let i = 0; i < nums.length; i++) {  // ← Start from 0, not index!
            if (used[i]) continue;  // ← Skip if already used
            
            // CHOOSE
            used[i] = true;
            current.push(nums[i]);
            
            // RECURSE (no index parameter!)
            backtrack(current);
            
            // UNCHOOSE
            current.pop();
            used[i] = false;
        }
    }
    
    backtrack([]);
    return result;
}

console.log("Input: [1, 2, 3]");
console.log("Output:", JSON.stringify(permute([1, 2, 3])));
//output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
//TC: O(n! * n) where n is length of nums (n! permutations, n to copy each)
console.log("\n💡 KEY INSIGHT:");
console.log("  - Start from i=0 (not index) → can pick ANY element");
console.log("  - Use 'used' array → track which elements already picked");
console.log("  - Generate n! results (not 2^n like subsets)");
console.log("  - [1,2,3] and [3,2,1] are DIFFERENT (order matters!)");

// ──────────────────────────────────────────
// PROBLEM 8: PERMUTATIONS II (with duplicates)
// ──────────────────────────────────────────

console.log("\n\n📋 PROBLEM 8: PERMUTATIONS II (47. Permutations II)");
console.log("-".repeat(80));

function permuteUnique(nums) {
    const result = [];
    const used = Array(nums.length).fill(false);
    nums.sort((a, b) => a - b);  // ← MUST SORT for duplicate handling
    
    function backtrack(current) {
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }
        
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            
            // ← SKIP DUPLICATES: if same as previous AND previous not used
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;
            
            used[i] = true;
            current.push(nums[i]);
            backtrack(current);
            current.pop();
            used[i] = false;
        }
    }
    
    backtrack([]);
    return result;
}

console.log("Input: [1, 1, 2]");
console.log("Output:", JSON.stringify(permuteUnique([1, 1, 2])));
//output: [[1,1,2],[1,2,1],[2,1,1]]
console.log("\n💡 KEY INSIGHT:");
console.log("  - Sort first (same as Subsets II)");
console.log("  - Skip if: same as previous AND previous not used");
console.log("  - Why check !used[i-1]? Ensures we take duplicates in order");

// ============================================
// PATTERN 3: STRING BUILDING
// ============================================

console.log("\n\n📝 PATTERN 3: STRING BUILDING");
console.log("-".repeat(80));
console.log("Template: Similar to permutations but with string concatenation");
console.log("Use for: Letter combinations, IP addresses, etc.");
console.log();

// ──────────────────────────────────────────
// PROBLEM 9: LETTER COMBINATIONS OF PHONE NUMBER
// ──────────────────────────────────────────

console.log("📋 PROBLEM 9: LETTER COMBINATIONS (17. Letter Combinations)");
console.log("-".repeat(80));

function letterCombinations(digits) {
    if (!digits) return [];
    
    const result = [];
    const map = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };
    
    function backtrack(index, current) {
        // BASE: processed all digits
        if (index === digits.length) {
            result.push(current);
            return;
        }
        
        // EXPLORE: try each letter for current digit
        const letters = map[digits[index]];
        for (let i = 0; i < letters.length; i++) {
            // CHOOSE: add letter
            // RECURSE: move to next digit
            backtrack(index + 1, current + letters[i]);
            // UNCHOOSE: automatic (string immutable, no need to pop)
        }
    }
    
    backtrack(0, '');
    return result;
}

console.log("Input: '23'");
console.log("Output:", JSON.stringify(letterCombinations('23')));
//Time Complexity: O(4^n * n) where n is length of digits (max 4 letters per digit)
console.log("\n💡 KEY INSIGHT:");
console.log("  - Each digit has multiple choices (letters)");
console.log("  - String concatenation (no need to pop)");
console.log("  - Fixed depth recursion (length of digits)");

// ============================================
// PATTERN 4: 2D GRID BACKTRACKING
// ============================================

console.log("\n\n🗺️  PATTERN 4: 2D GRID BACKTRACKING");
console.log("-".repeat(80));
console.log("Template: DFS on grid with 4 directions, visited tracking");
console.log("Use for: Word search, path finding, etc.");
console.log();

// ──────────────────────────────────────────
// PROBLEM 10: WORD SEARCH
// ──────────────────────────────────────────

console.log("📋 PROBLEM 10: WORD SEARCH (79. Word Search)");
console.log("-".repeat(80));

function exist(board, word) {
    const rows = board.length;
    const cols = board[0].length;
    const directions = [[0,1], [1,0], [0,-1], [-1,0]]; // right, down, left, up
    
    function backtrack(row, col, index) {
        // BASE: found all characters
        if (index === word.length) return true;
        
        // BOUNDARY CHECK
        if (row < 0 || row >= rows || col < 0 || col >= cols) return false;
        
        // CHECK: current cell matches current character
        if (board[row][col] !== word[index]) return false;
        
        // MARK AS VISITED (use temporary marker)
        const temp = board[row][col];
        board[row][col] = '#';  // ← Mark visited
        
        // EXPLORE: try all 4 directions
        for (const [dr, dc] of directions) {
            if (backtrack(row + dr, col + dc, index + 1)) {
                board[row][col] = temp;  // ← Restore before returning
                return true;
            }
        }
        
        // BACKTRACK: restore cell
        board[row][col] = temp;
        return false;
    }
    
    // Try starting from each cell
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (backtrack(r, c, 0)) return true;
        }
    }
    
    return false;
}

console.log("Input: board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = 'ABCCED'");
console.log("Output:", exist([['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], 'ABCCED'));
console.log("\n💡 KEY INSIGHT:");
console.log("  - Mark visited with temporary marker (board[r][c] = '#')");
console.log("  - Always restore after exploring (backtrack)");
console.log("  - Try 4 directions from each cell");
console.log("  - Start search from EVERY cell in grid");

// ============================================
// PATTERN 5: CONSTRAINT-BASED BACKTRACKING
// ============================================

console.log("\n\n⚖️  PATTERN 5: CONSTRAINT-BASED BACKTRACKING");
console.log("-".repeat(80));
console.log("Template: Track constraints (open/close counts, sums, etc.)");
console.log("Use for: Generate Parentheses, Valid expressions, etc.");
console.log();

// ──────────────────────────────────────────
// PROBLEM 11: GENERATE PARENTHESES
// ──────────────────────────────────────────

console.log("📋 PROBLEM 11: GENERATE PARENTHESES (22. Generate Parentheses)");
console.log("-".repeat(80));

function generateParenthesis(n) {
    const result = [];
    
    function backtrack(current, open, close) {
        // BASE: used all parentheses
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }
        
        // CHOICE 1: Add '(' if we haven't used all
        if (open < n) {
            backtrack(current + '(', open + 1, close);
        }
        
        // CHOICE 2: Add ')' if it doesn't exceed '('
        if (close < open) {
            backtrack(current + ')', open, close + 1);
        }
    }
    
    backtrack('', 0, 0);
    return result;
}

console.log("Input: n = 3");
console.log("Output:", JSON.stringify(generateParenthesis(3)));
//output: ["((()))","(()())","(())()","()(())","()()()"]
console.log("\n💡 KEY INSIGHT:");
console.log("  - Track open and close counts");
console.log("  - Can add '(' if open < n");
console.log("  - Can add ')' if close < open (maintain validity)");
console.log("  - Prunes invalid branches automatically");

// ============================================
// PATTERN 6: PARTITION PROBLEMS
// ============================================

console.log("\n\n✂️  PATTERN 6: PARTITION PROBLEMS");
console.log("-".repeat(80));
console.log("Template: Try all cut points, validate each partition");
console.log("Use for: Palindrome partitioning, word break, etc.");
console.log();

// ──────────────────────────────────────────
// PROBLEM 12: PALINDROME PARTITIONING
// ──────────────────────────────────────────

console.log("📋 PROBLEM 12: PALINDROME PARTITIONING (131. Palindrome Partitioning)");
console.log("-".repeat(80));

function partition(s) {
    const result = [];
    
    function isPalindrome(str, left, right) {
        while (left < right) {
            if (str[left] !== str[right]) return false;
            left++;
            right--;
        }
        return true;
    }
    
    function backtrack(start, current) {
        // BASE: reached end of string
        if (start === s.length) {
            result.push([...current]);
            return;
        }
        
        // EXPLORE: try all possible cut points
        for (let end = start; end < s.length; end++) {
            // CHECK: if substring is palindrome
            if (isPalindrome(s, start, end)) {
                // CHOOSE: add this palindrome
                current.push(s.substring(start, end + 1));
                
                // RECURSE: continue from next position
                backtrack(end + 1, current);
                
                // UNCHOOSE
                current.pop();
            }
        }
    }
    
    backtrack(0, []);
    return result;
}

console.log("Input: 'aab'");
console.log("Output:", JSON.stringify(partition('aab')));
console.log("\n💡 KEY INSIGHT:");
console.log("  - Try cutting at every position");
console.log("  - Only proceed if substring is valid (palindrome)");
console.log("  - Similar to word break pattern");

// ============================================
// PATTERN 7: N-ARY BACKTRACKING (BONUS)
// ============================================

console.log("\n\n👑 PATTERN 7: N-ARY BACKTRACKING (BONUS - Hard)");
console.log("-".repeat(80));
console.log("Template: Multiple constraint checks at each step");
console.log("Use for: N-Queens, Sudoku, etc.");
console.log();

// ──────────────────────────────────────────
// PROBLEM 13: N-QUEENS
// ──────────────────────────────────────────

console.log("📋 PROBLEM 13: N-QUEENS (51. N-Queens)");
console.log("-".repeat(80));

function solveNQueens(n) {
    const result = [];
    const board = Array(n).fill(null).map(() => Array(n).fill('.'));
    const cols = new Set();
    const diag1 = new Set();  // row - col
    const diag2 = new Set();  // row + col
    
    function backtrack(row) {
        // BASE: placed all queens
        if (row === n) {
            result.push(board.map(r => r.join('')));
            return;
        }
        
        // EXPLORE: try placing queen in each column
        for (let col = 0; col < n; col++) {
            // CHECK: all constraints
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                continue;
            }
            
            // CHOOSE
            board[row][col] = 'Q';
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);
            
            // RECURSE
            backtrack(row + 1);
            
            // UNCHOOSE
            board[row][col] = '.';
            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }
    }
    
    backtrack(0);
    return result;
}

console.log("Input: n = 4");
console.log("Output:", JSON.stringify(solveNQueens(4)));
//output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
//Tc - O(n!)
console.log("\n💡 KEY INSIGHT:");
console.log("  - Check 3 constraints: column, diagonal1 (row-col), diagonal2 (row+col)");
console.log("  - Use Sets for O(1) constraint checking");
console.log("  - Place one queen per row, try all columns");

// ============================================
// THE ULTIMATE PATTERN SUMMARY
// ============================================

console.log("\n\n" + "=".repeat(80));
console.log("🎯 THE ULTIMATE PATTERN RECOGNITION GUIDE");
console.log("=".repeat(80));

console.log(`
┌────────────────────────────────────────────────────────────────────────────┐
│                        PATTERN DECISION TREE                               │
└────────────────────────────────────────────────────────────────────────────┘

QUESTION: What type of problem is this?

1️⃣  "All subsets/combinations of array" → PATTERN 1: SUBSETS
    Template: for (i = index; i < n; i++) + backtrack(i+1, ...)
    Examples: Subsets, Combination Sum
    ✅ YOU ALREADY KNOW THIS!

2️⃣  "All arrangements/permutations" → PATTERN 2: PERMUTATIONS
    Template: for (i = 0; i < n; i++) + used array + backtrack(...)
    Examples: Permutations, Permutations II
    ⭐ NEW - MUST LEARN!

3️⃣  "Build string/phone number digits" → PATTERN 3: STRING BUILDING
    Template: Similar to permutations but with string
    Examples: Letter Combinations
    🆕 EASY VARIANT!

4️⃣  "Search in 2D grid/matrix" → PATTERN 4: 2D GRID
    Template: DFS + 4 directions + visited tracking
    Examples: Word Search, Path Finding
    🗺️  IMPORTANT FOR GOOGLE!

5️⃣  "Generate valid expressions with rules" → PATTERN 5: CONSTRAINTS
    Template: Track constraints (counts, sums) + pruning
    Examples: Generate Parentheses, Valid Expressions
    ⚖️  TESTS PRUNING SKILLS!

6️⃣  "Partition/split into valid parts" → PATTERN 6: PARTITION
    Template: Try all cut points + validate each part
    Examples: Palindrome Partitioning, Word Break
    ✂️  COMMON VARIANT!

7️⃣  "Place items with multiple constraints" → PATTERN 7: N-ARY
    Template: Check multiple constraints at each step
    Examples: N-Queens, Sudoku
    👑 HARD - BONUS!

┌────────────────────────────────────────────────────────────────────────────┐
│                     QUICK REFERENCE TABLE                                  │
└────────────────────────────────────────────────────────────────────────────┘

Pattern     │ Start │ Next    │ Used? │ Results │ Example
────────────┼───────┼─────────┼───────┼─────────┼────────────────────
Subsets     │ index │ i+1     │ No    │ 2^n     │ [1,2,3] → 8 subsets
Permute     │ 0     │ -       │ YES   │ n!      │ [1,2,3] → 6 permutations
String      │ index │ index+1 │ No    │ varies  │ "23" → ["ad","ae"...]
2D Grid     │ any   │ 4 dir   │ temp  │ varies  │ Word search
Constraint  │ index │ index+1 │ counts│ varies  │ Valid parentheses
Partition   │ start │ end+1   │ No    │ varies  │ Palindrome splits
N-ary       │ row   │ row+1   │ sets  │ varies  │ N-Queens

┌────────────────────────────────────────────────────────────────────────────┐
│                   MEMORIZATION CHEAT SHEET                                 │
└────────────────────────────────────────────────────────────────────────────┘

🎯 SUBSETS (Order preserved):
   for (let i = index; i < n; i++) {
       current.push(arr[i]);
       backtrack(i+1, current);
       current.pop();
   }

🔄 PERMUTATIONS (All orders):
   const used = Array(n).fill(false);
   for (let i = 0; i < n; i++) {
       if (used[i]) continue;
       used[i] = true;
       current.push(arr[i]);
       backtrack(current);
       current.pop();
       used[i] = false;
   }

📝 STRING BUILDING:
   for (let i = 0; i < choices.length; i++) {
       backtrack(index+1, current + choices[i]);
   }

🗺️  2D GRID:
   const temp = grid[r][c];
   grid[r][c] = '#';  // mark visited
   for (const [dr,dc] of directions) {
       backtrack(r+dr, c+dc, ...);
   }
   grid[r][c] = temp;  // restore

⚖️  CONSTRAINTS:
   if (open < n) backtrack(current+'(', open+1, close);
   if (close < open) backtrack(current+')', open, close+1);

✂️  PARTITION:
   for (let end = start; end < n; end++) {
       if (isValid(start, end)) {
           current.push(substring);
           backtrack(end+1, current);
           current.pop();
       }
   }

┌────────────────────────────────────────────────────────────────────────────┐
│                      INTERVIEW STRATEGY                                    │
└────────────────────────────────────────────────────────────────────────────┘

Step 1: Identify the pattern
   - Read problem → recognize which pattern above

Step 2: State your approach
   - "This is a [pattern name] problem"
   - "I'll use backtracking with [key technique]"

Step 3: Discuss template
   - Explain base case
   - Explain exploration logic
   - Explain backtracking

Step 4: Handle edge cases
   - Empty input
   - Duplicates (if applicable)
   - Constraints (if applicable)

Step 5: Optimize if needed
   - Pruning (skip invalid branches early)
   - Memoization (if overlapping subproblems)

┌────────────────────────────────────────────────────────────────────────────┐
│                     TIME COMPLEXITY GUIDE                                  │
└────────────────────────────────────────────────────────────────────────────┘

Pattern         │ Time Complexity        │ Explanation
────────────────┼────────────────────────┼─────────────────────────────
Subsets         │ O(2^n × n)             │ 2^n subsets, n to copy each
Permutations    │ O(n! × n)              │ n! permutations, n to copy
String Building │ O(4^n × n) worst       │ Depends on choices per digit
2D Grid         │ O(m × n × 4^L)         │ Try from each cell, 4 dirs, L=word length
Constraints     │ O(2^n) with pruning    │ Pruning reduces significantly
Partition       │ O(n × 2^n)             │ 2^n partitions, n to validate
N-ary           │ O(n!)                  │ Similar to permutations

Space: O(n) for recursion stack + O(n) for current path in most cases
`);

console.log("=".repeat(80));
console.log("\n✅ YOU NOW HAVE ALL 7 BACKTRACKING PATTERNS!");
console.log("📚 Practice these 12-13 problems to master all patterns");
console.log("🎯 This covers 100% of backtracking for Google/FAANG L4");
console.log("\n" + "=".repeat(80));