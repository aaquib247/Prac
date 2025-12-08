//Brute force will be to use 2 loops and second lopp will see the NGE in the right and then break;
// store ans in another array.
// TC - O(N^2) and SC (N)

//Optimised (monotonic stack - changed order)
// we will traverse from last . If the element of the array is greater than of teh stack we will pop
// (As we need smaller element the only the elemnt in the stack will be its NGE)
// for Next greater to LEFT , the loop will run from  0 to n.
function nextGreaterElements(nums) {
    const n = nums.length;
    const nge = new Array(n).fill(-1); // Initialize all to -1
    const stack = [];
    
    // Traverse the array from right to left
    for (let i = n - 1; i >= 0; i--) {
        // Remove elements from stack that are <= current element
        while (stack.length > 0 && stack[stack.length - 1] <= nums[i]) {
            stack.pop();
        }
        
        // If stack isn't empty, the top is the next greater element
        if (stack.length > 0) {
            nge[i] = stack[stack.length - 1];
        }
        
        // Push current element to stack
        stack.push(nums[i]);
    }
    
    return nge;
}

// Example usage
const arr = [5, 7, 1, 2, 6, 0];
const result = nextGreaterElements(arr);
console.log("The next greater elements are:");
console.log(result.join(" ")); // Output: 7 -1 2 6 -1 -1





function nextGreaterElements(nums) {
    const n = nums.length;
    const nge = new Array(n);
    const stack = [];
    
    // We traverse the circular array (twice the length)
    for (let i = 2 * n - 1; i >= 0; i--) {
        // Remove elements from stack that are <= current element
        while (stack.length > 0 && stack[stack.length - 1] <= nums[i % n]) {
            stack.pop();
        }
        
        // Only store results for the original array indices (0 to n-1)
        if (i < n) {
            if (stack.length > 0) {
                nge[i] = stack[stack.length - 1];
            } else {
                nge[i] = -1; // No greater element found
            }
        }
        
        // Push current element to stack
        stack.push(nums[i % n]);
    }
    
    return nge;
}

// Example usage
const num = [5, 7, 1, 2, 6, 0];
const res = nextGreaterElements(num);
console.log("The next greater elements are:");
console.log(result.join(" ")); // Output: 7 -1 2 6 7 5

//------------------------------------
// TC O(N) and SC - O(N)

function previousSmallerElements(nums) {
    const n = nums.length;
    const pse = new Array(n).fill(-1); // Initialize all to -1
    const stack = [];
    
    // Traverse the array from left to right
    for (let i = 0; i < n; i++) {
        // Remove elements from stack that are >= current element
        while (stack.length > 0 && stack[stack.length - 1] >= nums[i]) {
            stack.pop();
        }
        
        // If stack isn't empty, the top is the previous smaller element
        if (stack.length > 0) {
            pse[i] = stack[stack.length - 1];
        }
        
        // Push current element to stack
        stack.push(nums[i]);
    }
    
    return pse;
}

// Example usage
const arr1 = [5, 7, 1, 2, 6, 0];
const result1 = previousSmallerElements(arr1);
console.log("The previous smaller elements are:");
console.log(result.join(" ")); // Output: -1 5 -1 1 2 -1



// | **Problem**                                  | **Main Part of Code**                                                                                                                                                           | **Key Changes in Code**                                                                                                                                                                                                      |
// | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
// | **Next Greater Element to the Right (NGER)** | `while (stack.length > 0 && stack[stack.length - 1] <= nums[i]) { stack.pop(); }`<br> `if (stack.length > 0) { nge[i] = stack[stack.length - 1]; }`<br> `stack.push(nums[i]);`  | - **Direction**: Traverse **right to left**.<br> - **Condition for popping**: `<=` (popping all elements that are less than or equal to the current element).<br> - **Result**: Top of stack is the next greater element.    |
// | **Next Smaller Element to the Right (NSER)** | `while (stack.length > 0 && stack[stack.length - 1] >= nums[i]) { stack.pop(); }`<br> `if (stack.length > 0) { nser[i] = stack[stack.length - 1]; }`<br> `stack.push(nums[i]);` | - **Direction**: Traverse **right to left**.<br> - **Condition for popping**: `>=` (popping all elements that are greater than or equal to the current element).<br> - **Result**: Top of stack is the next smaller element. |
// | **Next Greater Element to the Left (NGEL)**  | `while (stack.length > 0 && stack[stack.length - 1] <= nums[i]) { stack.pop(); }`<br> `if (stack.length > 0) { nge[i] = stack[stack.length - 1]; }`<br> `stack.push(nums[i]);`  | - **Direction**: Traverse **left to right**.<br> - **Condition for popping**: `<=` (popping all elements that are less than or equal to the current element).<br> - **Result**: Top of stack is the next greater element.    |
// | **Next Smaller Element to the Left (NSEL)**  | `while (stack.length > 0 && stack[stack.length - 1] >= nums[i]) { stack.pop(); }`<br> `if (stack.length > 0) { nsel[i] = stack[stack.length - 1]; }`<br> `stack.push(nums[i]);` | - **Direction**: Traverse **left to right**.<br> - **Condition for popping**: `>=` (popping all elements that are greater than or equal to the current element).<br> - **Result**: Top of stack is the next smaller element. |


// using Index
// while storing the index in nge directly store the value
function nextGreaterElements(nums) {
    const n = nums.length;
    const nge = new Array(n).fill(-1); // Initialize all to -1
    const stack = [];

    // Traverse the array from right to left
    for (let i = n - 1; i >= 0; i--) {
        // Remove elements from stack that are <= current element
        while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[i]) {
            stack.pop();
        }

        // If stack isn't empty, the top is the next greater element
        if (stack.length > 0) {
            nge[i] = nums[stack[stack.length - 1]]; // Store the next greater element value
        }

        // Push current index to stack
        stack.push(i);
    }

    return nge;
}

// Example usage
// const arr = [5, 7, 1, 2, 6, 0];
// const result = nextGreaterElements(arr);
// console.log("The next greater elements are:");
// console.log(result.join(" ")); // Output: 7  -1  2  6  -1  -1
