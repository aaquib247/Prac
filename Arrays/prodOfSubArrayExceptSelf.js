// Time: O(n²)
// Space: O(1) (excluding output array)
function productExceptSelf(nums) {
    const result = [];

    for (let i = 0; i < nums.length; i++) {
        let product = 1;

        for (let j = 0; j < nums.length; j++) {
            if (i !== j) {
                product *= nums[j];
            }
        }

        result.push(product);
    }

    return result;
}

console.log(productExceptSelf([1,2,3,4]));
//---------------------------------------------------
//Time: O(n)
// Space: O(n)
function productExceptSelf(nums) {
    const n = nums.length;

    const prefix = new Array(n).fill(1);
    const suffix = new Array(n).fill(1);
    const result = new Array(n);

    // Prefix
    for (let i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] * nums[i - 1];
    }

    // Suffix
    for (let i = n - 2; i >= 0; i--) {
        suffix[i] = suffix[i + 1] * nums[i + 1];
    }

    // Result
    for (let i = 0; i < n; i++) {
        result[i] = prefix[i] * suffix[i];
    }

    return result;
}

console.log(productExceptSelf([1,2,3,4]));

//------
function productExceptSelf(nums) {
    const n = nums.length;
    const result = new Array(n).fill(1);

    // Store prefix products directly in result
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }

    // Multiply by suffix products
    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }

    return result;
}

console.log(productExceptSelf([1,2,3,4]));