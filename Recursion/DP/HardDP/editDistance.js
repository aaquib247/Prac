function editDistance(S1, S2) {
    const n = S1.length;
    const m = S2.length;

    // Create a 2D array to store dynamic programming values, initialized with -1
    const dp = new Array(n + 1).fill(null).map(() => new Array(m + 1).fill(-1));

    // Helper function to calculate the minimum edit distance using recursion with memoization
    function editDistanceUtil(i, j) {
        // If the first string is empty, the only option is to insert all characters from the second string
        if (i < 0) return j + 1;
        // If the second string is empty, the only option is to delete all characters from the first string
        if (j < 0) return i + 1;

        // Check if the result for the current indices is already calculated
        if (dp[i][j] !== -1) return dp[i][j];

        // If the characters at the current positions are the same, no operation is needed
        if (S1[i] === S2[j]) {
            return dp[i][j] = editDistanceUtil(i - 1, j - 1);
        }

        // Minimum of three choices:
        // 1. Substitute a character in the first string with a character in the second string
        // 2. Delete a character from the first string
        // 3. Insert a character into the first string
        return dp[i][j] = 1 + Math.min(
            editDistanceUtil(i - 1, j - 1), // Replace
            Math.min(
                editDistanceUtil(i - 1, j),  // Delete
                editDistanceUtil(i, j - 1)   // Insert
            )
        );
    }

    // Call the helper function for the full strings (starting from the last indices)
    return editDistanceUtil(n - 1, m - 1);
}

// Main function
function main() {
    const s1 = "horse";
    const s2 = "ros";

    // Call the editDistance function and print the result
    console.log("The minimum number of operations required is: " + editDistance(s1, s2)); // Output: 3
}

// Call the main function to start the program
main();

