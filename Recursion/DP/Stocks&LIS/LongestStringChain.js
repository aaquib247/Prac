//printing LSC - via single DP -TAB
//do same as LIS and then in condition just compare if the diff is 1 and rest cahr should be same
// Function to check if word2 is a predecessor of word1
function isPredecessor(word1, word2) {
    if (word1.length !== word2.length + 1) return false;

    let i = 0, j = 0;
    while (i < word1.length) {
        if (j < word2.length && word1[i] === word2[j]) {
            i++;
            j++;
        } else {
            i++; // skip one char from word1
        }
    }

    return j === word2.length;
}

// Longest String Chain using LIS-style tabulation
function lengthLSC(words) {
    const n = words.length;
    words.sort((a, b) => a.length - b.length); // Sort by length

    const dp = new Array(n).fill(1);
    let maxLen = 1;

    for (let i = 0; i < n; i++) {
        for (let prev = 0; prev < i; prev++) {
            if (isPredecessor(words[i], words[prev])) {
                dp[i] = Math.max(dp[i], 1 + dp[prev]);
            }
        }
        maxLen = Math.max(maxLen, dp[i]);
    }

    return maxLen;
}

// 🧪 Test
const words = ["a", "b", "ba", "bca", "bda", "bdca"];
console.log("LSC Length via Tab is:", lengthLSC(words));  // Output: 4


//print------------------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>
// Check if word2 is a predecessor of word1
function isPredecessor(word1, word2) {
    if (word1.length !== word2.length + 1) return false;

    let i = 0, j = 0;
    while (i < word1.length) {
        if (j < word2.length && word1[i] === word2[j]) {
            i++;
            j++;
        } else {
            i++; // skip one char from word1
        }
    }
    return j === word2.length;
}

// Longest String Chain with path printing
function printLSC(words) {
    const n = words.length;
    words.sort((a, b) => a.length - b.length);

    const dp = new Array(n).fill(1);
    const parent = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        parent[i] = i; // Initially each word is its own parent
        for (let j = 0; j < i; j++) {
            if (isPredecessor(words[i], words[j]) && dp[i] < 1 + dp[j]) {
                dp[i] = 1 + dp[j];
                parent[i] = j;
            }
        }
    }

    // Find the index with the max chain length
    let maxLen = 0, lastIndex = 0;
    for (let i = 0; i < n; i++) {
        if (dp[i] > maxLen) {
            maxLen = dp[i];
            lastIndex = i;
        }
    }

    // Reconstruct the chain
    const chain = [];
    while (parent[lastIndex] !== lastIndex) {
        chain.push(words[lastIndex]);
        lastIndex = parent[lastIndex];
    }
    chain.push(words[lastIndex]);
    chain.reverse();

    console.log("Longest String Chain Length:", maxLen);
    console.log("Longest String Chain:", chain);
}

printLSC(["a", "b", "ba", "bca", "bda", "bdca"])