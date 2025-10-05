
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
function climbStairs(n, memo = {}) {
    // Base cases
    if (n === 0 || n === 1) {
        return 1;
    }

    // Check if the result is already computed
    if (n in memo) {
        return memo[n];
    }

    // Recursively compute and store the result in memo
    memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);

    // Return the computed value
    return memo[n];
}

// Example usage:
let n = 5;
let result = climbStairs(n);
console.log(result);  // Output: 8


//tabulation and then space optimization
// TC - O(N) and SC - O(n)
var climbStairs = function(n) {
    if (n === 0) return 1; // One way to stay on the ground
    if (n === 1) return 1; // One way to climb one stair

    // Create an array to store the number of ways to reach each step
    let prev = 1
    let prev2 = 1

    // Fill the dp array
    for (let i = 2; i <= n; i++) {
       let curr =  prev + prev2; // The number of ways to reach step i
       prev2 = prev;
       prev = curr;
    }

    return prev; // The result is in dp[n]
};


//FollowUp
//https://leetcode.com/problems/min-cost-climbing-stairs/
var minCostClimbingStairs = function (cost) {

    function steps(i) {

        if (i < 0) return 0;

    // Base case: If we're at the first step or second step, return the cost of that step
        if (i === 0 || i === 1) return cost[i];

        // Recursively calculate the minimum cost to reach step i
        let one = steps(i - 1) + cost[i];  // Moving from i-1
        let two = steps(i - 2) + cost[i];  // Moving from i-2

        return Math.min(one, two)
    }

    return Math.min(steps(cost.length - 1), steps(cost.length - 2))

};

//-----
var minCostClimbingStairs = function (cost) {

    const dp = new Array(cost.length).fill(-1);

    function steps(i) {

        if (i < 0) return 0;

    // Base case: If we're at the first step or second step, return the cost of that step
        if (i === 0 || i === 1) return cost[i];
        if(dp[i] != -1) return dp[i]

        // Recursively calculate the minimum cost to reach step i
        let one = steps(i - 1) + cost[i];  // Moving from i-1
        let two = steps(i - 2) + cost[i];  // Moving from i-2

        return dp[i] = Math.min(one, two)
    }

    return Math.min(steps(cost.length - 1), steps(cost.length - 2))

};