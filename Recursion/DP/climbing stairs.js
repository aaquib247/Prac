
/*
How to Identify a DP problem?

When we see a problem, it is very important to identify it as a dynamic programming problem. Generally (but not limited to) if the problem statement asks for the following:

Count the total number of ways
Given multiple ways of doing a task, which way will give the minimum or the maximum output.
We can try to apply recursion. Once we get the recursive solution, we can go ahead to convert it to a dynamic programming one.

Steps To Solve The Problem After Identification

Once the problem has been identified, the following three steps comes handy in solving the problem:

Try to represent the problem in terms of indexes.
Try all possible choices/ways at every index according to the problem statement.
If the question states
Count all the ways - return sum of all choices/ways.
Find maximum/minimum- return the choice/way with maximum/minimum output.
*/



// My sol: - Correct but TLE Error
var climbStairs = function (n) {
    if (n === 0)
        return 1;

    let stepsWays = 0;

    function climb(n) {

        if (n === 0) {
            stepsWays = stepsWays + 1;
            return;
        }
        if(n < 0) return ;
        climb(n - 1)
        climb(n - 2)
    }

    climb(n);
    return stepsWays;
};

// use fibo code.
//tabulation and space optimization can be done same way.
var climbStairs = function(n) {
    if (n === 0) return 1; // One way to stay on the ground
    if (n === 1) return 1; // One way to climb one stair

    // Create an array to store the number of ways to reach each step
    const dp = new Array(n + 1);
    dp[0] = 1; // One way to stay on the ground
    dp[1] = 1; // One way to reach the first step

    // Fill the dp array
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]; // The number of ways to reach step i
    }

    return dp[n]; // The result is in dp[n]
};

//Memoization
var climbStairs = function(n) {
    const memo = {}; // Cache to store results of subproblems

    function climb(n) {
        if (n in memo) return memo[n]; // Return cached result if available
        if (n === 0) return 1; // One way to stay on the ground
        if (n === 1) return 1; // One way to reach the first step

        // Calculate the number of ways to climb from the current step
        memo[n] = climb(n - 1) + climb(n - 2);
        return memo[n];
    }

    return climb(n); // Start climbing from n
};

// Example usage
console.log(climbStairs(5)); // Output: 8
