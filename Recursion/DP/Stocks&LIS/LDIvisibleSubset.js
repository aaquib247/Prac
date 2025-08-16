function divisibleSet(arr) {
    const n = arr.length;

    // Sort the array
    arr.sort((a, b) => a - b);

    const dp = new Array(n).fill(1);
    const hash = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        hash[i] = i; // Initialize hash with the current index
        for (let prev = 0; prev < i; prev++) {
            if (arr[i] % arr[prev] === 0 && dp[i] < 1 + dp[prev]) {
                dp[i] = 1 + dp[prev];
                hash[i] = prev;
            }
        }
    }

    // Find the index of the max value in dp
    let ans = -1;
    let lastIndex = -1;

    for (let i = 0; i < n; i++) {
        if (dp[i] > ans) {
            ans = dp[i];
            lastIndex = i;
        }
    }

    // Reconstruct the subset
    const temp = [];
    temp.push(arr[lastIndex]);

    while (hash[lastIndex] !== lastIndex) {
        lastIndex = hash[lastIndex];
        temp.push(arr[lastIndex]);
    }

    return temp.reverse();
}

// 🧪 Test
const arr = [1, 16, 7, 8, 4];
const result = divisibleSet(arr);
console.log("The longest divisible subset elements are:", result);
