
//O(n * log D) and O(1) space where D is the maximum value in bloomDay

//Min day is 1 so left is 1
//Max day is max value in bloomDay so right is max(bloomDay)

//Binary search on days between left and right
//For mid day, check if we can make m bouquets with k flowers each
//If we can, try for smaller days by setting right to mid
//If we can't, try for larger days by setting left to mid + 1

//In short the question is to find the minimum day such that we can make m bouquets with k flowers each
//Intuition: If we can make m bouquets on day x, we can also make them on any day greater than x

var minDays = function(bloomDay, m, k) {
    if (m * k > bloomDay.length) return -1;

    let left = 1, right = Math.max(...bloomDay);

    const canMake = (day) => {
        let bouquets = 0, flowers = 0;
        for (let d of bloomDay) {
            if (d <= day) {
                flowers++;
                if (flowers === k) {
                    bouquets++;
                    flowers = 0;
                }
            } else flowers = 0;
        }
        return bouquets >= m;
    };

    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (canMake(mid)) right = mid;
        else left = mid + 1;
    }
    return left;
};

// Example usage:
console.log(minDays([1,10,3,10,2], 3, 1)); // Output: 3
console.log(minDays([1,10,3,10,2], 3, 2)); // Output: -1       
console.log(minDays([7,7,7,7,12,7,7], 2, 3)); // Output: 12
