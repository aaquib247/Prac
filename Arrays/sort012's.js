//Brute Force sort the array and TC - O(NlogN) and SC - O(1)
// Better - take three variables and store count and then update it . TC - O(N) + O(N) (filling values) and SC - O(1)
function sortArray(arr, n) {
    let cnt0 = 0, cnt1 = 0, cnt2 = 0;

    // Count the number of 0s, 1s, and 2s
    for (let i = 0; i < n; i++) {
        if (arr[i] === 0) cnt0++;
        else if (arr[i] === 1) cnt1++;
        else cnt2++;
    }

    // Overwrite the array with sorted values
    for (let i = 0; i < cnt0; i++) arr[i] = 0;
    for (let i = cnt0; i < cnt0 + cnt1; i++) arr[i] = 1;
    for (let i = cnt0 + cnt1; i < n; i++) arr[i] = 2;
}

//Dutch National flag algorithm.
//TC - O(N) and SC - O(1)

function sortArray(arr, n) {
    let low = 0, mid = 0, high = n - 1;

    while (mid <= high) {
        if (arr[mid] === 0) {
            // Swap arr[low] and arr[mid]
            [arr[low], arr[mid]] = [arr[mid], arr[low]];
            low++;
            mid++;
        } else if (arr[mid] === 1) {
            mid++;
        } else {
            // Swap arr[mid] and arr[high]
            [arr[mid], arr[high]] = [arr[high], arr[mid]];
            high--;
        }
    }
}

const n = 6;
const arr = [0, 2, 1, 2, 0, 1];
sortArray(arr, n);

console.log("After sorting:");
console.log(arr.join(" "));


//Concept

// 0s go to the beginning
// 1s stay in the middle
// 2s go to the end

// We use three pointers:

// low → marks the boundary for 0s
// mid → current element being evaluated
// high → marks the boundary for 2s

// At any point:

// arr[0...low-1] → all 0s
// arr[low...mid-1] → all 1s
// arr[high+1...n-1] → all 2s
// arr[mid...high] → unknown (to process)