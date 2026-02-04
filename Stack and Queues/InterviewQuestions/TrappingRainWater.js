//BruteForce
// TC- O(N) SC - (N)
function trap(height) {
    if (height.length === 0) return 0;
    
    const n = height.length;
    let water = 0;
    
    // Arrays to store max heights from left and right
    const leftMax = new Array(n);
    const rightMax = new Array(n);
    
    // Fill leftMax array
    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(height[i], leftMax[i - 1]);
    }
    //println(leftMax);

        console.log("Left max at index", "is", leftMax);

    
    // Fill rightMax array
    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(height[i], rightMax[i + 1]);
    }
    //println(rightMax);

        console.log("Right max at index", "is", rightMax);

    
    // Calculate trapped water
    for (let i = 0; i < n; i++) {
        water += Math.min(leftMax[i], rightMax[i]) - height[i];
    }
    
    return water;
}


//Optimised - 2 pointer
//TC - O(N) and SC O(1)
// function trapRainWaterOptimal(height) {
//     let left = 0, right = height.length - 1;
//     let maxLeft = height[left], maxRight = height[right];
//     let waterTrapped = 0;
    
//     while (left < right) {
//         if (maxLeft < maxRight) {
//             left++;
//             maxLeft = Math.max(maxLeft, height[left]);
//             waterTrapped += maxLeft - height[left];
//         } else {
//             right--;
//             maxRight = Math.max(maxRight, height[right]);
//             waterTrapped += maxRight - height[right];
//         }
//     }
    
//     return waterTrapped;
// }
// console.log(trapRainWaterOptimal([2,0,2]));  //output 2
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); //output 6