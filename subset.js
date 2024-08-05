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

