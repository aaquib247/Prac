function lengthLIS(arr) {
    const n = arr.length;
    let dp = new Array(n).fill(1);
    let parent = new Array(n).fill(0);
    // let last = 0;

    for (let i = 0; i < n; i++) {
        parent[i] = i;
        for (let prev = 0; prev < i; prev++) {
            if (arr[i] > arr[prev] && dp[i] < 1 + dp[prev]) {
                dp[i] = 1 + dp[prev];
                parent[i] = prev;
            }
        }
    }

    // Find the index with the maximum length
     let last = -Infinity;
     for (let i = 0; i < n; i++) {
        if (last < dp[i]) {
            last = i;
        }
    }
    // for (let i = 0; i < n; i++) {
    //     if (dp[i] > maxLen) {
    //         maxLen = dp[i];
    //         last = i;
    //     }
    // }

    // Reconstruct LIS
    let ans = [];
    while (last !== parent[last]) {
        ans.push(arr[last]);
        last = parent[last];
    }
    ans.push(arr[last]);

    return ans.reverse();
}

console.log(lengthLIS([1,9,3,4,5]))
