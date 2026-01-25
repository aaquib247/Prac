var palindromePartitioning = function(str) {
    const n = str.length;
    const dp = new Array(n).fill(-1);

    // Helper function to check if a substring is a palindrome
    function isPalindrome(start, end) {
        while (start < end) {
            if (str[start] !== str[end]) return false;
            start++;
            end--;
        }
        return true;
    }

    // Main recursive function
    function f(start) {
        if (start === n) return 0;  // If we've reached the end of the string
        if (dp[start] !== -1) return dp[start];  // Return already computed value

        let minCost = Infinity;
        for (let end = start; end < n; end++) {
            if (isPalindrome(start, end)) {
                const cost = 1 + f(end + 1);  // Cost for the substring and recurse for the rest
                minCost = Math.min(minCost, cost);
            }
        }

        dp[start] = minCost;  // Store the result for the current start index
        return dp[start];
    }

    return f(0) - 1;  // Subtract 1 to get the number of cuts, not partitions
};
//partition is 2 but the cuts required is 1 because we need to make only one cut to get two palindromic substrings


// 🧪 Test
// const str = "BABABCBADCEDE";
const str = "aab";
console.log("The minimum number of partitions:", palindromePartitioning(str));
//TC    is O(N^2) and SC is O(N)
