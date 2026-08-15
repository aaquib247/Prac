
// TC : O(log n) where n is the input number x.
// Sc : O(1) as we are using constant space.

//example 1:
// Input: x = 4
// Output: 2

//example 2:
// Input: x = 8
// Output: 2
// Explanation: The square root of 8 is 2.82842..., and since we want to return the integer part, we return 2.

var mySqrt = function (x) {

    if (x<2) return x;

    let l = 1;
    let r = Math.floor(x / 2);
    let ans = 0;

    while (l <= r) {
        let mid = Math.floor((l + r) / 2);
        if(mid * mid <= x){
            ans = mid;
            l = mid+1;
        } else {
            r = mid-1;
        }
    }
    return ans;
};
