//The question states that we need to find the length of longest bitonic subsequence in a given array.
//A bitonic subsequence is a sequence which first increases and then decreases.
//To solve this, we can use dynamic programming to find the Longest Increasing Subsequence (LIS) and Longest Decreasing Subsequence (LDS) for each element in the array.
//The length of the longest bitonic subsequence at each index can be found by adding the lengths of LIS and LDS at that index and subtracting 1 (to avoid double counting the peak element).

//TC - O(N^2) and SC - O(N) for LIS and O(N) for LDS
function longestBitonicSubsequence(arr) {
    const n = arr.length;

    // Step 1: Calculate the LIS (Longest Increasing Subsequence) from left to right
    let lis = new Array(n).fill(1);  // Array to store LIS length at each index
    for (let i = 1; i < n; i++) {
        for (let prev = 0; prev < i; prev++) {
            if (arr[i] > arr[prev]) {
                lis[i] = Math.max(lis[i], lis[prev] + 1);
            }
        }
    }

    // Step 2: Calculate the LDS (Longest Decreasing Subsequence) using LIS-style from left to right
    let lds = new Array(n).fill(1);  // Array to store LDS length at each index
    for (let i = 1; i < n; i++) {
        for (let prev = 0; prev < i; prev++) {
            if (arr[i] < arr[prev]) {  // For decreasing subsequences
                lds[i] = Math.max(lds[i], lds[prev] + 1);
            }
        }
    }

    // Step 3: Calculate the maximum length of the bitonic subsequence
    let maxBitonicLength = 0;
    for (let i = 0; i < n; i++) {
        // Bitonic subsequence includes LIS[i] + LDS[i] - 1 (subtract 1 to avoid double counting the peak element)
        maxBitonicLength = Math.max(maxBitonicLength, lis[i] + lds[i] - 1);
    }

    return maxBitonicLength;
}

// Example
const arr = [1, 11, 2, 10, 4, 5, 2, 1];
console.log("Length of Longest Bitonic Subsequence is:", longestBitonicSubsequence(arr)); // Output: 6

//LIS array: [1, 2, 2, 3, 3, 4, 2, 1]
//LDS array: [1, 5, 2, 4, 3, 3, 2, 1]
//Longest Bitonic Subsequence: [1, 2, 4, 5, 2, 1]
