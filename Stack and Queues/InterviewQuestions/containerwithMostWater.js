//O(N) and space is O(1)
// Diff from rain trapping, here just find max area wbetween 2 lines
//Area = min(height[left], height[right]) * (right - left)

function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        // Calculate current water container area
        const width = right - left;
        const containerHeight = Math.min(height[left], height[right]);
        const currentWater = width * containerHeight;
        
        // Update max water found
        maxWater = Math.max(maxWater, currentWater);
        
        // Move the pointer pointing to the shorter line
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}

const heights = [1,8,6,2,5,4,8,3,7];
console.log(maxArea(heights)); // Output: 49

//how this is a stack question?
//This problem can be related to stack concepts in terms of maintaining potential boundaries for water containment. 
//However, the two-pointer technique is more efficient for this specific problem. 
//Stacks are more commonly used in problems involving histograms or when we need to keep track of indices for dynamic boundaries.