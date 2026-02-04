var productExceptSelf = function(nums) {
    const n = nums.length;
    const output = new Array(n).fill(1);

    // Step 1: Compute left products
    let left = 1;
    for (let i = 0; i < n; i++) {
        output[i] = left;
        left *= nums[i];
    }

    // Step 2: Multiply by right products
    let right = 1;
    for (let i = n - 1; i >= 0; i--) {
        output[i] *= right;
        right *= nums[i];
    }

    return output;
};
console.log(productExceptSelf([1,2,3,4])); 
// Output: [24,12,8,6]

//intuition: for each element, the product of all elements to its left and the product of all elements to its right give the desired result without including the element itself.
