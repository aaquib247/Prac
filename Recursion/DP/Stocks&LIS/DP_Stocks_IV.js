
// Same variant like DP_Stocks_III with k transactions

var maxProfit = function (k, prices) {
        let n = prices.length
        let dp = Array.from({ length: n }, () => Array.from({ length: 2 }, () => new Array(k + 1).fill(-1)))
        function util(ind, buy, cap) {

            if (cap === 0) return 0
            if (ind === n) return 0;
            if (dp[ind][buy][cap] != -1) return dp[ind][buy][cap];
            let profit = 0;
            if (buy) {
                profit = Math.max((-prices[ind] + util(ind + 1, 0, cap)), (0 + util(ind + 1, 1, cap)))
            }
            else {
                profit = Math.max((prices[ind] + util(ind + 1, 1, cap - 1)), (0 + util(ind + 1, 0, cap)))
            }

            return dp[ind][buy][cap] = profit;
        }

        return util(0, 1, k)
};