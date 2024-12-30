//subsequence with a sum k (2 in below case :: output is [1,1] and [2])

function sum(p, up, s) {
    if (up.length === 0) {
        if (s === 2) {
            console.log(p);
            return;
        }
        else
            return;
    }
    let ch = up[0];
    add = add + ch;
    sum(p.concat([ch]), up.slice(1), add );

    add = add - ch;
    sum(p, up.slice(1), add);
}
let add = 0;
sum([], [1, 2, 1]);

//subsequence with a sum k but print only one  (2 in below case :: output is [1,1] and not [2])

// function sum(p, up, s) {
//     if (up.length === 0) {
//         if (s === 2) {
//             console.log(p);
//             return true;
//         }
//         return false;
//     }
//     let ch = up[0];
//     add = add + ch;
//     if (sum(p.concat([ch]), up.slice(1), add))
//         return true

//     add = add - ch;
//     if(sum(p, up.slice(1), add) === true)
//     return true

//      return false; //if both left and right didnt get true then return false

// }
// let add = 0;
// sum([], [1, 2, 1]);


//Number of subseq with sum k;
function countSubsequencesWithSum(p, up, s, targetSum) {
    if (up.length === 0) {
        // Base case: If no more elements and the sum equals targetSum, count as 1
        return s === targetSum ? 1 : 0;
    }

    let ch = up[0];

    let includeCount = countSubsequencesWithSum(p.concat([ch]), up.slice(1), s + ch, targetSum);

    let excludeCount = countSubsequencesWithSum(p, up.slice(1), s, targetSum);

    return includeCount + excludeCount;
}

// Example usage
let targetSum = 2;
let result = countSubsequencesWithSum([], [1, 2, 1], 0, targetSum);
console.log(result); // Output: 2

