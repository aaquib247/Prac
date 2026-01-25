//Aggressive Cows / Magnetic Force Between Balls (LeetCode 1552)
//Both are simiar problems. Need to place m items with max min distance. 
// Means we need to place coiws/balls as far as possible from each other.
// The minimum distance can be between two cows/balls is maximum.

//Can place methodn checks if we can place m cows/balls with given min distance
//Intuition: Place first cow/ball at first position, then try to place next cow/ball at next possible position with at least 'dist' distance from last placed cow/ball.
// If we can place all m cows/balls this way, return true, else false.
// why left is 1 and right is max-min position?
// Because minimum distance between two cows/balls can be 1 (if positions are consecutive integers).
// Maximum distance can be between the farthest two positions, which is max(position) - min(position).

//TC :  NlogN for sorting + NlogM for binary search where M is max distance + N for canPlace method = O(NlogN + NlogM)
//SC : O(1)

var maxDistance = function(position, m) {
    position.sort((a,b)=>a-b);

    let left = 1;  
    let right = position[position.length-1] - position[0]; // why max - min ? Because max distance between two cows/balls can be between the farthest two positions.

    const canPlace = (dist) => {
        let count = 1, last = position[0];
        for (let i = 1; i < position.length; i++) {
            if (position[i] - last >= dist) {
                count++;
                last = position[i];
                if (count === m) return true;
            }
        }
        return false;
    };
    
    let res = 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2); // upper mid
        if (canPlace(mid)){
        res = mid;
        left = mid + 1; // we want to maximize the minimum distance
        } 
        else right = mid - 1;
    }
    return res;
};

console.log(maxDistance([1,2,3,4,7], 3)); // Output: 3          
console.log(maxDistance([5,4,3,2,1,1000000000], 2)); // Output: 999999999
console.log(maxDistance([0,10**9], 2)); // Output: 1000000000