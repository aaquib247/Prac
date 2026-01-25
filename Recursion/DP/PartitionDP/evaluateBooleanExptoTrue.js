// Define the expression globally
const exp = "F|T^F";  // Example expression

function f(i, j, isTrue) {
    // Base case 1: If i > j, it's an invalid expression, return 0
    if (i > j) return 0;

    // Base case 2: If i and j are the same, evaluate the single character
    if (i === j) {
        if (isTrue === 1) {
            return exp[i] === 'T' ? 1 : 0;
        } else {
            return exp[i] === 'F' ? 1 : 0;
        }
    }

    let ways = 0;

    // Iterate through the expression to divide it into left and right subexpressions
    for (let ind = i + 1; ind <= j - 1; ind += 2) {  // Only consider operators at odd indices
        let lT = f(i, ind - 1, 1);  // Number of ways to make the left expression true
        let lF = f(i, ind - 1, 0);  // Number of ways to make the left expression false
        let rT = f(ind + 1, j, 1);  // Number of ways to make the right expression true
        let rF = f(ind + 1, j, 0);  // Number of ways to make the right expression false

        // Check the operator at the current index and update ways accordingly
        if (exp[ind] === '&') {  // AND operator
            if (isTrue === 1) ways += lT * rT;
            else ways += lF * rT + lT * rF + lF * rF;
        } else if (exp[ind] === '|') {  // OR operator
            if (isTrue === 1) ways += lF * rT + lT * rF + lT * rT;
            else ways += lF * rF;
        } else {  // XOR operator
            if (isTrue === 1) ways += lF * rT + lT * rF;
            else ways += lF * rF + lT * rT;
        }
    }

    return ways;
}

// Function to start evaluating the expression
function evaluateExp() {
    const n = exp.length;
    return f(0, n - 1, 1);  // Start evaluation with isTrue set to true
}

// Driver code
const ways = evaluateExp();

// Output the result
console.log("The total number of ways:", ways);

//TC is exponential and SC is O(1)

//Memoized version
// Function to evaluate the number of ways to parenthesize the expression
function f(i, j, isTrue, exp, dp) {
    // Base case 1: If i > j, it's an invalid expression, return 0
    if (i > j) return 0;

    // Base case 2: If i and j are the same, evaluate the single character
    if (i === j) {
        if (isTrue === 1) {
            return exp[i] === 'T' ? 1 : 0;
        } else {
            return exp[i] === 'F' ? 1 : 0;
        }
    }

    // If the result for this subproblem has been computed before, return it
    if (dp[i][j][isTrue] !== -1) return dp[i][j][isTrue];
    
    let ways = 0;

    // Iterate through the expression to divide it into left and right subexpressions
    for (let ind = i + 1; ind <= j - 1; ind += 2) {
        // Recursively calculate the number of ways to make the left and right subexpressions true or false
        let lT = f(i, ind - 1, 1, exp, dp);  // Number of ways to make the left expression true
        let lF = f(i, ind - 1, 0, exp, dp);  // Number of ways to make the left expression false
        let rT = f(ind + 1, j, 1, exp, dp);  // Number of ways to make the right expression true
        let rF = f(ind + 1, j, 0, exp, dp);  // Number of ways to make the right expression false

        // Check the operator at the current index and update ways accordingly
        if (exp[ind] === '&') {  // AND operator
            if (isTrue === 1) ways += lT * rT;
            else ways += lF * rT + lT * rF + lF * rF;
        } else if (exp[ind] === '|') {  // OR operator
            if (isTrue === 1) ways += lF * rT + lT * rF + lT * rT;
            else ways += lF * rF;
        } else {  // XOR operator
            if (isTrue === 1) ways += lF * rT + lT * rF;
            else ways += lF * rF + lT * rT;
        }
    }

    dp[i][j][isTrue] = ways % 1000000007;  // Store the result in the DP table
    return dp[i][j][isTrue];
}

// Function to start evaluating the expression
function evaluateExp(exp) {
    const n = exp.length;
    const dp = Array.from({ length: n }, () => Array.from({ length: n }, () => [-1, -1]));  // DP table initialization
    return f(0, n - 1, 1, exp, dp);  // Start evaluation with isTrue set to true
}

//TC is O(N^3) and SC is O(N^2) for DP array

// Driver code
// const exp = "F|T^F";  // Example expression

// // Evaluate the expression and find the number of ways to get the result as True
// const ways = evaluateExp(exp);

// // Output the result
// console.log("The total number of ways:", ways);
