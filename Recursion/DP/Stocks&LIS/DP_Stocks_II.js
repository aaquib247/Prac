//You can buy and sell i.e do Transaction n times;
function maxProfit(prices) {
    let n = prices.length;

    function util(ind, buy) {

        if (ind === n) return 0;
        let profit = 0;
        if (buy) {
            profit = Math.max((-prices[ind] + util(ind + 1, 0)), (0 + util(ind + 1, 1)))
        }
        else {
            profit = Math.max((prices[ind] + util(ind + 1, 1)), (0 + util(ind + 1, 0)))
        }

        return profit;
    }

    return util(0, 1)
}

let price = [7, 1, 5, 3, 6, 4];
console.log("Profit is  :", maxProfit(price));


//DP- Memoization
var maxProfit = function (prices) {
    let n = prices.length;
    let dp = Array.from({length: n},()=> new Array(2).fill(-1))
    function util(ind, buy) {

        if (ind === n) return 0;
        if(dp[ind][buy] != -1) return dp[ind][buy]
        let profit = 0;
        if (buy) {
            profit = Math.max((-prices[ind] + util(ind + 1, 0)), (0 + util(ind + 1, 1)))
        }
        else {
            profit = Math.max((prices[ind] + util(ind + 1, 1)), (0 + util(ind + 1, 0)))
        }

        return dp[ind][buy] = profit;
    }

    return util(0, 1)
};