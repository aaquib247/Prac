//with every transaction, there you need to pay a fee.
var maxProfit = function (prices, fee) {
    let n = prices.length;
    let dp = Array.from({ length: n }, () => new Array(2).fill(-1));

    function util(ind, buy) {
        if (ind === n) return 0;
        if (dp[ind][buy] !== -1) return dp[ind][buy];

        let profit = 0;
        if (buy) {
            // Option to buy or skip
            profit = Math.max(
                -prices[ind] + util(ind + 1, 0), // Buy
                util(ind + 1, 1)                 // Skip
            );
        } else {
            // Option to sell or skip, but apply fee
            profit = Math.max(
                prices[ind] - fee + util(ind + 1, 1), // Sell with fee
                util(ind + 1, 0)                      // Skip selling
            );
        }

        return dp[ind][buy] = profit;
    }

    return util(0, 1);
};

// 🧪 Test Example
const prices = [1, 3, 2, 8, 4, 9];
const fee = 2;

console.log("Max Profit with Transaction Fee:", maxProfit(prices, fee));
