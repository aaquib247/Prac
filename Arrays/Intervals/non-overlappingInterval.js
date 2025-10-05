//https://leetcode.com/problems/non-overlapping-intervals/description/


// Time Complexity:
// Sorting the intervals takes O(n log n).
// Iterating through the intervals takes O(n).
// Therefore, the overall time complexity is O(n log n).

// Space Complexity:
// The space complexity is O(1) if the sorting is done in-place (using the sort method). 
// We’re only using a few extra variables (count, prevEnd).

var eraseOverlapIntervals = function(intervals) {
    if (intervals.length === 0) return 0;

    // Step 1: Sort intervals by their end time
    intervals.sort((a, b) => a[1] - b[1]);

    let count = 0;
    let prevEnd = intervals[0][1]; // End of the first interval

    // Step 2: Iterate through intervals
    for (let i = 1; i < intervals.length; i++) {
        const [start, end] = intervals[i];

        // Step 3: If the current interval overlaps with the previous one
        if (start < prevEnd) {
            count++;  // We need to remove the current interval
        } else {
            prevEnd = end;  // Update prevEnd to the current interval's end
        }
    }

    return count;
};

const intervals = [
  [1, 2],
  [2, 3],
  [3, 4],
  [1, 3]
];

const result = eraseOverlapIntervals(intervals);
console.log(result); // Output: 1
