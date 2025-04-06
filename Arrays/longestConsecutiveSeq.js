
//O(NlogN) + O(N), N = size of the given array. and O(1)

function longestSuccessiveElements(arr) {
    let n = arr.length;
    if (n === 0) return 0;

    // sort the array:
    arr.sort((a, b) => a - b);
    let lastSmaller = -Infinity;
    let cnt = 0;
    let longest = 1;

    // find longest sequence:
    for (let i = 0; i < n; i++) {
        if (arr[i] - 1 === lastSmaller) {
            // arr[i] is the next element of the
            // current sequence.
            cnt += 1;
            lastSmaller = arr[i];
        } else if (arr[i] !== lastSmaller) {
            cnt = 1;
            lastSmaller = arr[i];
        }
        longest = Math.max(longest, cnt);
    }
    return longest;
}

let arr = [100, 200, 1, 2, 3, 4];
let ans = longestSuccessiveElements(arr);
console.log("The longest consecutive sequence is", ans);

//Best
//O(N) for both
function longestConsecutive(nums) {
    const numSet = new Set(nums);
    let longest = 0;

    for (let num of numSet) {
        // Only start counting if it's the start of a sequence
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let count = 1;

            while (numSet.has(currentNum + 1)) {
                currentNum++;
                count++;
            }

            longest = Math.max(longest, count);
        }
    }

    return longest;
}

// Example usage
const nums = [100, 4, 200, 1, 3, 2];
console.log("Longest Consecutive Sequence Length:", longestConsecutive(nums)); // Output: 4

