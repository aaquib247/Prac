var subsets = function(nums) {
    let ans = [];

    function subset(current, remaining) {
        // Always add the current subset to the result
        ans.push([...current]);

        for (let i = 0; i < remaining.length; i++) {
            // Include the current number
            current.push(remaining[i]);
            // Recur with the remaining elements after the current one
            subset(current, remaining.slice(i + 1));
            // Backtrack: remove the last element
            current.pop();
        }
    }

    subset([], nums); // Start the recursion with an empty subset
    return ans;
};

// Example usage
const nums1 = [1, 2,3];
console.log(subsets(nums1)); // Output: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]

const nums2 = [0];
console.log(subsets(nums2)); // Output: [[], [0]]