//O(N2) and O(1)
function maxSubarraySum(arr, n) {
    let maxi = Number.MIN_SAFE_INTEGER; // maximum sum

    for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = i; j < n; j++) {
            sum += arr[j];
            maxi = Math.max(maxi, sum); // getting the maximum
        }
    }

    return maxi;
}

let arr1 = [ -2, 1, -3, 4, -1, 2, 1, -5, 4];
let n1 = arr1.length;
let maxSum1= maxSubarraySum(arr1, n1);
console.log("The maximum subarray sum is: " + maxSum1);

//TC- O(N) and SC- O(1)
function maxSubarraySum(arr, n) {
    let maxi = Number.MIN_SAFE_INTEGER; // maximum sum
    let sum = 0;

    for (let i = 0; i < n; i++) {
        sum += arr[i];

        if (sum > maxi) {
            maxi = sum;
        }

        // If sum < 0: discard the sum calculated
        if (sum < 0) {
            sum = 0;
        }
    }

    // To consider the sum of the empty subarray
    // uncomment the following check:

    //if (maxi < 0) maxi = 0;

    return maxi;
}

const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const n = arr.length;
const maxSum = maxSubarraySum(arr, n);
console.log("The maximum subarray sum is: " + maxSum);

//print
//followup

function maxSubarraySum(arr, n) {
    let maxi = Number.MIN_SAFE_INTEGER; // maximum sum
    let sum = 0;

    let start = 0;
    let ansStart = -1, ansEnd = -1;
    for (let i = 0; i < n; i++) {

        if (sum == 0) start = i; // starting index

        sum += arr[i];

        if (sum > maxi) {
            maxi = sum;

            ansStart = start;
            ansEnd = i;
        }

        // If sum < 0: discard the sum calculated
        if (sum < 0) {
            sum = 0;
        }
    }

    //printing the subarray:
    console.log("The subarray is: [");
    for (let i = ansStart; i <= ansEnd; i++) {
        console.log(arr[i] + " ");
    }
    console.log("]n");

    // To consider the sum of the empty subarray
    // uncomment the following check:

    //if (maxi < 0) maxi = 0;

    return maxi;
}

//My sol
function maxSubArray(nums) {

    let sum = 0;
    let max = -Infinity;

    for (let i = 0; i < nums.length; i++) {
        sum = sum + nums[i];
        max = Math.max(max, sum)
        if (sum < 0)
            sum = 0;  
    }
    return max;
};
