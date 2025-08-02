function longestCommonSubsequenceMemo(s1, s2) {
    const n = s1.length;
    const m = s2.length;

    // Create a memoization table initialized to -1 (indicating uncomputed states)
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(-1));

    // Define a recursive utility function to calculate the LCS length
    function lcsUtil(ind1, ind2) {
        // Base case: If either string has reached the end, the LCS length is 0
        if (ind1 < 0 || ind2 < 0) {
            return 0;
        }

        // If the result for this combination of indices has already been calculated, return it
        if (dp[ind1][ind2] !== -1) {
            return dp[ind1][ind2];
        }

        // If the characters match, increase the LCS length and move both indices
        if (s1[ind1] === s2[ind2]) {
            return (dp[ind1][ind2] = 1 + lcsUtil(ind1 - 1, ind2 - 1));
        } else {
            // If the characters don't match, consider two options: moving one index in either string
            return (dp[ind1][ind2] = Math.max(
                lcsUtil(ind1, ind2 - 1),
                lcsUtil(ind1 - 1, ind2)
            ));
        }
    }

    // Call the recursive utility function to calculate the LCS length
    return lcsUtil(n - 1, m - 1);
}

function shortestSupersequenceLength(s1, s2) {
    // Step 1: Compute the LCS length using memoization
    const lcsLength = longestCommonSubsequenceMemo(s1, s2);

    // Step 2: Compute the length of the shortest supersequence
    const scsLength = s1.length + s2.length - lcsLength;

    return scsLength;
}

// Main function to test the code
function main() {
    const s1 = "brute";
    const s2 = "groot";

    const s3 = "abcde";
    const s4 = "ace";
    
    const result = shortestSupersequenceLength(s1, s2);
    const result2 = shortestSupersequenceLength(s3, s4);
    console.log("The length of the Shortest Supersequence is: " + result2);
}

// Run the main function
main();


// //----------Print the shortest common supersequence-------------
// function longestCommonSubsequenceTab(s1, s2) {
//     const n = s1.length;
//     const m = s2.length;

//     // Create a DP table for storing LCS values
//     const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

//     // Fill the DP table for LCS calculation
//     for (let i = 1; i <= n; i++) {
//         for (let j = 1; j <= m; j++) {
//             if (s1[i - 1] === s2[j - 1]) {
//                 dp[i][j] = dp[i - 1][j - 1] + 1;
//             } else {
//                 dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
//             }
//         }
//     }

//     return dp;
// }

// function shortestCommonSupersequence(s1, s2) {
//     const n = s1.length;
//     const m = s2.length;

//     // Step 1: Compute the LCS table using tabulation
//     const dp = longestCommonSubsequenceTab(s1, s2);

//     // Step 2: Construct the Shortest Common Supersequence by backtracking
//     let i = n, j = m;
//     let scs = "";

//     while (i > 0 && j > 0) {
//         if (s1[i - 1] === s2[j - 1]) {
//             scs = s1[i - 1] + scs;  // If characters match, add to the result
//             i--;
//             j--;
//         } else if (dp[i - 1][j] > dp[i][j - 1]) {
//             scs = s1[i - 1] + scs;  // If LCS from top is greater, add from s1
//             i--;
//         } else {
//             scs = s2[j - 1] + scs;  // If LCS from left is greater, add from s2
//             j--;
//         }
//     }

//     // Add remaining characters (if any)
//     while (i > 0) {
//         scs = s1[i - 1] + scs;
//         i--;
//     }
//     while (j > 0) {
//         scs = s2[j - 1] + scs;
//         j--;
//     }

//     return scs;
// }

// // Main function to test the code
// function main() {
//     const s1 = "brute";
//     const s2 = "groot";
    
//     const result = shortestCommonSupersequence(s1, s2);
//     console.log("The Shortest Common Supersequence is: " + result);
// }

// // Run the main function
// main();
