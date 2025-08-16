function longestBitonicSubsequence(arr) {
    const n = arr.length;
    let lis = new Array(n).fill(1);
    let lds = new Array(n).fill(1);

    // Compute LIS from left to right
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[i] > arr[j]) {
                lis[i] = Math.max(lis[i], lis[j] + 1);
            }
        }
    }

    // Compute LDS from right to left
    for (let i = n - 2; i >= 0; i--) {
        for (let j = n - 1; j > i; j--) {
            if (arr[i] > arr[j]) {
                lds[i] = Math.max(lds[i], lds[j] + 1);
            }
        }
    }

    // Find max of lis[i] + lds[i] - 1
    let maxLen = 0;
    for (let i = 0; i < n; i++) {
        maxLen = Math.max(maxLen, lis[i] + lds[i] - 1);
    }

    return maxLen;
}

// Example
const arr = [1, 11, 2, 10, 4, 5, 2, 1];
console.log("Length of Longest Bitonic Subsequence is:", longestBitonicSubsequence(arr)); // Output: 6

//LIS array: [1, 2, 2, 3, 3, 4, 2, 1]
//LDS array: [1, 5, 2, 4, 3, 3, 2, 1]
//Longest Bitonic Subsequence: [1, 2, 4, 5, 2, 1]
