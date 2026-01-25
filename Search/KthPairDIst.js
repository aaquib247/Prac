// 719. Find K-th Smallest Pair Distance
// Pattern: Binary Search on Answer + Sliding Window Counting
// TC: O(n log n + n log(max-min)), SC: O(1)

var smallestDistancePair = function(nums, k) {
    // Step 1: Sort the array
    nums.sort((a, b) => a - b);
    
    // Step 2: Define search space
    let left = 0;  // Minimum possible distance
    let right = nums[nums.length - 1] - nums[0];  // Maximum possible distance
    
    // Step 3: Helper function - count pairs with distance ≤ mid
    const countPairs = (maxDistance) => {
        let count = 0;
        let j = 0;  // Right pointer
        
        // Sliding window approach
        for (let i = 0; i < nums.length; i++) {
            // Move j forward while distance is ≤ maxDistance
            while (j < nums.length && nums[j] - nums[i] <= maxDistance) {
                j++;
            }
            
            // All pairs (i, i+1), (i, i+2), ..., (i, j-1) have distance ≤ maxDistance
            count += j - i - 1;
        }
        
        return count;
    };
    
    // Step 4: Binary search for kth smallest distance
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        
        // Count how many pairs have distance ≤ mid
        if (countPairs(mid) < k) {
            // Not enough pairs, distance too small
            left = mid + 1;
        } else {
            // Enough pairs, try smaller distance
            right = mid;
        }
    }
    
    return left;
};

// ============================================
// DRY RUN: [1,3,1], k=1
// ============================================

console.log("\n" + "=".repeat(60));
console.log("DRY RUN: nums=[1,3,1], k=1");
console.log("=".repeat(60));

let nums = [1, 3, 1];
let k = 1;

console.log("\nStep 1: Sort array");
nums.sort((a, b) => a - b);
console.log("Sorted:", nums, "→ [1, 1, 3]");

console.log("\nStep 2: Search space");
console.log("left = 0 (min distance)");
console.log("right = 3 - 1 = 2 (max distance)");

console.log("\nAll pairs and their distances:");
console.log("(1,1) → |1-1| = 0");
console.log("(1,3) → |1-3| = 2");
console.log("(1,3) → |1-3| = 2");
console.log("Sorted distances: [0, 2, 2]");
console.log("k=1 → 1st smallest = 0");

console.log("\n--- Binary Search Iterations ---");

/*
ITERATION 1:
  left=0, right=2
  mid = (0+2)/2 = 1
  
  countPairs(1)?
    i=0: nums[0]=1
      j starts at 0
      nums[0]-nums[0] = 0 ≤ 1 ✓ → j=1
      nums[1]-nums[0] = 0 ≤ 1 ✓ → j=2
      nums[2]-nums[0] = 2 > 1 ✗ → stop
      pairs: (0,1) → count = 1
    
    i=1: nums[1]=1
      j continues from 2
      nums[2]-nums[1] = 2 > 1 ✗ → stop
      pairs: none → count = 1
    
    i=2: nums[2]=3
      j continues from 2
      out of bounds
      pairs: none → count = 1
  
  countPairs(1) = 1
  Is 1 < k (1)? NO
  → Enough pairs, try smaller: right = 1

ITERATION 2:
  left=0, right=1
  mid = (0+1)/2 = 0
  
  countPairs(0)?
    i=0: nums[0]=1
      nums[1]-nums[0] = 0 ≤ 0 ✓ → j=2
      nums[2]-nums[0] = 2 > 0 ✗ → stop
      pairs: (0,1) → count = 1
    
    i=1: nums[1]=1
      j continues from 2
      nums[2]-nums[1] = 2 > 0 ✗
      pairs: none → count = 1
  
  countPairs(0) = 1
  Is 1 < 1? NO
  → right = 0

ITERATION 3:
  left=0, right=0
  Loop ends (left === right)

RETURN: 0 ✓
*/

console.log("\nResult:", smallestDistancePair([1, 3, 1], 1));

// ============================================
// DRY RUN: [1,6,1], k=3
// ============================================

console.log("\n" + "=".repeat(60));
console.log("DRY RUN: nums=[1,6,1], k=3");
console.log("=".repeat(60));

nums = [1, 6, 1];
k = 3;

console.log("\nSorted:", [1, 1, 6]);
console.log("\nAll pairs:");
console.log("(1,1) → distance = 0");
console.log("(1,6) → distance = 5");
console.log("(1,6) → distance = 5");
console.log("Sorted distances: [0, 5, 5]");
console.log("k=3 → 3rd smallest = 5");

console.log("\nResult:", smallestDistancePair([1, 6, 1], 3));

// ============================================
// DETAILED COUNTING EXPLANATION
// ============================================

console.log("\n" + "🔍".repeat(30));
console.log("\nHOW countPairs() WORKS:\n");

console.log("Array: [1, 1, 3] (sorted)");
console.log("Question: How many pairs have distance ≤ 1?\n");

console.log("Sliding Window Technique:");
console.log("─".repeat(50));
console.log(`
i=0, nums[i]=1:
  j=0: nums[0]-nums[0]=0 ≤ 1 ✓ move j
  j=1: nums[1]-nums[0]=0 ≤ 1 ✓ move j
  j=2: nums[2]-nums[0]=2 > 1 ✗ stop at j=2
  
  Window: [1, 1, 3]
           i     j
  Pairs with i: (0,1)
  Count: j - i - 1 = 2 - 0 - 1 = 1 ✓

i=1, nums[i]=1:
  j continues from 2
  j=2: nums[2]-nums[1]=2 > 1 ✗ stop
  
  Window: [1, 1, 3]
              i  j
  No new pairs
  Count: j - i - 1 = 2 - 1 - 1 = 0

i=2, nums[i]=3:
  j continues from 2 (out of bounds)
  No pairs
  Count: 0

Total pairs with distance ≤ 1: 1 + 0 + 0 = 1
`);

// ============================================
// MORE TEST CASES
// ============================================

console.log("█".repeat(60));
console.log("TEST CASES");
console.log("█".repeat(60));

const testCases = [
    { nums: [1, 3, 1], k: 1, expected: 0 },
    { nums: [1, 6, 1], k: 3, expected: 5 },
    { nums: [1, 1, 1], k: 2, expected: 0 },
    { nums: [1, 2, 3, 4], k: 3, expected: 1 },
    { nums: [9, 10, 7, 10, 6, 1, 5, 4, 9, 8], k: 18, expected: 2 },
];

testCases.forEach(({ nums, k, expected }, i) => {
    const result = smallestDistancePair(nums, k);
    const status = result === expected ? "✓" : "✗";
    console.log(`\nTest ${i + 1}: ${status}`);
    console.log(`  Input: nums=${JSON.stringify(nums)}, k=${k}`);
    console.log(`  Output: ${result}, Expected: ${expected}`);
});

// ============================================
// WHY SORTING HELPS
// ============================================

console.log("\n" + "💡".repeat(30));
console.log("\nWHY SORT THE ARRAY?\n");

console.log("Unsorted: [3, 1, 1]");
console.log("To count pairs with distance ≤ 1:");
console.log("  Must check ALL pairs → O(n²) per count\n");

console.log("Sorted: [1, 1, 3]");
console.log("To count pairs with distance ≤ 1:");
console.log("  Use sliding window → O(n) per count");
console.log("  Once j moves past valid range, it never comes back!");
console.log("  This is because array is sorted → monotonic property\n");

// ============================================
// WHY SLIDING WINDOW WORKS
// ============================================

console.log("🎯 WHY SLIDING WINDOW COUNTING WORKS:\n");

console.log("Array: [1, 1, 3, 5, 7]");
console.log("Count pairs with distance ≤ 2\n");

console.log(`
i=0 (value=1):
  j moves to find all nums[j] where nums[j]-1 ≤ 2
  Valid: 1,1,3 (j stops at index 3)
  Pairs: (0,1), (0,2) → count = 2

i=1 (value=1):
  j is already at 3, don't need to restart!
  nums[3]-1=4 > 2, so j stays at 3
  Valid: 1,3 (indices 1,2)
  Pairs: (1,2) → count = 1

Key insight: j never moves backward!
Because array is sorted: if nums[j]-nums[i] > maxDist,
then nums[j]-nums[i+1] ≥ nums[j]-nums[i] > maxDist
`);

// ============================================
// COMPLEXITY ANALYSIS
// ============================================

console.log("⏱️  COMPLEXITY ANALYSIS:\n");

console.log("TIME COMPLEXITY:");
console.log("  Sorting: O(n log n)");
console.log("  Binary Search: O(log(max - min))");
console.log("    - max - min = largest possible distance");
console.log("    - Usually much smaller than n²");
console.log("  Each countPairs: O(n)");
console.log("    - Sliding window, each element visited once");
console.log("  Total: O(n log n + n log(max - min))\n");

console.log("SPACE COMPLEXITY:");
console.log("  O(1) or O(log n) for sorting");
console.log("  No extra arrays created\n");

// ============================================
// PATTERN RECOGNITION
// ============================================

console.log("🎯 PATTERN RECOGNITION:\n");

console.log("This problem combines TWO patterns:\n");

console.log("1. BINARY SEARCH ON ANSWER:");
console.log("   ❌❌❌✓✓✓ pattern");
console.log("   Distance too small → not enough pairs");
console.log("   Distance large enough → enough pairs");
console.log("   Find: minimum distance with ≥ k pairs\n");

console.log("2. SLIDING WINDOW COUNTING:");
console.log("   For a sorted array, count pairs efficiently");
console.log("   j never moves backward → O(n) per count\n");

console.log("Similar to:");
console.log("  • Kth Smallest Element in Sorted Matrix (LC 378)");
console.log("  • Split Array Largest Sum (LC 410)");
console.log("  • Minimize Max Distance to Gas Station (LC 774)\n");

// ============================================
// INTERVIEW TIPS
// ============================================

console.log("💼 INTERVIEW TIPS:\n");

console.log("1. START WITH BRUTE FORCE:");
console.log("   'I could generate all n² pairs and sort them...'");
console.log("   'But that's too slow for large n'\n");

console.log("2. RECOGNIZE THE PATTERN:");
console.log("   'I notice this has a monotonic property...'");
console.log("   'If d works, then d+1 also works'");
console.log("   'This suggests binary search on answer'\n");

console.log("3. EXPLAIN COUNTING:");
console.log("   'After sorting, I can use sliding window'");
console.log("   'to count pairs in O(n) instead of O(n²)'\n");

console.log("4. DRAW IT OUT:");
console.log("   Visual explanation really helps here!");
console.log("   Show the sliding window movement\n");

// ============================================
// COMMON MISTAKES
// ============================================

console.log("❌ COMMON MISTAKES:\n");

console.log("1. Forgetting to sort:");
console.log("   → Sliding window won't work!\n");

console.log("2. Wrong counting logic:");
console.log("   count += j - i (WRONG)");
console.log("   count += j - i - 1 (CORRECT)");
console.log("   Because we don't count pair (i,i)\n");

console.log("3. Not resetting j:");
console.log("   j should continue from previous position");
console.log("   Don't reset j=i+1 in each iteration!\n");

console.log("4. Binary search confusion:");
console.log("   if (count < k) → distance too small → left = mid + 1");
console.log("   if (count ≥ k) → distance works → right = mid\n");