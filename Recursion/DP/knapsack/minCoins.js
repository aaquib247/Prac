//https://leetcode.com/problems/coin-change/
//TC - >>>>>>>>>> O(2^N) line 15 and SC - >>>>>>O(N)
var coinChange = function (coins, amount) {
    function findMin(i, target) {
        if (i === 0) {
            if (target % coins[0] === 0)
                return target / coins[0]
            else
                return Infinity;
        }

        let nT = 0 + findMin(i - 1, target);
        let T = Infinity;
        if (coins[i] <= target)
            T = 1 + findMin(i, target - coins[i])
        return Math.min(nT, T)

    }
    const ans = findMin(coins.length - 1, amount)
    if (ans === Infinity) return -1;
    return ans;
};
console.log(coinChange([1,2,5],11))

//DP - Memoization
//TC - O(N*Target) and SC - O(N*Target) + O(N)
var coinChange = function (coins, amount) {
    let dp = Array.from({length:coins.length},()=> Array(amount+1).fill(-1))

    function findMin(i, target) {

        if (i === 0) {
            if (target % coins[0] === 0)
                return target / coins[0]
            else
                return Infinity;
        }
        if(dp[i][target] !== -1)
         return dp[i][target]

        let nT = 0 + findMin(i - 1, target);
        let T = Infinity;
        if (coins[i] <= target)
            T = 1 + findMin(i, target - coins[i])
        return dp[i][target] = Math.min(nT, T)

    }
    const ans = findMin(coins.length - 1, amount)
     if (ans === Infinity) return -1;
    return ans;
};

//Tabulation
//TC - O(N*Target) and SC - O(N*Target)
function minimumElements(arr, T) {
    const n = arr.length;
    
    // Create a 2D array to store dynamic programming results, initialized with 0
    const dp = Array.from({ length: n }, () => Array(T + 1).fill(0));
    
    // Initialize the first row of the dp table
    for (let i = 0; i <= T; i++) {
        if (i % arr[0] === 0)  
            dp[0][i] = i / arr[0];
        else
            dp[0][i] = Infinity; // Use Infinity to represent an impossible case
    }
    
    // Populate the dp table using a nested loop
    for (let ind = 1; ind < n; ind++) {
        for (let target = 0; target <= T; target++) {
            
            const notTake = 0 + dp[ind - 1][target];
            let take = Infinity;
            
            // If the current element is less than or equal to 'target', consider taking it
            if (arr[ind] <= target)
                take = 1 + dp[ind][target - arr[ind]];
                
             dp[ind][target] = Math.min(notTake, take);
        }
    }
    
    const ans = dp[n - 1][T];
    
    // If it's impossible to reach the target, return -1
    if (ans === Infinity) return -1;
    
    return ans;
}

// Main function
function main() {
    const arr = [1, 2, 3];
    const T = 7;
    
    // Call the minimumElements function and print the result
    console.log("The minimum number of elements required to form the target sum is " + minimumElements(arr, T));
}

// Call the main function to start the program
main();

