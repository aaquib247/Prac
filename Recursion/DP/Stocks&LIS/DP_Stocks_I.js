//You can buy and sell i.e do only 1 Transaction;
function maxProfit(prices) {

    let min = price[0];
    let profit = 0;
    for(let i = 1; i< price.length; i++){
        let cost = price[i] - min;
        profit = Math.max(profit,cost)
        min = Math.min(min, price[i]) // remembering the past. Hence, its a dp question
    }
    return profit;
}

let price = [7,1,5,3,6,4];
console.log("Profit is  :", maxProfit(price));