function combinationSum(array, targetSum) {
    let result = [];
    
    function backtrack(start, currentCombination, currentSum) {
        // If the sum matches the target, add the combination to the result
        if (currentSum === targetSum) {
            result.push([...currentCombination]);
            return;
        }
        
        // If the sum exceeds the target, no need to continue
        if (currentSum > targetSum) {
            return;
        }

        // Try adding each element from the current index onwards
        for (let i = start; i < array.length; i++) {
            currentCombination.push(array[i]); // Add the current element
            backtrack(i, currentCombination, currentSum + array[i]); // Recurse with the same index (can reuse elements)
            currentCombination.pop(); // Backtrack
        }
    }

    backtrack(0, [], 0); // Start the recursion
    return result;
}

// Example usage:
const array = [2,3,6,7];
const targetSum = 7;
const combinations = combinationSum(array, targetSum);

// Output the combinations whose sum is equal to the target sum
for (const combination of combinations) {
    console.log(combination);
}
