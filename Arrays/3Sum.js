
// Given an array nums, return all unique triplets [nums[i], nums[j], nums[k]] such that i ≠ j ≠ k and nums[i] + nums[j] + nums[k] == 0.

//Time Complexity: O(N3 * log(no. of unique triplets)), where N = size of the array.
//Space Complexity: O(2 * no. of the unique triplets) as we are using a set data structure and a list to store the triplets.
function triplet(n, arr) {
    let st = new Set();
    let ans = []

    // check all possible triplets:
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            for (let k = j + 1; k < n; k++) {
                if (arr[i] + arr[j] + arr[k] === 0) {
                    let temp = [arr[i], arr[j], arr[k]];
                    temp.sort((a, b) => a - b);
                    ans.push(temp);
                }
            }
        }
    }

    //store the set in the answer:
    let set  = new Set(ans.map(JSON.stringify));
    ans = Array.from(set).map(JSON.parse);
    return ans;
}

let arr = [-1, 0, 1, 2, -1, -4];
let n = arr.length;
let ans = triplet(n, arr);
for (let it of ans) {
    process.stdout.write("[");
    for (let i of it) {
        process.stdout.write(i + " ");
    }
    process.stdout.write("] ");
}
console.log();

//optimal 2 pointer
//TC - O(N2) and SC - O(1)
function triplet(n, arr) {
    const ans = [];
    arr.sort((a, b) => a - b); // Step 1: Sort

    for (let i = 0; i < n; i++) {
        // Skip duplicate fixed values
        if (i > 0 && arr[i] === arr[i - 1]) continue;

        let j = i + 1;
        let k = n - 1;

        while (j < k) {
            const sum = arr[i] + arr[j] + arr[k];

            if (sum === 0) {
                ans.push([arr[i], arr[j], arr[k]]);
                j++;
                k--;

                // Skip duplicates
                while (j < k && arr[j] === arr[j - 1]) j++;
                while (j < k && arr[k] === arr[k + 1]) k--;
            } else if (sum < 0) {
                j++;
            } else {
                k--;
            }
        }
    }

    return ans;
}

// Example usage:
const arr1 = [-1, 0, 1, 2, -1, -4];
const n1 = arr.length;
const res1 = triplet(n1, arr1);

for (const triplet of res1) {
    console.log(`[${triplet.join(' ')}]`);
}
