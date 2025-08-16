//You can buy and sell i.e do Transaction atmost 2 times;
function maxProfit(prices) {
    let n = prices.length - 1

    function util(ind, buy, cap) {

        if (cap === 0) return 0
        if (ind === n) return 0;
        let profit = 0;
        if (buy) {
            profit = Math.max((-prices[ind] + util(ind + 1, 0, cap)), (0 + util(ind + 1, 1, cap)))
        }
        else {
            profit = Math.max((prices[ind] + util(ind + 1, 1, cap - 1)), (0 + util(ind + 1, 0, cap)))
        }

        return profit;
    }

    return util(0, 1, 2)
}

let price = [7, 1, 5, 3, 6, 4];
console.log("Profit is  :", maxProfit(price));

//DP - memoixation
var maxProfit = function (prices) {
    let n = prices.length
    let dp = Array.from({ length: n }, () => Array.from({ length: 2 }, () => new Array(3).fill(-1)))
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

    return util(0, 1, 2)
};