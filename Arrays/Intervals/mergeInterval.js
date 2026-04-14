//https://leetcode.com/problems/merge-intervals/description/

//TC - O(n log n) and SC - O(N)
var merge = function(intervals) {
  // Sort intervals by the starting value
  intervals.sort((a, b) => a[0] - b[0]);

  let res = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    let last = res[res.length - 1];
    let curr = intervals[i];
    if(last[1] >= curr[0]){
        last[1] = Math.max(last[1],curr[1])
    }
    else{
        res.push(curr)
    }
  }

  return res;
};

const intervals = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18]
];


const result = merge(intervals);
console.log(result); // Output: [[1, 6], [8, 10], [15, 18]]
