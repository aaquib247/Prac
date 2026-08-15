//Question: https://leetcode.com/problems/candy/ where n children are standing in a line. 
// Each child is assigned a rating value given in the integer array ratings. You are giving candies to these children subjected to 
// the following requirements:
// 1. Each child must have at least one candy.
// 2. Children with a higher rating get more candies than their neighbors.

//Intuition: The idea is to traverse the ratings array twice, once from left to right and once from right to left.
// In the first pass, we ensure that each child has more candies than the child to their left if they have a higher rating.
// In the second pass, we ensure that each child has more candies than the child to their right if they have a higher rating.
// Finally, we sum up the total number of candies required.

//Time Complexity: O(n) where n is the length of the ratings array. We traverse the array twice.
//Space Complexity: O(n) for storing the candies array.

function candy(ratings) {
    const n      = ratings.length;
    const candies = new Array(n).fill(1);

    // pass 1 — left to right
    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }

    // pass 2 — right to left
    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
    }

    return candies.reduce((sum, c) => sum + c, 0);
}

console.log(candy([1, 0, 2]));       // 5
console.log(candy([1, 2, 2]));       // 4
console.log(candy([1, 3, 2, 2, 1])); // 7
