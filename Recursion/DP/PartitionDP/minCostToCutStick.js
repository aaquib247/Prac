// You added 0 and n to the cuts array to mark boundaries.
// You sort the cuts to ensure left-to-right processing.
// You call solve(1, cuts.length - 2) so that valid cuts are inside the stick.
// You calculate the cost as cuts[j+1] - cuts[i-1].
//TC is O(N^3) and SC is O(N^2) for DP array
var minCost = function(n, cuts) {
    cuts.push(0);
    cuts.push(n);
    cuts.sort((a, b) => a - b);

    const m = cuts.length;
    const dp = Array.from({ length: m }, () => Array(m).fill(-1));

    function solve(i, j) {
        // Base case: no cuts to make between i and j
        if (i > j) return 0;

        if (dp[i][j] !== -1) return dp[i][j];

        let minCost = Infinity;

        for (let k = i; k <= j; k++) {
            const cost = 
                cuts[j + 1] - cuts[i - 1] +
                solve(i, k - 1) +
                solve(k + 1, j);
            minCost = Math.min(minCost, cost);
        }

        return dp[i][j] = minCost;
    }

    return solve(1, cuts.length - 2); // call from 1 to m-2
};

const n = 7;
const cuts = [1, 3, 4, 5];

console.log(minCost(n, cuts)); // Output: 16

// Solution class to compute minimum cost to cut a stick using tabulation (bottom-up DP)
class Solution {
    // Function to calculate minimum total cost to cut the stick using tabulation
    minimumCost(n, cuts) {
        // Add the two ends of the stick to the cuts array
        cuts.push(n);
        cuts.unshift(0);
        cuts.sort((a, b) => a - b);

        const c = cuts.length - 2; // number of cuts excluding ends

        // Create DP table initialized with 0
        const dp = Array.from({ length: c + 2 }, () => Array(c + 2).fill(0));

        // Fill DP table for all segments
        for (let i = c; i >= 1; i--) {
            for (let j = i; j <= c; j++) {
                let mini = Number.MAX_SAFE_INTEGER;

                // Try making a cut at every position between i and j
                for (let ind = i; ind <= j; ind++) {
                    // Cost of current cut plus left and right subproblems
                    let ans = cuts[j + 1] - cuts[i - 1] + dp[i][ind - 1] + dp[ind + 1][j];

                    // Update minimum cost
                    mini = Math.min(mini, ans);
                }

                // Store minimum cost in DP table
                dp[i][j] = mini;
            }
        }

        // Return minimum cost to cut between indices 1 and c
        return dp[1][c];
    }
}

// Main execution
// const cuts = [3, 5, 1, 4];
// const n = 7;
// const sol = new Solution();

// console.log("The minimum cost incurred is:", sol.minimumCost(n, cuts));

