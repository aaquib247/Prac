//Question: Egg Dropping Problem - Find minimum number of attempts needed in worst case with k eggs and n floors
//Recursive solution

//Intuition: We drop an egg from each floor and calculate the worst-case number of drops needed in both scenarios (egg breaks or doesn't break). 
// We take the maximum of these two scenarios and add one for the current drop. 
//why max? Because we are interested in the worst-case scenario.
// We repeat this for all floors and take the minimum of these maximums to find the optimal solution.

function eggDrop(egg, n) {
    // Base case: If there's only one egg, we need to try all floors.
    if (k === 1) {
        return n;
    }
    
    // Base case: If there are no floors or one floor, we need 0 or 1 drops.
    if (n === 0 || n === 1) {
        return n;
    }

    let minAttempts = Number.MAX_VALUE;

    // Try dropping the egg from each floor and compute the worst-case number of drops
    for (let x = 1; x <= n; x++) {
        const result = Math.max(eggDrop(egg - 1, x - 1), eggDrop(egg, n - x)) + 1;

        // Keep track of the minimum number of attempts in the worst case
        minAttempts = Math.min(minAttempts, result);
    }

    return minAttempts;
}

// Example usage:
const k = 2; // Number of eggs
const n = 10; // Number of floors
console.log(`Minimum number of attempts in the worst case: ${eggDrop(k, n)}`);

//Memoization version
function eggDrop(eggs, floors) {
    // Create a DP table for memoization
    let dp = Array(eggs + 1).fill().map(() => Array(floors + 1).fill(-1));

    // Helper function to calculate the minimum drops using memoization
    function dpMemo(eggs, floors) {
        // Base cases
        if (floors === 0) return 0;  // No floors, no drops
        if (floors === 1) return 1;  // One floor, one drop
        if (eggs === 1) return floors;  // With one egg, we have to try all floors

        // Check if result is already computed for this subproblem
        if (dp[eggs][floors] !== -1) return dp[eggs][floors];

        let minDrops = Number.MAX_VALUE;

        // Try dropping the egg from each floor
        for (let x = 1; x <= floors; x++) {
            // Max of the two cases (egg breaks or doesn't break)
            const result = Math.max(dpMemo(eggs - 1, x - 1), dpMemo(eggs, floors - x)) + 1;

            // Take the minimum of all the results
            minDrops = Math.min(minDrops, result);
        }

        // Store the result in the dp table for future reference
        dp[eggs][floors] = minDrops;

        return minDrops;
    }

    // Call the helper function to start the recursion
    return dpMemo(eggs, floors);
}

// Example usage:
const eggs = 2;  // Number of eggs
const floors = 10;  // Number of floors
console.log(`Minimum number of attempts in the worst case: ${eggDrop(eggs, floors)}`);
