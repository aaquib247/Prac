function palindromePartitioning(str) {
    const n = str.length;
    const dp = new Array(n).fill(-1);

    // Helper function to check if a substring is a palindrome
    function isPalindrome(i, j) {
        while (i < j) {
            if (str[i] !== str[j]) return false;
            i++;
            j--;
        }
        return true;
    }

    // Main recursive function
    function f(i) {
        if (i === n) return 0;
        if (dp[i] !== -1) return dp[i];

        let minCost = Infinity;
        for (let j = i; j < n; j++) {
            if (isPalindrome(i, j)) {
                const cost = 1 + f(j + 1);
                minCost = Math.min(minCost, cost);
            }
        }

        dp[i] = minCost;
        return dp[i];
    }

    return f(0) - 1;
}

// 🧪 Test
// const str = "BABABCBADCEDE";
const str = "aab";
console.log("The minimum number of partitions:", palindromePartitioning(str));
