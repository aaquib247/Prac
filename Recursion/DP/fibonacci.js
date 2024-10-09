// Top Down (memoization)
// T - O(N) and S - O(N)
function fibonacci(n, dp = []) {
    if (n <= 1) return n;
    
    // Initialize the memoization array with -1
    if (dp.length === 0) {
        dp = Array(n + 1).fill(-1);
    }
    
    if (dp[n] !== -1) return dp[n];
    
    dp[n] = fibonacci(n - 1, dp) + fibonacci(n - 2, dp);
    return dp[n];
}

// Example usage:
const n = 3;
console.log(fibonacci(n)); // Output: 5

//----------------------------------------------------------
//Bottom UP - Tabulation
// T - O(N) and S - O(N)
function fibonacci(n) {
    if (n <= 1) return n;

    // Initialize the dp array with base cases
    const dp = new Array(n + 1).fill(0);
    dp[0] = 0;
    dp[1] = 1;

    // Fill the dp array using bottom-up approach
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

// Example usage:
const m = 5;
console.log(fibonacci(m)); // Output: 5

//-----------------------------------------------------------
//space optimization in tabulation
//T - O(N) and S - O(1)
function fibonacci(n) {
    if (n <= 1) return n; // Handle base cases directly

    let prev2 = 0; // Fibonacci(0)
    let prev = 1;  // Fibonacci(1)

    for (let i = 2; i <= n; i++) {
        const cur_i = prev2 + prev; // Current Fibonacci number
        prev2 = prev;  // Move forward
        prev = cur_i;  // Update previous values
    }

    return prev; // The nth Fibonacci number
}

// Example usage:
const k = 5;
console.log(fibonacci(k)); // Output: 5




