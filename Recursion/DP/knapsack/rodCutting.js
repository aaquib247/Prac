function rodCuttingMemo(prices, n) {
    let dp = Array.from({ length: prices.length }, () => Array(n + 1).fill(-1))

    function find(i, n) {
        if (i === 0)
            return n * prices[0];
        if (dp[i][n] !== -1)
            return dp[i][n]

        let nT = 0 + find(i - 1, n)
        let T = -1e9
        let rod_len = i + 1;
        if (rod_len <= n)
            T = prices[i] + find(i, n - rod_len)
        return dp[i][n] = Math.max(nT, T)
    }

    return find(prices.length - 1, n);
}

// Example usage
const prices = [2, 5, 7, 8, 10];  // Prices for lengths 1 to 5
const n = 5;
console.log(rodCuttingMemo(prices, n));  // Output will be the maximum revenue

//Tab
function rodCuttingTab(price, n) {
    let dp = Array.from({ length: price.length }, () => Array(n + 1).fill(-1))

    for (let i = 0; i <= n; i++) {
        dp[0][i] = i * price[0];
    }

    for (let i = 1; i < price.length; i++) {
        for (let j = 0; j <= n; j++) {
            let nT = 0 + dp[i - 1][j];
            let T = -Number.MAX_SAFE_INTEGER;
            let rod_len = i + 1;
            if (rod_len <= j)
                T = price[i] + dp[i - 1][j - rod_len]

            dp[i][j] = Math.max(nT, T);
        }
    }
    return dp[price.length - 1][n]
}

// Example usage
const price = [2, 5, 7, 8, 10];  // Prices for lengths 1 to 5
const N = 5;
console.log(rodCuttingTab(price, N));  // Output will be the maximum revenue