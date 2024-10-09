// //https://leetcode.com/problems/combination-sum/description/
class Solution {
    findCombinations(p, up, t, s, ans) {
        // Base case: if the current sum equals the target
        if (s === t) {
            ans.push([...p]); // Add a copy of the current combination
            return; // Return after finding a valid combination
        }
        if (s > t || up.length === 0) return;

        let ch = up[0];
        this.findCombinations(p.concat(ch), up, t, s + ch, ans);
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

const combinations = sol.combinationSum(arr, target2);

console.log("Combinations are:");
combinations.forEach(combo => {
    console.log(combo.join(" "));
});

//Sum Combination
// using backtrack1
function combinationSum(candidates, target) {
    const result = [];
    
    function backtrack1(start, currentCombination, currentSum) {
       
        if (currentSum === target) {
            result.push([...currentCombination]);
            return;
        }
  
        if (currentSum > target) {
            return;
        }
        
        for (let i = start; i < candidates.length; i++) {
           
            currentCombination.push(candidates[i]);
            backtrack1(i, currentCombination, currentSum + candidates[i]);
            currentCombination.pop();
        }   
    }

    // Start backtracking
    backtrack1(0, [], 0);
    return result;
}

// Example usage:
// const candidates = [2, 3, 6, 7];
// const target1 = 7;

const candidates = [1,2];
const target1 = 3;
console.log(combinationSum(candidates, target1));

// //--------------------------------------------------------------------------
// //https://leetcode.com/problems/combination-sum-ii/description/
function combinationSum2(candidates, target) {
    const result = [];
    candidates.sort((a, b) => a - b); // Sort to handle duplicates

    function backtrack(start, currentCombo, currentSum) {
        if (currentSum === target) {
            result.push([...currentCombo]); // Found a valid combination
            return;
        }
        if (currentSum > target) {
            return; // Exceeded the target
        }

        for (let i = start; i < candidates.length; i++) {
            // Skip duplicates
            if (i > start && candidates[i] === candidates[i - 1]) continue;

            currentCombo.push(candidates[i]); // Include the candidate
            backtrack(i + 1, currentCombo, currentSum + candidates[i]); // Move to the next index
            currentCombo.pop(); // Backtrack
        }
    }

    backtrack(0, [], 0);
    return result;
}

// Example usage:
const candidates1 = [10, 1, 2, 7, 6, 1, 5];
const t = 8;
console.log(combinationSum2(candidates1, t)); 
// Output: [[1,1,6],[1,2,5],[1,7],[2,6]]

const candidates2 = [2, 5, 2, 1, 2];
const t2 = 5;
console.log(combinationSum2(candidates2, t2)); 
// Output: [[1,2,2],[5]]
