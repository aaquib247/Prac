//subsequence with a sum k (2 in below case :: output is [1,1] and [2])
// function generateSubsetsWithSum(array, targetSum) {
//     let subsets = [[]]; // Initialize with the empty subset
//     let result = []; // This will store the subsets whose sum matches targetSum

//     // Generate all subsets
//     for (let element of array) {
//         let currentLength = subsets.length; // Number of subsets currently in subsets
//         for (let i = 0; i < currentLength; i++) {
//             let newSubset = subsets[i].slice(); // Create a copy of the existing subset
//             newSubset.push(element); // Add the current element to the copy
//             subsets.push(newSubset); // Add the new subset to the list of subsets

//             // Calculate the sum of the new subset
//             let sum = newSubset.reduce((acc, num) => acc + num, 0);

//             // Check if the sum matches the target sum
//             if (sum === targetSum) {
//                 result.push(newSubset); // Add it to the result if it matches
//             }
//         }
//     }

//     return result;
// }

// // Example usage:
// const array = [1, 2, 1];
// const targetSum = 2;
// const subsetsWithSum = generateSubsetsWithSum(array, targetSum);

// // Output the subsets whose sum is equal to the target sum
// for (const subset of subsetsWithSum) {
//     console.log(subset);
// }


//In this we are generating all sunsets and filtering out with sum = k
function generateSubsetsWithSum(array, targetSum) {
    let subsets = [[]]; // Initialize with the empty subset
   
    // Generate all subsets
    for (let element of array) {
        let currentLength = subsets.length; // Number of subsets currently in subsets
        for (let i = 0; i < currentLength; i++) {
            let newSubset = subsets[i].slice(); // Create a copy of the existing subset
            newSubset.push(element); // Add the current element to the copy
            subsets.push(newSubset); // Add the new subset to the list of subsets

        }
    }
    let result = subsets.filter(subset => subset.reduce((sum, num) => sum + num, 0) === targetSum);
    return result;
}

// Example usage:
const array = [2,3,6,7];
const targetSum = 7;
const subsetsWithSum = generateSubsetsWithSum(array, targetSum);

// Output the subsets whose sum is equal to the target sum
for (const subset of subsetsWithSum) {
    console.log(subset);
}

// TC: O(2^n * n) ---> for subset generation 2^n and n is for sum of all subsets
// SC: O(2^n * k) --> 2^n ---> for subset generation 2^n and  If there are k subsets whose sum matches the target,
// space for the result would be proportional to O(k). 

//-----------------------------------------------------------------------------------------------------------------------------------------------

