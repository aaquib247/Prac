//Brute TC- O(N2)
function twoSum(n, arr, target) {
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (arr[i] + arr[j] === target) return "YES";
        }
    }
    return "NO";
}

const n = 5;
const arr = [2, 6, 5, 8, 11];
const target = 14;
const ans = twoSum(n, arr, target);
console.log("This is the answer for variant 1:", ans);

//Better TC -O(N) and SC -O(N)
function twoSum(n, arr, target) {
    let seen = new Set();

    for (let i = 0; i < n; i++) {
        let complement = target - arr[i];
        if (seen.has(complement)) return "YES";
        seen.add(arr[i]);
    }

    return "NO";
}

// for index

function twoSum(n, arr, target) {
    let indexMap = new Map(); // Stores number -> index

    for (let i = 0; i < n; i++) {
        let num = arr[i];
        let complement = target - num;

        if (indexMap.has(complement)) {
            return [indexMap.get(complement), i]; // Return indices
        }

        indexMap.set(num, i); // Store current number's index
    }

    return [-1, -1]; // If no valid pair is found
}

// 2pointer - not good for index but only for if 2Sum possible.
//TC - O(nlogn) and SC- O(1)
function twoSum(n, arr, target) {
    arr.sort((a, b) => a - b); // Sort the array in ascending order
    let left = 0, right = n - 1;

    while (left < right) {
        let sum = arr[left] + arr[right];

        if (sum === target) {
            return "YES";
        } else if (sum < target) {
            left++; // Move left pointer forward
        } else {
            right--; // Move right pointer backward
        }
    }

    return "NO";
}
