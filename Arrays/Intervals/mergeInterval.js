//https://leetcode.com/problems/merge-intervals/description/

//TC - O(n log n) and SC - O(N)
var merge = function(intervals) {
  // Sort intervals by the starting value
  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [];

  for (let i = 0; i < intervals.length; i++) {
    // If the merged array is empty or no overlap, simply add the interval
    if (merged.length === 0 || merged[merged.length - 1][1] < intervals[i][0]) {
      merged.push(intervals[i]);
    } else {
      // There is overlap, so merge the intervals
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], intervals[i][1]);
      // why max --> edge case -- [[1,4], [2,3]] output - [1,4]
    }
  }

  return merged;
};

const intervals = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18]
];


const result = merge(intervals);
console.log(result); // Output: [[1, 6], [8, 10], [15, 18]]
