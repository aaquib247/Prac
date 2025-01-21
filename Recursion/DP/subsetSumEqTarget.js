// TC - 2^n and SC - O(n)
function isSubsetSum(arr, target) {

    function subset(i, target) {
        if (target === 0) return true;
        if (i === 0) return arr[0] === target;

        const nonPick = subset(i - 1, target);
        let pick = false;
        if (arr[i] <= target) {
            pick = subset(i - 1, target - arr[i]);
        }
        return nonPick || pick;
    }
    return subset(arr.length - 1, target);
}

// Example usage
const arr = [1, 2, 3, 4];
const target = 4;

console.log(isSubsetSum(arr, target));

//-----------------
// TC - n*target and SC - O(n) + O(n*target)
function isSubsetSumMemo(arr, target) {
 
    let dp = Array(arr.length + 1).fill().map(() => Array(target + 1).fill(-1));
    function subsetMemo(i, target) {
        if (target === 0) return true;
        if (i === 0) return arr[0] === target;
        if(dp[i][target] !== -1) 
            return dp[i][target]

        const nonPick = subsetMemo(i - 1, target);
        let pick = false;
        if (arr[i] <= target) {
            pick = subsetMemo(i - 1, target - arr[i]);
        }
        return dp[i][target] = nonPick || pick;
    }
    return subsetMemo(arr.length - 1, target);
}

// Example usage
const ar = [1, 2, 3, 4];
const tar = 4;

console.log(isSubsetSumMemo(ar, tar));

//---------------------------------------------
function isSubsetSumTabulation(arr, target) {
    const dp = Array(arr.length + 1).fill().map(() => Array(target + 1).fill(false));

    // Base case: Sum 0 is always possible with an empty subset
    for (let i = 0; i <= arr.length; i++) {
        dp[i][0] = true; // We can always form sum 0 with no elements (empty subset)
    }

    // Fill the DP table using the tabulation approach
    for (let i = 1; i <= arr.length; i++) {
        for (let j = 1; j <= target; j++) {
            const nonPick = dp[i - 1][j];
            let pick = false;
            if (arr[i] <= j) {
                pick = dp[i - 1][j - arr[i]];
            }
            dp[i][target] = nonPick || pick;
            }
        }

    // The result is in dp[arr.length][target]
    return dp[arr.length][target];
}

// Example usage
const arr1 = [1, 2, 3, 4];
const target1 = 4;

console.log(isSubsetSumTabulation(arr1, target1));  // Output: true


//-------------------------------------------------
// https://www.naukri.com/code360/problems/partition-equal-subset-sum_892980
// Concept is do same as above just take total sum of array and divide by 2 and nowcheck for one.

function canPartition(n, arr) {
    let totSum = 0;
  
    for (let i = 0; i < n; i++) {
      totSum += arr[i];
    }
  
    // If the total sum is odd, it cannot be partitioned into two equal subsets
    if (totSum % 2 === 1) return false;
    else {
      const k = totSum / 2;
  
      // Create a 2D array to store results of subproblems (memoization)
      const dp = Array.from({ length: n }, () => new Array(k + 1).fill(-1));

      // Helper function to solve the subset sum problem
      function subsetSumUtil(ind, target) {
        if (target === 0) return true;
        if (ind === 0) return arr[0] === target;
  
        if (dp[ind][target] !== -1) return dp[ind][target];
  
        const notTaken = subsetSumUtil(ind - 1, target);
  
        let taken = false;
        if (arr[ind] <= target) {
          taken = subsetSumUtil(ind - 1, target - arr[ind]);
        }
        return (dp[ind][target] = notTaken || taken);
      }
  
      // Call the subsetSumUtil function to check if partition is possible
      return subsetSumUtil(n - 1, k);
    }
  }
  
  // Main function
  function main() {
    const arr = [2, 3, 3, 3, 4, 5];
    const n = arr.length;
  
    if (canPartition(n, arr)) {
      console.log("The Array can be partitioned into two equal subsets");
    } else {
      console.log("The Array cannot be partitioned into two equal subsets");
    }
  }
  
  // Run the main function
  main();
  
  


