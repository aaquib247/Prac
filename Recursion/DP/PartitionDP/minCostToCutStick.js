// You added 0 and n to the cuts array to mark boundaries.
// You sort the cuts to ensure left-to-right processing.
// You call solve(1, cuts.length - 2) so that valid cuts are inside the stick.
// You calculate the cost as cuts[j+1] - cuts[i-1].

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
