//paint house problem using dp and recursion

var minCost = function(costs) {
    const n = costs.length;
    let dp = Array.from({ length: n }, () => new Array(4).fill(-1));

    function f(house, last) {
        // MEMO
        if (dp[house][last] !== -1) return dp[house][last];

        // BASE CASE (first house)
        if (house === 0) {
            let min = Infinity;
            for (let color = 0; color < 3; color++) {
                if (color !== last) {
                    min = Math.min(min, costs[0][color]);
                }
            }
            return dp[house][last] = min;
        }

        let mini = Infinity;
        for (let color = 0; color < 3; color++) {
            if (color !== last) {
                let paint =
                    costs[house][color] + f(house - 1, color);
                mini = Math.min(mini, paint);
            }
        }

        return dp[house][last] = mini;
    }

    return f(n - 1, 3);
};
// TC - O(N*4)*3 and SC - O(N)(houses)+O(N*4)

let costs = [
    [17, 2, 17],
    [16, 16, 5],
    [14, 3, 19]
];

console.log(minCost(costs)); // Output: 10

// paint house 2 problem using dp and recursion
var minCostII = function(costs) {
    const n = costs.length;
    const k = costs[0].length;

    // dp[house][lastColor]
    let dp = Array.from({ length: n }, () =>
        new Array(k + 1).fill(-1)
    );

    function f(house, last) {
        // MEMO
        if (dp[house][last] !== -1) return dp[house][last];

        // BASE CASE
        if (house === 0) {
            let min = Infinity;
            for (let color = 0; color < k; color++) {
                if (color !== last) {
                    min = Math.min(min, costs[0][color]);
                }
            }
            return dp[house][last] = min;
        }

        let mini = Infinity;

        for (let color = 0; color < k; color++) {
            if (color !== last) {
                let paint =
                    costs[house][color] + f(house - 1, color);
                mini = Math.min(mini, paint);
            }
        }

        return dp[house][last] = mini;
    }

    return f(n - 1, k);
};
// TC - O(N*K)*K and SC - O(N)(houses)+O(N*K)

//Paint house 3

/**
 * @param {number[]} houses
 * @param {number[][]} cost
 * @param {number} m
 * @param {number} n
 * @param {number} target
 * @return {number}
 */
var minCost = function(houses, cost, m, n, target) {
    const INF = 1_000_000_000;

    // Memoization cache: Map or 3D array
    // Since JS doesn't have built-in tuple-key cache like Python's @cache,
    // we'll use a 3D array for speed and simplicity
    // dp[pos][prev][groups]
    const dp = Array(m + 1)
        .fill()
        .map(() => Array(n + 2)           // prev: 0 = none, 1..n = colors
            .fill()
            .map(() => Array(target + 2).fill(-1)));  // groups: 0 to target+1

    /**
     * @param {number} pos       current house index
     * @param {number} prev      previous color (0 = no previous house)
     * @param {number} groups    number of neighborhoods so far
     * @returns {number}         min cost from this state onward
     */
    function dfs(pos, prev, groups) {
        if (pos === m) {
            return groups === target ? 0 : INF;
        }

        if (dp[pos][prev][groups] !== -1) {
            return dp[pos][prev][groups];
        }

        let ans = INF;

        // Case 1: House is already painted
        if (houses[pos] !== 0) {
            const color = houses[pos];
            const newGroups = groups + (color !== prev ? 1 : 0);

            if (newGroups <= target) {
                const sub = dfs(pos + 1, color, newGroups);
                if (sub < INF) {
                    ans = Math.min(ans, sub);
                }
            }
        }
        // Case 2: House is not painted → try every color
        else {
            for (let col = 1; col <= n; col++) {
                const newGroups = groups + (col !== prev ? 1 : 0);

                if (newGroups > target) continue;

                const paintCost = cost[pos][col - 1];
                const sub = dfs(pos + 1, col, newGroups);

                if (sub < INF) {
                    ans = Math.min(ans, paintCost + sub);
                }
            }
        }

        dp[pos][prev][groups] = ans;
        return ans;
    }

    // Start: position 0, no previous color (0), 0 neighborhoods yet
    const result = dfs(0, 0, 0);

    return result < INF ? result : -1;
};


//paint house 4
// Paint House III - LeetCode (Beautiful Houses)
// Constraints:
// 1. No two adjacent houses same color
// 2. Houses equidistant from ends can't have same color
//    Example: n=6 → (0,5), (1,4), (2,3) must have different colors

var minCost = function(n, cost) {
    // Key insight: Only paint HALF the houses (0 to n/2-1)
    // The other half mirrors our choices due to equidistant constraint
    
    const half = n / 2;
    
    // dp[house][lastColor][mirrorColor]
    // mirrorColor = color of the equidistant house from the other end
    let dp = Array.from({ length: half }, () => 
        Array.from({ length: 4 }, () => new Array(4).fill(-1))
    );
    
    function f(house, last, mirror) {
        // MEMO
        if (dp[house][last][mirror] !== -1) {
            return dp[house][last][mirror];
        }
        
        // BASE CASE - first house (index 0)
        // Its mirror is the last house (index n-1)
        if (house === 0) {
            let min = Infinity;
            for (let color = 0; color < 3; color++) {
                // color for house 0, try all colors for house n-1
                for (let mirrorColor = 0; mirrorColor < 3; mirrorColor++) {
                    // Constraint: equidistant houses can't have same color
                    if (color !== mirrorColor) {
                        let totalCost = cost[0][color] + cost[n - 1][mirrorColor];
                        min = Math.min(min, totalCost);
                    }
                }
            }
            return dp[house][last][mirror] = min;
        }
        
        let mini = Infinity;
        
        for (let color = 0; color < 3; color++) {
            // Current house position
            let currentPos = house;
            // Mirror house position
            let mirrorPos = n - 1 - house;
            
            for (let mirrorColor = 0; mirrorColor < 3; mirrorColor++) {
                // Check all constraints:
                // 1. Current house != previous house (adjacent constraint)
                if (color !== last) {
                    // 2. Mirror house != its previous (adjacent on other side)
                    if (mirrorColor !== mirror) {
                        // 3. Current != its mirror (equidistant constraint)
                        if (color !== mirrorColor) {
                            let paint = cost[currentPos][color] + 
                                       cost[mirrorPos][mirrorColor] + 
                                       f(house - 1, color, mirrorColor);
                            mini = Math.min(mini, paint);
                        }
                    }
                }
            }
        }
        
        return dp[house][last][mirror] = mini;
    }
    
    return f(half - 1, 3, 3);
};

// TC - O((N/2) * 3 * 3 * 3 * 3) = O(N) and SC - O(N/2) + O((N/2) * 4 * 4)

// Example 1
let cost1 = [[3,5,7],[6,2,9],[4,8,1],[7,3,5]];
console.log(minCost(4, cost1)); // Output: 9

// Example 2
let cost2 = [[2,4,6],[5,3,8],[7,1,9],[4,6,2],[3,5,7],[8,2,4]];
console.log(minCost(6, cost2)); // Output: 18