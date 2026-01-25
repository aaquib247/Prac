// 4. Median of Two Sorted Arrays
// THE Google L4/L5 Question
// TC: O(log(min(m,n))), SC: O(1)

var findMedianSortedArrays = function(nums1, nums2) {
    // STEP 1: Always binary search on the SMALLER array
    // This ensures partition2 stays in bounds
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    
    let m = nums1.length;
    let n = nums2.length;
    let left = 0;
    let right = m;
    
    while (left <= right) {
        // STEP 2: Choose partition in nums1
        let partition1 = Math.floor((left + right) / 2);
        
        // STEP 3: Calculate corresponding partition in nums2
        // Total elements in left half should be (m+n+1)/2
        let partition2 = Math.floor((m + n + 1) / 2) - partition1;
        
        // STEP 4: Get boundary values (use Infinity for edge cases)
        let maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
        let minRight1 = partition1 === m ? Infinity : nums1[partition1];
        
        let maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
        let minRight2 = partition2 === n ? Infinity : nums2[partition2];
        
        // STEP 5: Check if we found correct partition
        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            // ✓ Perfect partition found!
            
            // Odd total length
            if ((m + n) % 2 === 1) {
                return Math.max(maxLeft1, maxLeft2);
            }
            
            // Even total length
            return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
            
        } else if (maxLeft1 > minRight2) {
            // partition1 is too far right, move left
            right = partition1 - 1;
        } else {
            // partition1 is too far left, move right
            left = partition1 + 1;
        }
    }
    
    // Should never reach here with valid input
    return 0;
};

// ============================================
// VISUAL STEP-BY-STEP EXPLANATION
// ============================================

function explainMedian(nums1, nums2) {
    console.log("\n" + "=".repeat(70));
    console.log(`Finding Median: nums1=${JSON.stringify(nums1)}, nums2=${JSON.stringify(nums2)}`);
    console.log("=".repeat(70));
    
    // Show merged array
    let merged = [...nums1, ...nums2].sort((a,b) => a-b);
    console.log("\nMerged array:", JSON.stringify(merged));
    
    let totalLen = merged.length;
    let median;
    
    if (totalLen % 2 === 1) {
        let midIdx = Math.floor(totalLen / 2);
        median = merged[midIdx];
        console.log(`\nOdd length (${totalLen}): Median is element at index ${midIdx}`);
        console.log(`Median = ${median}`);
    } else {
        let mid1 = totalLen / 2 - 1;
        let mid2 = totalLen / 2;
        median = (merged[mid1] + merged[mid2]) / 2;
        console.log(`\nEven length (${totalLen}): Median is average of indices ${mid1} and ${mid2}`);
        console.log(`Median = (${merged[mid1]} + ${merged[mid2]}) / 2 = ${median}`);
    }
    
    console.log("\nAlgorithm result:", findMedianSortedArrays(nums1, nums2));
    console.log("Match:", findMedianSortedArrays(nums1, nums2) === median ? "✓" : "✗");
    
    return median;
}

// ============================================
// EXAMPLE 1: Simple Case
// ============================================

console.log("\n" + "█".repeat(70));
console.log("EXAMPLE 1: [1, 3] and [2]");
console.log("█".repeat(70));

/*
nums1 = [1, 3]  (m = 2)
nums2 = [2]     (n = 1)

Total length = 3 (odd)

Binary search on nums1:

ITERATION 1:
  left = 0, right = 2
  partition1 = (0 + 2) / 2 = 1
  partition2 = (2 + 1 + 1) / 2 - 1 = 2 - 1 = 1
  
  Partitions:
  nums1: [1 | 3]
          ↑   ↑
     maxLeft1 minRight1
        = 1     = 3
  
  nums2: [2 | ]
          ↑   ↑
     maxLeft2 minRight2
        = 2     = ∞
  
  Check conditions:
    maxLeft1 ≤ minRight2? → 1 ≤ ∞ ✓
    maxLeft2 ≤ minRight1? → 2 ≤ 3 ✓
  
  ✓ Valid partition!
  
  Total length is odd (3)
  Median = max(maxLeft1, maxLeft2) = max(1, 2) = 2
  
  Visual:
  Left half:  {1, 2}
  Right half: {3}
  Median = 2 ✓
*/

explainMedian([1, 3], [2]);

// ============================================
// EXAMPLE 2: Even Length
// ============================================

console.log("\n" + "█".repeat(70));
console.log("EXAMPLE 2: [1, 2] and [3, 4]");
console.log("█".repeat(70));

/*
nums1 = [1, 2]  (m = 2)
nums2 = [3, 4]  (n = 2)

Total length = 4 (even)

ITERATION 1:
  left = 0, right = 2
  partition1 = 1
  partition2 = (2 + 2 + 1) / 2 - 1 = 2 - 1 = 1
  
  Partitions:
  nums1: [1 | 2]        maxLeft1=1, minRight1=2
  nums2: [3 | 4]        maxLeft2=3, minRight2=4
  
  Check:
    1 ≤ 4 ✓
    3 ≤ 2 ✗  (FAILED!)
  
  maxLeft2 > minRight1 → partition1 too far left
  left = partition1 + 1 = 2

ITERATION 2:
  left = 2, right = 2
  partition1 = 2
  partition2 = 2 - 2 = 0
  
  Partitions:
  nums1: [1, 2 | ]      maxLeft1=2, minRight1=∞
  nums2: [ | 3, 4]      maxLeft2=-∞, minRight2=3
  
  Check:
    2 ≤ 3 ✓
    -∞ ≤ ∞ ✓
  
  ✓ Valid partition!
  
  Total length is even (4)
  Median = (max(2, -∞) + min(∞, 3)) / 2
         = (2 + 3) / 2
         = 2.5 ✓
*/

explainMedian([1, 2], [3, 4]);

// ============================================
// EXAMPLE 3: Different Sizes
// ============================================

console.log("\n" + "█".repeat(70));
console.log("EXAMPLE 3: [1, 3, 8, 9, 15] and [7, 11, 18, 19, 21]");
console.log("█".repeat(70));

explainMedian([1, 3, 8, 9, 15], [7, 11, 18, 19, 21]);

// ============================================
// EDGE CASES
// ============================================

console.log("\n" + "█".repeat(70));
console.log("EDGE CASES");
console.log("█".repeat(70));

console.log("\n1. One array is empty:");
explainMedian([], [1]);
explainMedian([2], []);

console.log("\n2. One element each:");
explainMedian([1], [2]);

console.log("\n3. Very different sizes:");
explainMedian([1], [2, 3, 4, 5, 6]);

console.log("\n4. All elements in one are smaller:");
explainMedian([1, 2], [3, 4]);

console.log("\n5. Interleaved:");
explainMedian([1, 3, 5], [2, 4, 6]);

console.log("\n6. Duplicates:");
explainMedian([1, 1, 1], [1, 1, 1]);

// ============================================
// KEY CONCEPTS EXPLAINED
// ============================================

console.log("\n" + "🔑".repeat(35));
console.log("\nKEY CONCEPTS:\n");

console.log("1. WHY BINARY SEARCH ON SMALLER ARRAY?");
console.log("─".repeat(70));
console.log(`
   If we search on nums1 (size m):
     partition1 can be 0 to m
     partition2 = (m+n+1)/2 - partition1
   
   If partition1 = m (max), then partition2 = (m+n+1)/2 - m
   For partition2 to be valid (≥ 0 and ≤ n), we need m ≤ n
   
   Solution: Always make nums1 the smaller array!
   This guarantees partition2 stays in bounds [0, n]
`);

console.log("2. WHY (m+n+1)/2 FOR partition2?");
console.log("─".repeat(70));
console.log(`
   Goal: Left half has (m+n)/2 elements (or one more if odd)
   
   If partition1 takes some elements from nums1,
   partition2 must take remaining from nums2 to fill left half
   
   partition1 + partition2 = (m + n + 1) / 2
   partition2 = (m + n + 1) / 2 - partition1
   
   The +1 handles both odd and even total lengths:
     Odd (5):  (5+1)/2 = 3 → left has 3 elements
     Even (6): (6+1)/2 = 3 (floor) → left has 3 elements
`);

console.log("3. WHY USE INFINITY?");
console.log("─".repeat(70));
console.log(`
   Edge cases when partition is at boundaries:
   
   partition1 = 0:  No elements from nums1 in left
     → maxLeft1 doesn't exist
     → Use -∞ (always ≤ any minRight)
   
   partition1 = m:  All elements from nums1 in left
     → minRight1 doesn't exist
     → Use +∞ (always ≥ any maxLeft)
   
   Same logic for partition2
`);

console.log("4. WHAT ARE WE CHECKING?");
console.log("─".repeat(70));
console.log(`
   For valid partition:
   
   maxLeft1 ≤ minRight2  ✓
     All left nums1 ≤ all right nums2
   
   maxLeft2 ≤ minRight1  ✓
     All left nums2 ≤ all right nums1
   
   If both true → correct partition!
   
   Visual:
   Left Half:  [maxLeft1, maxLeft2]
   Right Half: [minRight1, minRight2]
   
   Median depends on max(left) and min(right)
`);

console.log("5. HOW TO ADJUST PARTITION?");
console.log("─".repeat(70));
console.log(`
   If maxLeft1 > minRight2:
     → nums1 left side has elements too large
     → partition1 is too far RIGHT
     → Move partition1 LEFT: right = partition1 - 1
   
   If maxLeft2 > minRight1:
     → nums2 left side has elements too large
     → partition1 is too far LEFT (partition2 too far right)
     → Move partition1 RIGHT: left = partition1 + 1
`);

// ============================================
// COMPLEXITY ANALYSIS
// ============================================

console.log("\n⏱️  COMPLEXITY:\n");
console.log("TIME: O(log(min(m, n)))");
console.log("  Binary search on smaller array");
console.log("  Each iteration: O(1) comparisons");
console.log("  Total: log(min(m, n)) iterations\n");

console.log("SPACE: O(1)");
console.log("  Only using variables");
console.log("  No extra arrays\n");

// ============================================
// COMMON MISTAKES
// ============================================

console.log("❌ COMMON MISTAKES:\n");

console.log("1. Not swapping to make nums1 smaller");
console.log("   → partition2 can go out of bounds!");
console.log("   → CRASH!\n");

console.log("2. Using (m+n)/2 instead of (m+n+1)/2");
console.log("   → Wrong for odd total lengths!");
console.log("   → Left and right halves unequal\n");

console.log("3. Forgetting Infinity edge cases");
console.log("   → Array access out of bounds");
console.log("   → CRASH when partition at boundaries\n");

console.log("4. Wrong median calculation");
console.log("   Odd:  max(maxLeft1, maxLeft2) ✓");
console.log("   Even: avg(max(lefts), min(rights)) ✓");
console.log("   NOT: avg(maxLeft1, maxLeft2) ✗\n");

console.log("5. Confusing partition index");
console.log("   partition1 = 2 means:");
console.log("     - First 2 elements in left");
console.log("     - maxLeft1 = nums1[partition1-1] = nums1[1]");
console.log("     - minRight1 = nums1[partition1] = nums1[2]\n");

// ============================================
// INTERVIEW STRATEGY
// ============================================

console.log("💼 INTERVIEW STRATEGY:\n");

console.log("STEP 1: Acknowledge Difficulty");
console.log('  "This is one of the hardest LeetCode problems"');
console.log('  "Let me start with the O(m+n) approach and optimize"\n');

console.log("STEP 2: Explain Partition Concept");
console.log('  "A median divides array into equal halves"');
console.log('  "For two arrays, we need to partition both"');
console.log('  Draw this on whiteboard!\n');

console.log("STEP 3: Binary Search Insight");
console.log('  "We can binary search on partition position"');
console.log('  "Search on smaller array to keep bounds valid"\n');

console.log("STEP 4: Implementation");
console.log('  "Let me handle edge cases with Infinity"');
console.log('  "Check if partition is valid..."\n');

console.log("STEP 5: Test Cases");
console.log("  Odd length: [1,3] and [2]");
console.log("  Even length: [1,2] and [3,4]");
console.log("  Edge: [] and [1]");
console.log("  Edge: [1] and [2,3,4,5,6]\n");

// ============================================
// FINAL TIPS
// ============================================

console.log("🎯 FINAL TIPS:\n");

console.log("1. PRACTICE THE DRAWING");
console.log("   Visual partition diagram helps immensely");
console.log("   Both for you and the interviewer\n");

console.log("2. MEMORIZE THE TEMPLATE");
console.log("   This problem has a specific pattern");
console.log("   Practice until you can write it without thinking\n");

console.log("3. EXPLAIN AS YOU CODE");
console.log('   "I\'m binary searching on partition position..."');
console.log('   "Now checking if this partition is valid..."\n');

console.log("4. HANDLE EDGE CASES CLEARLY");
console.log("   Infinity makes code clean");
console.log("   Mention why you use it\n");

console.log("5. EVEN PARTIAL CREDIT HELPS");
console.log("   If stuck, explain the approach");
console.log("   Show you understand the concept");
console.log("   Better than complete silence!\n");

console.log("═".repeat(70));
console.log("Good luck! This problem is hard, but you can do it! 💪");
console.log("═".repeat(70));