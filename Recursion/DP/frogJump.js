//https://www.naukri.com/code360/problems/frog-jump_3621012?utm_source=striver&utm_medium=website&utm_campaign=a_zcoursetuf
// Normal 
var frog = function (height, n) {
    function min(n) {
        // Base case: if the frog is on the first step, no energy is lost
        if (n === 0) {
            return 0;
        }

        // Calculate the energy lost for jumping from the (n-1)th stair
        const jumpOne = min(n - 1) + Math.abs(height[n] - height[n - 1]);

        // Calculate the energy lost for jumping from the (n-2)th stair
        let jumpTwo = Infinity; // Initialize jumpTwo to handle the case when n=1
        if (n > 1) {
            jumpTwo = min(n - 2) + Math.abs(height[n] - height[n - 2]);
        }

        // Return the minimum energy required
        return Math.min(jumpOne, jumpTwo);
    }

    return min(n - 1); // Start from the last stair
};

// Example usage
console.log(frog([10, 20, 30, 10], 4)); // Output: 20
console.log(frog([10, 50, 10], 3)); // Output: 0

// Momoization
var frogMemoization = function (height, n) {
    const memo = new Array(n).fill(undefined); // Memoization array

    function min(n) {
        // Base case: if the frog is on the first step, no energy is lost
        if (n === 0) return 0;

        // Check if the result is already cached
        if (memo[n] !== undefined) return memo[n];

        // Calculate energy lost when jumping from (n-1)th stair
        const jumpOne = min(n - 1) + Math.abs(height[n] - height[n - 1]);

        // Calculate energy lost when jumping from (n-2)th stair
        let jumpTwo = Infinity;
        if (n > 1) {
            jumpTwo = min(n - 2) + Math.abs(height[n] - height[n - 2]);
        }

        // Store the result in the memoization array
        memo[n] = Math.min(jumpOne, jumpTwo);
        return memo[n];
    }

    return min(n - 1); // Start from the last stair
};

//Tabulation
var frogTabulation = function (height, n) {
    const dp = new Array(n).fill(0); // DP array to store minimum energy

    // Base case: energy at the first step is 0
    dp[0] = 0;

    // Fill the dp array
    for (let i = 1; i < n; i++) {
        // Energy lost when jumping from (i-1)th stair
        const jumpOne = dp[i - 1] + Math.abs(height[i] - height[i - 1]);

        // Energy lost when jumping from (i-2)th stair
        let jumpTwo = Infinity;
        if (i > 1) {
            jumpTwo = dp[i - 2] + Math.abs(height[i] - height[i - 2]);
        }

        // Store the minimum energy required to reach the ith stair
        dp[i] = Math.min(jumpOne, jumpTwo);
    }

    return dp[n - 1]; // Minimum energy to reach the last stair
};


//space
function main() {
    const height = [30, 10, 60, 10, 60, 50];
    const n = height.length;
  
    // Base case: energy at the first step is 0
    if (n === 1) {
      console.log(0);
      return;
    }
  
    let prev = 0;   // Energy to reach the first stair (step 0)
    let prev2 = 0;  // Energy to reach the second stair
  
    for (let i = 1; i < n; i++) {
      let jumpOne = prev + Math.abs(height[i] - height[i - 1]); // Jump from (i-1) to i
      let jumpTwo = Infinity; // Initialize jumpTwo for the case where i > 1
  
      if (i > 1) {
        jumpTwo = prev2 + Math.abs(height[i] - height[i - 2]); // Jump from (i-2) to i
      }
  
      // Current energy required to reach the ith stair
      let cur_i = Math.min(jumpOne, jumpTwo);
      prev2 = prev; // Update prev2 to be the previous stair energy
      prev = cur_i; // Update prev to be the current stair energy
    }
  
    console.log(prev); // Minimum energy to reach the last stair
  }
  
  main(); // Example usage


  //followup -- now frog can jump k steps (previously it was n+1 and n+2)
  //https://www.naukri.com/code360/problems/minimal-cost_8180930?utm_source=striver&utm_medium=website&utm_campaign=a_zcoursetuf
  //Time Complexity: O(N *K) and SC - O(N)
  
function solveUtil(ind, height, dp, k) {
    // Base case: If we are at the beginning (index 0), no cost is needed.
    if (ind === 0) return 0;
    // If the result for this index has been previously calculated, return it.
    if (dp[ind] !== -1) return dp[ind];
  
    let mmSteps = Infinity;
  
    // Loop to try all possible jumps from '1' to 'k'
    for (let j = 1; j <= k; j++) {
      // Ensure that we do not jump beyond the beginning of the array
      if (ind - j >= 0) {
        // Calculate the cost for this jump and update mmSteps with the minimum cost
        const jump =
          solveUtil(ind - j, height, dp, k) + Math.abs(height[ind] - height[ind - j]);
        mmSteps = Math.min(jump, mmSteps);
      }
    }
    // Store the minimum cost for this index in the dp array and return it.
    dp[ind] = mmSteps;
    return dp[ind];
  }
  
  function solve(n, height, k) {
    const dp = Array(n).fill(-1); // Initialize a memoization array to store calculated results
    return solveUtil(n - 1, height, dp, k); // Start the recursion from the last index
  }
  
  const height = [30, 10, 60, 10, 60, 50];
  const n = height.length;
  const k = 2;
  const dp = Array(n).fill(-1); // Initialize a memoization array for the main function
  console.log(solve(n, height, k)); // Print the result of the solve function

  //Tabulation
  
// Define the solveUtil function to calculate the minimum steps required
function solveUtil(n, height, dp, k) {
    // Initialize the first element in dp to 0
    dp[0] = 0;
  
    // Loop through the height array from index 1 to n-1
    for (let i = 1; i < n; i++) {
      // Initialize mmSteps to a large value
      let mmSteps = Infinity;
  
      // Loop through the last k elements (backward jumps)
      for (let j = 1; j <= k; j++) {
        // Check if it's possible to jump to the previous element
        if (i - j >= 0) {
          // Calculate the cost of the jump and update mmSteps with the minimum cost
          const jump = dp[i - j] + Math.abs(height[i] - height[i - j]);
          mmSteps = Math.min(jump, mmSteps);
        }
      }
  
      // Store the minimum cost in dp for the current index
      dp[i] = mmSteps;
    }
  
    // Return the minimum cost to reach the last element
    return dp[n - 1];
  }
  
  // Define the solve function to initialize dp and call solveUtil
  function solve(n, height, k) {
    // Initialize the dp array with -1
    const dp = new Array(n).fill(-1);
  
    // Call solveUtil to calculate the minimum cost
    return solveUtil(n, height, dp, k);
  }
  
  // Main function
  function main() {
    // Input height array
    const height = [30, 10, 60, 10, 60, 50];
  
    // Calculate the length of the height array
    const n = height.length;
  
    // Set the maximum allowed jumps (k)
    const k = 2;
  
    // Initialize the dp array with -1
    const dp = new Array(n).fill(-1);
  
    // Call the solve function and print the result
    console.log(solve(n, height, k));
  }
  
  // Call the main function to start the program
  main();
  
  
  
  
  




