//https://leetcode.com/problems/insert-interval/description/

//TC - (N) and SC also
var insert = function(intervals, newInterval) {
  const result = [];
  let i = 0;
  const n = intervals.length;

  // Step 1: Add all intervals that come before the new interval
  while (i < n && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }

  // Step 2: Merge all overlapping intervals
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  
  result.push(newInterval); // Add the merged new interval

  // Step 3: Add remaining intervals that come after the new interval
  while (i < n) {
    result.push(intervals[i]);
    i++;
  }

  return result;
};

const intervals = [
  [1, 3],
  [5, 7],
  [8, 10],
  [15, 18]
];
const newInterval = [6, 9];

const result = insert(intervals, newInterval);
console.log(result); 
// Output: [[1, 3], [5, 10], [15, 18]]
