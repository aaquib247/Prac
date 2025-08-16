
//with Cooldown period. Like when you sell you cannot buy the next day, after that you can buy
var maxProfit = function (prices) {
    let n = prices.length;
    let dp = Array.from({ length: n }, () => new Array(2).fill(-1));

    function util(ind, buy) {
        if (ind >= n) return 0;
        if (dp[ind][buy] !== -1) return dp[ind][buy];

        let profit = 0;
        if (buy) {
            // Option to buy or skip
            profit = Math.max(
                -prices[ind] + util(ind + 1, 0), // Buy
                util(ind + 1, 1)                 // Skip
            );
        } else {
            // Option to sell or skip
            profit = Math.max(
                prices[ind] + util(ind + 2, 1), // Sell + cooldown
                util(ind + 1, 0)               // Skip selling
            );
        }

        return dp[ind][buy] = profit;
    }

    return util(0, 1);
};

// 🧪 Test Example with cooldown:
const prices = [1, 2, 3, 0, 2];
console.log("Max Profit with Cooldown:", maxProfit(prices));
