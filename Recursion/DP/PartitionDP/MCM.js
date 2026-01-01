//Given an array arr[] of size n that represents the dimensions of matrices such that the i-th matrix has dimensions arr[i-1] x arr[i], 
//your task is to find the minimum number of scalar multiplications needed to multiply the matrices.

// arr = [40, 20, 30, 10, 30] represents 4 matrices:
// A1: 40x20
// A2: 20x30
// A3: 30x10
// A4: 10x30
// The function solve(i, j) computes the minimum cost to multiply matrices Ai...Aj.
// We try every possible k from i to j - 1, and recursively compute:

//Time: O(n^3) — due to 2D memo table and the loop from i to j.
// Space: O(n^2) — for memoization table dp.

function matrixChainMultiplication(arr) {
    const n = arr.length;
    const dp = Array.from({ length: n }, () => Array(n).fill(-1));

    function solve(i, j) {
        if (i === j) return 0;

        if (dp[i][j] !== -1) return dp[i][j];

        let min = Infinity;
        for (let k = i; k < j; k++) {
            const cost = solve(i, k) + solve(k + 1, j) + arr[i - 1] * arr[k] * arr[j];
            min = Math.min(min, cost);
        }

        dp[i][j] = min;
        return dp[i][j];
    }

    // We start from matrix 1 to n-1
    return solve(1, n - 1);
}

// 🧪 Test
const arr = [10,30,5,60];
// const arr = [40, 20, 30, 10, 30];
console.log("Minimum multiplications needed:", matrixChainMultiplication(arr)); 
// Output: 26000

