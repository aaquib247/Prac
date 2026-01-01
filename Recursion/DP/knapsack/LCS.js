// TC - O(N*M) and SC - O(N*M) for memoization and without memoization it has TC - Exponential
// LCS - Longest Common Subsequence
function lcs(s1, s2) {
    const n = s1.length;
    const m = s2.length;

    // Create a 2D array 'dp' to store dynamic programming results, initialized with -1
    const dp = Array.from({ length: n }, () => Array(m).fill(-1));

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

// Main function
function main() {
    const s1 = "acd";
    const s2 = "ced";

    // Call the lcs function and print the result
    console.log("The Length of Longest Common Subsequence is " + lcs(s1, s2));
}

// Call the main function to start the program
main();

//--------------
// In the recursive logic, we set the base case to if(ind1<0 || ind2<0) but we can’t set the dp array’s index to -1. 
// Therefore a hack for this issue is to shift every index by 1 towards the right.
// Therefore, now the base case will be if(ind1==0 || ind2==0).
// Similarly, we will implement the recursive code by keeping in mind the shifting of indexes, therefore S1[ind1] will be converted to S1[ind1-1]. Same for others.
// At last we will print dp[N][M] as our answer.
function lcs(s1, s2) {
    const n = s1.length;
    const m = s2.length;

    // Create a 2D array 'dp' to store dynamic programming results, initialized with -1
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(-1));

    // Initialize the base conditions for empty substrings
    for (let i = 0; i <= n; i++) {
        dp[i][0] = 0;
    }
    for (let i = 0; i <= m; i++) {
        dp[0][i] = 0;
    }

    // Populating the 'dp' array using nested loops
    for (let ind1 = 1; ind1 <= n; ind1++) {
        for (let ind2 = 1; ind2 <= m; ind2++) {
            if (s1[ind1 - 1] === s2[ind2 - 1]) {
                dp[ind1][ind2] = 1 + dp[ind1 - 1][ind2 - 1];
            } else {
                dp[ind1][ind2] = Math.max(dp[ind1 - 1][ind2], dp[ind1][ind2 - 1]);
            }
        }
    }

    // The result is stored in the bottom-right cell of the 'dp' array
    return dp[n][m];
}

// Main function
function main() {
    const s1 = "acd";
    const s2 = "ced";

    // Call the lcs function and print the result
    console.log("The Length of Longest Common Subsequence is " + lcs(s1, s2));
}

// Call the main function to start the program
main();

//////
// print LCS
// Time Complexity (TC) = O(n * m), where n and m are the lengths of the two input strings.
// Space Complexity (SC) = O(n * m), due to the 2D DP table.
function lcs(s1, s2) {
    const n = s1.length;
    const m = s2.length;

    // Create a 2D array 'dp' to store dynamic programming results, initialized with -1
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

    // Populating the 'dp' array using nested loops
    for (let ind1 = 1; ind1 <= n; ind1++) {
        for (let ind2 = 1; ind2 <= m; ind2++) {
            if (s1[ind1 - 1] === s2[ind2 - 1]) {
                dp[ind1][ind2] = 1 + dp[ind1 - 1][ind2 - 1];
            } else {
                dp[ind1][ind2] = Math.max(dp[ind1 - 1][ind2], dp[ind1][ind2 - 1]);
            }
        }
    }

    // Reconstruct the LCS string from the dp table
    let lcsString = '';
    let i = n;
    let j = m;

    while (i > 0 && j > 0) {
        if (s1[i - 1] === s2[j - 1]) {
            lcsString = s1[i - 1] + lcsString;  // Add character to the result
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    return lcsString; // Return the LCS string
}

// Main function
function main() {
    const s1 = "acd";
    const s2 = "ced";

    // Call the lcs function and print the result - output: "cd"
    const result = lcs(s1, s2);
    console.log("The Longest Common Subsequence is: " + result);
}

// Call the main function to start the program
main();

//-------------------------------------
//Longest Common Substring 

function lcsub(s1, s2) {
    const n = s1.length;
    const m = s2.length;

    // Create a 2D array 'dp' to store dynamic programming results, initialized with 0
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

    // Initialize a variable 'ans' to store the length of the longest common substring
    let ans = 0;

    // Use nested loops to iterate through the characters of both strings
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            // If the characters match, update 'dp' and 'ans'
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
                ans = Math.max(ans, dp[i][j]);
            } else {
                // If characters don't match, set 'dp' to 0 for the current position
                dp[i][j] = 0;
            }
        }
    }

    // 'ans' now contains the length of the longest common substring
    return ans;
}

// Main function
function main() {
    const s1 = "abcjklp";
    const s2 = "acjkp";

    // Call the lcs function and print the result -  output: 3
    console.log("The Length of Longest Common Substring is " + lcsub(s1, s2));
}

// Call the main function to start the program
main();

//Print Longest Common Substring 

function lcsubprint(s1, s2) {
    const n = s1.length;
    const m = s2.length;

    // Create a 2D array 'dp' to store dynamic programming results, initialized with 0
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

    // Initialize a variable 'ans' to store the length of the longest common substring
    let ans = 0;
    let endIdx = 0;  // This will store the index of the end of the substring in s1

    // Use nested loops to iterate through the characters of both strings
for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
        if (s1[i - 1] === s2[j - 1]) {
            dp[i][j] = 1 + dp[i - 1][j - 1];
            ans = Math.max(ans, dp[i][j]);
            if (dp[i][j] === ans) endIdx = i;  // track end index
        } else {
            dp[i][j] = 0;
        }
    }
}

    // Reconstruct the longest common substring from the dp table
    let longestCommonSubstring = s1.slice(endIdx - ans, endIdx);

    return longestCommonSubstring; // Return the LCS string
}

// Main function
function main() {
    const s1 = "abcjklp";
    const s2 = "acjkp";

    // Call the lcsubprint function and print the result
    console.log("The Longest Common Substring is: " + lcsubprint(s1, s2));
}

// Call the main function to start the program
main();

// Longest Palindromic Subsequence
function lcs(s1, s2) {
    // Get the lengths of the input strings
    const n = s1.length;
    const m = s2.length;

    // Create a 2D array to store the dynamic programming values
    const dp = new Array(n + 1).fill(null).map(() => new Array(m + 1).fill(-1));

    // Initialize the first row and first column with 0
    for (let i = 0; i <= n; i++) {
        dp[i][0] = 0;
    }
    for (let i = 0; i <= m; i++) {
        dp[0][i] = 0;
    }

    // Fill the dp array using dynamic programming
    for (let ind1 = 1; ind1 <= n; ind1++) {
        for (let ind2 = 1; ind2 <= m; ind2++) {
            if (s1[ind1 - 1] === s2[ind2 - 1]) {
                dp[ind1][ind2] = 1 + dp[ind1 - 1][ind2 - 1];
            } else {
                dp[ind1][ind2] = Math.max(dp[ind1 - 1][ind2], dp[ind1][ind2 - 1]);
            }
        }
    }

    // Return the length of the LCS
    return dp[n][m];
}

// Function to find the length of the Longest Palindromic Subsequence of a string
function longestPalindromeSubsequence(s) {
    // Create a copy of the input string and reverse it
    const t = s.split('').reverse().join('');

    // Find the LCS between the original and reversed strings
    return lcs(s, t);
}

// Main function
function main() {
    const s = "bbabcbcab";
    //other easy example: "agbcba" output: 5

    // Call the longestPalindromeSubsequence function and print the result
    console.log("The Length of Longest Palindromic Subsequence is " + longestPalindromeSubsequence(s));
}

//Print Longest Palindromic Subsequence
// Call the main function to start the program
main();

function lcs(s1, s2) {
    const n = s1.length;
    const m = s2.length;

    // Create a 2D array to store the dynamic programming values
    const dp = new Array(n + 1).fill(null).map(() => new Array(m + 1).fill(0));

    // Fill the dp array using dynamic programming
    for (let ind1 = 1; ind1 <= n; ind1++) {
        for (let ind2 = 1; ind2 <= m; ind2++) {
            if (s1[ind1 - 1] === s2[ind2 - 1]) {
                dp[ind1][ind2] = 1 + dp[ind1 - 1][ind2 - 1];
            } else {
                dp[ind1][ind2] = Math.max(dp[ind1 - 1][ind2], dp[ind1][ind2 - 1]);
            }
        }
    }

    return dp;
}

// Function to find the Longest Palindromic Subsequence between two strings
function longestPalindromeSubsequence(s1, s2) {
    // Reverse the second string to compare against the first string
    const t = s2.split('').reverse().join('');
    const dp = lcs(s1, t);  // Get the dp table from LCS between s1 and the reverse of s2

    // Reconstruct the Longest Palindromic Subsequence from the dp table
    let i = s1.length;
    let j = t.length;
    let lps = '';

    while (i > 0 && j > 0) {
        if (s1[i - 1] === t[j - 1]) {
            lps = s1[i - 1] + lps;  // Add the character to the result
            i--;
            j--;
        } else if (dp[i - 1][j] >= dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    return lps;  // Return the longest palindromic subsequence
}

// Main function
function main() {
    const s1 = "bbabcbcab";  // First string
    const s2 = "abcbab";     // Second string

    // Call the longestPalindromeSubsequence function and print the result
    console.log("The Longest Palindromic Subsequence between the two strings is: " + longestPalindromeSubsequence(s1, s2));
}

// Call the main function to start the program
main();

//Minimum Insertions to Make String Palindrome
function lcs(s1, s2) {
    // Get the lengths of the input strings
    const n = s1.length;
    const m = s2.length;

    // Create a 2D array to store the dynamic programming values
    const dp = new Array(n + 1).fill(null).map(() => new Array(m + 1).fill(-1));

    // Initialize the first row and first column with 0
    for (let i = 0; i <= n; i++) {
        dp[i][0] = 0;
    }
    for (let i = 0; i <= m; i++) {
        dp[0][i] = 0;
    }

    // Fill the dp array using dynamic programming
    for (let ind1 = 1; ind1 <= n; ind1++) {
        for (let ind2 = 1; ind2 <= m; ind2++) {
            if (s1[ind1 - 1] === s2[ind2 - 1]) {
                dp[ind1][ind2] = 1 + dp[ind1 - 1][ind2 - 1];
            } else {
                dp[ind1][ind2] = Math.max(dp[ind1 - 1][ind2], dp[ind1][ind2 - 1]);
            }
        }
    }

    return dp[n][m];
}

// Function to find the length of the Longest Palindromic Subsequence of a string
function longestPalindromeSubsequence(s) {
    // Create a copy of the input string and reverse it
    const t = s.split('').reverse().join('');

    // Find the LCS between the original and reversed strings
    return lcs(s, t);
}

// Function to find the minimum insertions required to make a string palindrome
function minInsertion(s) {
    const n = s.length;
    const k = longestPalindromeSubsequence(s);

    // The minimum insertions required is equal to the length of the string minus the length of its Longest Palindromic Subsequence
    // Intuitively, this is because the characters not part of the LPS need to be inserted to form a palindrome
    return n - k;
}

// Main function
function main() {
    const s = "abcaa"; 

    // Call the minInsertion function and print the result
    console.log("The Minimum insertions required to make the string palindrome: " + minInsertion(s));
}

// Call the main function to start the program
main();

//Minimum Insertions/Deletions to Convert String A to String B


function lcs(s1, s2) {
    // Get the lengths of the input strings
    const n = s1.length;
    const m = s2.length;

    // Create a 2D array to store the dynamic programming values
    const dp = new Array(n + 1).fill(null).map(() => new Array(m + 1).fill(-1));

    // Initialize the first row and first column with 0
    for (let i = 0; i <= n; i++) {
        dp[i][0] = 0;
    }
    for (let i = 0; i <= m; i++) {
        dp[0][i] = 0;
    }

    // Fill the dp array using dynamic programming
    for (let ind1 = 1; ind1 <= n; ind1++) {
        for (let ind2 = 1; ind2 <= m; ind2++) {
            if (s1[ind1 - 1] === s2[ind2 - 1]) {
                dp[ind1][ind2] = 1 + dp[ind1 - 1][ind2 - 1];
            } else {
                dp[ind1][ind2] = Math.max(dp[ind1 - 1][ind2], dp[ind1][ind2 - 1]);
            }
        }
    }

    return dp[n][m];
}

// Function to find the minimum operations required to convert one string to another
function canYouMake(str1, str2) {
    const n = str1.length;
    const m = str2.length;

    // Calculate the length of the LCS
    const k = lcs(str1, str2);

    // The minimum operations required is equal to (n - k) + (m - k)
    return (n - k) + (m - k);
}

// Main function
function main() {
    const str1 = "abcd";
    const str2 = "anc";

    // Call the canYouMake function and print the result
    console.log("The Minimum operations required to convert str1 to str2: " + canYouMake(str1, str2));
}

// Call the main function to start the program
main();


