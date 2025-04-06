//Given an array nums of n integers and an integer target, 
// return all unique quadruplets [a, b, c, d] such that a + b + c + d == target.

//Brute like 3sum so TC and set of sc

//Optimal using 4 pointers like 3 pointers in 3 sum
// TC - O(N3) (also nlogn - sorting) --> so TC -O (N3) and Sc -O(1)
function fourSum(nums, target) {
    const n = nums.length;
    const ans = [];

    // Sort the array
    nums.sort((a, b) => a - b);

    // Find all quadruplets
    for (let i = 0; i < n; i++) {
        // Skip duplicates for i
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        for (let j = i + 1; j < n; j++) {
            // Skip duplicates for j
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;

            let k = j + 1;
            let l = n - 1;

            while (k < l) {
                const sum = nums[i] + nums[j] + nums[k] + nums[l];

                if (sum === target) {
                    ans.push([nums[i], nums[j], nums[k], nums[l]]);
                    k++;
                    l--;

                    // Skip duplicates for k and l
                    while (k < l && nums[k] === nums[k - 1]) k++;
                    while (k < l && nums[l] === nums[l + 1]) l--;
                } else if (sum < target) {
                    k++;
                } else {
                    l--;
                }
            }
        }
    }

    return ans;
}

// Sample input
const nums = [4, 3, 3, 4, 4, 2, 1, 2, 1, 1];
const target = 9;
const result = fourSum(nums, target);

// Output result
console.log("The quadruplets are:");
for (let quad of result) {
    console.log(`[${quad.join(" ")}]`);
}


