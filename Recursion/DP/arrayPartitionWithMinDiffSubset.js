//https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference/
// Time Complexity: O(N*totSum) +O(N) +O(N)
// Reason: There are two nested loops that account for O(N*totSum), at starting we are running a for loop to calculate totSum, and at last a for loop to traverse the last row.
// Space Complexity: O(N*totSum)
// Reason: We are using an external array of size ‘N * totSum’. Stack Space is eliminated.

function minSubsetSumDifference(arr, n) {
    let totSum = 0;
  
    // Calculate the total sum of elements in the array
    for (let i = 0; i < n; i++) {
      totSum += arr[i];
    }
  
    // Create a 2D boolean array for dynamic programming
    const dp = new Array(n);
    for (let i = 0; i < n; i++) {
      dp[i] = new Array(totSum + 1).fill(false);
    }
  
    // Initialize the first row of the dp array
    for (let i = 0; i < n; i++) {
      dp[i][0] = true;
    }
  
    // Initialize the first column of the dp array
    if (arr[0] <= totSum) {
      dp[0][arr[0]] = true;
    }
  
    // Fill the dp array using bottom-up dynamic programming
    for (let ind = 1; ind < n; ind++) {
      for (let target = 1; target <= totSum; target++) {
        const notTaken = dp[ind - 1][target];
  
        let taken = false;
        if (arr[ind] <= target) {
          taken = dp[ind - 1][target - arr[ind]];
        }
  
        dp[ind][target] = notTaken || taken;
      }
    }
  
    let mini = 1e9;
    for (let i = 0; i <= totSum; i++) {
      if (dp[n - 1][i] === true) {
        const diff = Math.abs(i - (totSum - i));
        mini = Math.min(mini, diff);
      }
    }
    return mini;
  }
  
  // Main function
  function main() {
    const arr = [1, 2, 3, 4];
    const n = arr.length;
  
    console.log("The minimum absolute difference is: " + minSubsetSumDifference(arr, n));
  }
  
  // Run the main function
  main();
  
  