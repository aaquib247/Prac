class Solution {
    findCombinations(p, up, t, s, ans) {
        // Base case: if the current sum equals the target
        if (s === t) {
            ans.push([...p]); // Add a copy of the current combination
            return; // Return after finding a valid combination
        }

        // If the sum exceeds the target, no need to continue
        if (s > t || up.length === 0) return;

        let ch = up[0];
        
        // Include the current candidate
        this.findCombinations(p.concat(ch), up, t, s + ch, ans);
        
        // Backtrack and try without the current candidate

        this.findCombinations(p, up.slice(1), t, s , ans);
    }

    combinationSum(candidates, target) {
        const ans = [];
        this.findCombinations([], candidates, target, 0, ans);
        return ans;
    }
}

// Example usage:
const sol = new Solution();
// const arr = [2, 3, 6, 7];
// const target = 7;
const arr = [1,2];
const target = 2;

const combinations = sol.combinationSum(arr, target);

console.log("Combinations are:");
combinations.forEach(combo => {
    console.log(combo.join(" "));
});




// function countSubsequencesWithSum(p, up, s, targetSum) {
//     if (up.length === 0) {
//         if (s === targetSum)
//             return 1;
//         else
//             return 0;
//     }
//     sum = sum + up[0]
//     const left = countSubsequencesWithSum(p.concat([sum]), up.slice(1), sum, targetSum)
//     sum = sum - up[0]
//     const right = countSubsequencesWithSum(p.concat([sum]), up.slice(1), sum  , targetSum)

//     return left + right;
// }

// let targetSum = 2;
// let sum = 0;
// let result = countSubsequencesWithSum([], [1, 2, 1], 0, targetSum);
// console.log(result); // Output: 2