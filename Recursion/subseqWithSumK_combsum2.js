function combinationSum2(candidates, target) {
    let result = [];
    
    // Sort the array to handle duplicates easily
    candidates.sort((a, b) => a - b);

    // Backtracking function to find combinations
    function backtrack(start, currentCombination, currentSum) {
        // If the sum equals the target, add the current combination to the result
        if (currentSum === target) {
            result.push([...currentCombination]);
            return;
        }

        // If the sum exceeds the target, stop the current path
        if (currentSum > target) {
            return;
        }

        // Loop through the candidates, starting from the current index
        for (let i = start; i < candidates.length; i++) {
            // Skip duplicates: If the current element is the same as the previous one, skip it
            if (i > start && candidates[i] === candidates[i - 1]) {
                continue;
            }

            currentCombination.push(candidates[i]);  // Add the current element to the combination
            // Recurse with the next index (i + 1 to avoid reusing the same element)
            backtrack(i + 1, currentCombination, currentSum + candidates[i]);
            currentCombination.pop();  // Backtrack: remove the last element to try another combination
        }
    }

    backtrack(0, [], 0);  // Start backtracking from the first index
    return result;
}

// Example usage:
const candidates = [10, 1, 2, 7, 6, 1, 5];
const target = 8;
const combinations = combinationSum2(candidates, target);

// Output the combinations whose sum equals the target sum
console.log(combinations);
