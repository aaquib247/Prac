//cherryPick2
//withput DP TC O(3^n * 3^n) and SC )(N)
// TC(N*M*M) and SC -- > (N*M*N) + (N)

function maxChocoUtil(i, j1, j2, n, m, grid, dp) {
    // Check if the indices are out of bounds
    if (j1 < 0 || j1 >= m || j2 < 0 || j2 >= m) {
      return -1e9; // A very large negative value for invalid states
    }
  
    // Base case: if we are at the last row
    if (i == n - 1) {
      // If both indices are the same, return the value at that position
      if (j1 == j2) {
        return grid[i][j1];
      } else {
        // If the indices are different, return the sum of values at both positions
        return grid[i][j1] + grid[i][j2];
      }
    }
  
    // If the result for this state is already computed, return it
    if (dp[i][j1][j2] != -1) {
      return dp[i][j1][j2];
    }
  
    let maxi = Number.MIN_SAFE_INTEGER; // Initialize the maximum value to a very small number
  
    // Iterate through neighboring positions
    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        let ans;
        if (j1 == j2) {
          ans = grid[i][j1] + maxChocoUtil(i + 1, j1 + di, j2 + dj, n, m, grid, dp);
        } else {
          ans = grid[i][j1] + grid[i][j2] + maxChocoUtil(i + 1, j1 + di, j2 + dj, n, m, grid, dp);
        }
        // Update the maximum value
        maxi = Math.max(maxi, ans);
      }
    }
  
    // Store the maximum value in the dp array and return it
    dp[i][j1][j2] = maxi;
    return maxi;
  }
  
  function maximumChocolates(n, m, grid) {
    // Initialize a 3D dp array with -1 values
    const dp = new Array(n).fill(null).map(() => new Array(m).fill(null).map(() => new Array(m).fill(-1)));
  
    // Call the recursive utility function to find the maximum chocolates
    return maxChocoUtil(0, 0, m - 1, n, m, grid, dp);
  }
  
  function main() {
    const matrix = [
      [2, 3, 1, 2],
      [3, 4, 2, 2],
      [5, 6, 3, 5]
    ];
  
    const n = matrix.length;
    const m = matrix[0].length;
  
    console.log(maximumChocolates(n, m, matrix));
  }
  
  // Call the main function to execute the code
  main();
  
  