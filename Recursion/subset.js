function generateSubsets(array) {
    let subsets = [[]]; // Initialize with the empty subset

    for (let element of array) {
        let currentLength = subsets.length; // Number of subsets currently in subsets
        for (let i = 0; i < currentLength; i++) {
            let newSubset = subsets[i].slice(); // Create a copy of the existing subset
            newSubset.push(element); // Add the current element to the copy
            subsets.push(newSubset); // Add the new subset to the list of subsets
        }
    }

    return subsets;
}

// Example usage:
const array = [1, 2, 3,4];
const allSubsets = generateSubsets(array);
for (const subset of allSubsets) {
    console.log(subset);
}

// For Duplicates:::
// Example 1:

// Input: nums = [1,2,2]
// Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
// Example 2:

// Input: nums = [0]
// Output: [[],[0]]

var subsetsWithDup = function(arr) {
arr.sort((a, b) => a - b); // Sort the array
    const outer = [[]]; // Start with an empty subset
    let start, end;

    for (let i = 0; i < arr.length; i++) {
        start = 0;
        // If current and previous element are the same, set start
        if (i > 0 && arr[i] === arr[i - 1]) {
            start = end + 1;
        }
        end = outer.length - 1;
        const n = outer.length;

        for (let j = start; j < n; j++) {
            const internal = [...outer[j]]; // Create a new subset
            internal.push(arr[i]); // Add the current element
            outer.push(internal); // Add the new subset to the outer list
        }
    }

    return outer;
}