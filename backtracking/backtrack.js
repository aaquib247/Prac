/**
 * ULTIMATE RECURSION & BACKTRACKING PATTERN
 * 
 * ONE PATTERN TO RULE THEM ALL! 🔥
 * 
 * THE UNIVERSAL TEMPLATE:
 * 
 * function solve(index, current, target, arr, result) {
 *     // BASE CASE: reached end or found solution
 *     if (condition) {
 *         result.push([...current]);
 *         return;
 *     }
 *     
 *     // EXPLORE: make choices
 *     for (let i = start; i < arr.length; i++) {
 *         // CHOOSE
 *         current.push(arr[i]);
 *         
 *         // RECURSE
 *         solve(i + 1, current, ...);
 *         
 *         // UNCHOOSE (backtrack)
 *         current.pop();
 *     }
 * }
 */

console.log("=".repeat(70));
console.log("ULTIMATE RECURSION & BACKTRACKING PATTERN GUIDE");
console.log("=".repeat(70));

// ============================================
// PROBLEM 1: SUBSEQUENCES
// ============================================

console.log("\n📋 PROBLEM 1: ALL SUBSEQUENCES");
console.log("-".repeat(70));
//TC: O(2^n) SC: O(n) for recursion stack + O(n) for current path
function subsequences(arr) {
    const result = [];
    
    function backtrack(index, current) {
        // BASE: processed all elements
        result.push([...current]);
        
        // EXPLORE: try including each remaining element
        for (let i = index; i < arr.length; i++) {
            current.push(arr[i]);           // CHOOSE
            backtrack(i + 1, current);      // RECURSE
            current.pop();                   // UNCHOOSE
        }
    }
    
    backtrack(0, []);
    return result;
}

console.log("Input: [1, 2, 3]");
console.log("Output:", JSON.stringify(subsequences([1, 2, 3])));

// ============================================
// PROBLEM 2: SUBSEQUENCE WITH SUM K
// ============================================

console.log("\n\n📋 PROBLEM 2: SUBSEQUENCES WITH SUM K");
console.log("-".repeat(70));

function subsequencesSumK(arr, k) {
    const result = [];
    
    function backtrack(index, current, sum) {
        // BASE: found target sum
        if (sum === k) {
            result.push([...current]);
            return;
        }
        
        // PRUNE: sum exceeded
        if (sum > k || index >= arr.length) return;
        
        // EXPLORE: include or exclude each element
        for (let i = index; i < arr.length; i++) {
            current.push(arr[i]);                    // CHOOSE
            backtrack(i + 1, current, sum + arr[i]); // RECURSE
            current.pop();                           // UNCHOOSE
        }
    }
    
    backtrack(0, [], 0);
    return result;
}

console.log("Input: [1, 2, 3], k = 3");
console.log("Output:", JSON.stringify(subsequencesSumK([1, 2, 3], 3)));
//output: [[1,2],[3]]

// Alternative: Include/Exclude Pattern
function subsequencesSumK_V2(arr, k) {
    const result = [];
    
    function backtrack(index, current, sum) {
        if (index === arr.length) {
            if (sum === k) result.push([...current]);
            return;
        }
        
        // INCLUDE
        current.push(arr[index]);
        backtrack(index + 1, current, sum + arr[index]);
        current.pop();
        
        // EXCLUDE
        backtrack(index + 1, current, sum);
    }
    
    backtrack(0, [], 0);
    return result;
}

console.log("Alternative approach:", JSON.stringify(subsequencesSumK_V2([1, 2, 3], 3)));

// ============================================
// PROBLEM 3: COMBINATION SUM I
// (Can use same element multiple times)
// ============================================

console.log("\n\n📋 PROBLEM 3: COMBINATION SUM I (Unlimited Use)");
console.log("-".repeat(70));

function combinationSum(candidates, target) {
    const result = [];
    
    function backtrack(index, current, sum) {
        // BASE: found target
        if (sum === target) {
            result.push([...current]);
            return;
        }
        
        // PRUNE: exceeded target
        if (sum > target) return;
        
        // EXPLORE: can reuse same element (index stays same)
        for (let i = index; i < candidates.length; i++) {
            current.push(candidates[i]);                      // CHOOSE
            backtrack(i, current, sum + candidates[i]);       // RECURSE (i, not i+1!)
            current.pop();                                    // UNCHOOSE
        }
    }
    
    backtrack(0, [], 0);
    return result;
}

console.log("Input: [2, 3, 6, 7], target = 7");
console.log("Output:", JSON.stringify(combinationSum([2, 3, 6, 7], 7)));
//output: [[7],[2,2,3]]
//TC: O(2^t) where t is target, SC: O(t) for recursion stack + O(t) for current path

// ============================================
// PROBLEM 4: COMBINATION SUM II
// (Each element used only once, has duplicates)
// ============================================

console.log("\n\n📋 PROBLEM 4: COMBINATION SUM II (Use Once, Has Duplicates)");
console.log("-".repeat(70));

function combinationSum2(candidates, target) {
    const result = [];
    candidates.sort((a, b) => a - b);  // MUST SORT for duplicate handling
    
    function backtrack(index, current, sum) {
        // BASE: found target
        if (sum === target) {
            result.push([...current]);
            return;
        }
        
        // PRUNE: exceeded target
        if (sum > target) return;
        
        // EXPLORE
        for (let i = index; i < candidates.length; i++) {
            // SKIP DUPLICATES at same level
            //i>index to ensure first occurrence is taken ? How ? be
            if (i > index && candidates[i] === candidates[i - 1]) continue;
            /*
                        []
                        |
        ┌───────────────┼───────────────┐
        1₀             1₁(skip)         2  ...
        |               |
    ┌───┼───┐          skip
    1₁  2   5                              
    |   |   |
    6   5   X(>8)
    |   |
   [1,1,6] [1,2,5]

Key: 1₀ and 1₁ are two different 1's in the array
At same level, we skip 1₁ to avoid duplicates
*/
            
            current.push(candidates[i]);                      // CHOOSE
            backtrack(i + 1, current, sum + candidates[i]);   // RECURSE (i+1, not i!)
            current.pop();                                    // UNCHOOSE
        }
    }
    
    backtrack(0, [], 0);
    return result;
}

console.log("Input: [10, 1, 2, 7, 6, 1, 5], target = 8");
console.log("Output:", JSON.stringify(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)));

// ============================================
// PROBLEM 5: SUBSETS I (All subsets)
// ============================================

console.log("\n\n📋 PROBLEM 5: SUBSETS I (All Subsets, No Duplicates)");
console.log("-".repeat(70));

function subsets(nums) {
    const result = [];
    
    function backtrack(index, current) {
        // BASE: add current subset
        result.push([...current]);
        
        // EXPLORE
        for (let i = index; i < nums.length; i++) {
            current.push(nums[i]);          // CHOOSE
            backtrack(i + 1, current);      // RECURSE
            current.pop();                  // UNCHOOSE
        }
    }
    
    backtrack(0, []);
    return result;
}

console.log("Input: [1, 2, 3]");
console.log("Output:", JSON.stringify(subsets([1, 2, 3])));
//output: [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]

// ============================================
// PROBLEM 6: SUBSETS II (Has duplicates)
// ============================================

console.log("\n\n📋 PROBLEM 6: SUBSETS II (Has Duplicates)");
console.log("-".repeat(70));

function subsetsWithDup(nums) {
    const result = [];
    nums.sort((a, b) => a - b);  // MUST SORT
    
    function backtrack(index, current) {
        // BASE: add current subset
        result.push([...current]);
        
        // EXPLORE
        for (let i = index; i < nums.length; i++) {
            // SKIP DUPLICATES at same level
            if (i > index && nums[i] === nums[i - 1]) continue;
            
            current.push(nums[i]);          // CHOOSE
            backtrack(i + 1, current);      // RECURSE
            current.pop();                  // UNCHOOSE
        }
    }
    
    backtrack(0, []);
    return result;
}

console.log("Input: [1, 2, 2]");
console.log("Output:", JSON.stringify(subsetsWithDup([1, 2, 2])));
//output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
//TC: O(2^n) SC: O(n) for recursion stack + O(n) for current path

// ============================================
// THE UNIVERSAL PATTERN - SUMMARY
// ============================================

console.log("\n\n" + "=".repeat(70));
console.log("🎯 THE UNIVERSAL PATTERN");
console.log("=".repeat(70));

console.log(`
┌────────────────────────────────────────────────────────────────┐
│                    UNIVERSAL TEMPLATE                          │
└────────────────────────────────────────────────────────────────┘

function solve(index, current, ...params) {
    // STEP 1: BASE CASE
    if (condition_met) {
        result.push([...current]);
        return;
    }
    
    // STEP 2: PRUNING (optional optimization)
    if (invalid_state) return;
    
    // STEP 3: EXPLORE ALL CHOICES
    for (let i = index; i < arr.length; i++) {
        
        // STEP 3a: SKIP DUPLICATES (if needed)
        if (i > index && arr[i] === arr[i-1]) continue;
        
        // STEP 3b: CHOOSE
        current.push(arr[i]);
        
        // STEP 3c: RECURSE
        solve(next_index, current, ...updated_params);
        
        // STEP 3d: UNCHOOSE (backtrack)
        current.pop();
    }
}

┌────────────────────────────────────────────────────────────────┐
│                    DECISION TREE                               │
└────────────────────────────────────────────────────────────────┘

WHEN TO USE i vs i+1 in recursion?

✅ backtrack(i, ...)     → Can REUSE same element
                           (Combination Sum I)

✅ backtrack(i+1, ...)   → Use each element ONCE
                           (Combination Sum II, Subsets)

┌────────────────────────────────────────────────────────────────┐
│                  HANDLING DUPLICATES                           │
└────────────────────────────────────────────────────────────────┘

STEP 1: SORT the array
STEP 2: Skip duplicates at same level:
        if (i > index && arr[i] === arr[i-1]) continue;

Why i > index?
- i === index: First element at this level (take it)
- i > index: Subsequent elements (skip if duplicate)

┌────────────────────────────────────────────────────────────────┐
│                 PROBLEM COMPARISON TABLE                       │
└────────────────────────────────────────────────────────────────┘

Problem              | Reuse? | Duplicates? | Sort? | Next Index
---------------------|--------|-------------|-------|------------
Subsequences         | No     | No          | No    | i+1
Subseq Sum K         | No     | No          | No    | i+1
Combination Sum I    | YES    | No          | No    | i (same!)
Combination Sum II   | No     | YES         | YES   | i+1
Subsets I            | No     | No          | No    | i+1
Subsets II           | No     | YES         | YES   | i+1

┌────────────────────────────────────────────────────────────────┐
│              TWO MAIN APPROACHES                               │
└────────────────────────────────────────────────────────────────┘

APPROACH 1: FOR LOOP (Recommended for interviews)
   for (let i = index; i < arr.length; i++) {
       current.push(arr[i]);
       backtrack(i+1, current);
       current.pop();
   }

APPROACH 2: INCLUDE/EXCLUDE (Easier to understand)
   // Include current element
   current.push(arr[index]);
   backtrack(index+1, current);
   current.pop();
   
   // Exclude current element
   backtrack(index+1, current);

Both work! Use whichever is clearer to you.

┌────────────────────────────────────────────────────────────────┐
│                  INTERVIEW STRATEGY                            │
└────────────────────────────────────────────────────────────────┘

1. Identify: Is it a combination/subset/subsequence problem?
2. Ask: Can I reuse elements? (affects recursion index)
3. Ask: Are there duplicates? (need sorting + skip logic)
4. Ask: What's the target/constraint? (base case + pruning)
5. Code: Use universal template above
6. Test: Empty array, single element, duplicates

┌────────────────────────────────────────────────────────────────┐
│                   TIME COMPLEXITY                              │
└────────────────────────────────────────────────────────────────┘

Subsequences/Subsets: O(2^n) - each element: include or exclude
Combination Sum: O(2^n) to O(n^target) depending on constraints

Space: O(n) for recursion stack + O(n) for current path
`);

console.log("=".repeat(70));

// ============================================
// PRACTICE TEMPLATE
// ============================================

console.log("\n📝 INTERVIEW-READY TEMPLATE TO MEMORIZE:\n");

console.log(`
function backtrackTemplate(arr, target) {
    const result = [];
    
    // Sort if handling duplicates
    // arr.sort((a, b) => a - b);
    
    function backtrack(index, current, sum) {
        // BASE CASE
        if (sum === target) {
            result.push([...current]);
            return;
        }
        
        // PRUNING
        if (sum > target) return;
        
        // EXPLORE
        for (let i = index; i < arr.length; i++) {
            // Skip duplicates (if needed)
            // if (i > index && arr[i] === arr[i-1]) continue;
            
            current.push(arr[i]);                    // CHOOSE
            backtrack(i + 1, current, sum + arr[i]); // RECURSE
            current.pop();                           // UNCHOOSE
        }
    }
    
    backtrack(0, [], 0);
    return result;
}
`);

console.log("=".repeat(70));