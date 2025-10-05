function findMaximumNum(str, k) {
    let maxNum = str;

    function helper(arr, k, index) {
        if (k === 0) return;

        let n = arr.length;
        let maxDigit = arr[index];

        // Find max digit in remaining part
        for (let i = index + 1; i < n; i++) {
            if (arr[i] > maxDigit) {
                maxDigit = arr[i];
            }
        }

        // Only swap if there's a better digit
        if (maxDigit !== arr[index]) k--;

        for (let i = index + 1; i < n; i++) {
            if (arr[i] === maxDigit) {
                // Swap
                [arr[i], arr[index]] = [arr[index], arr[i]];

                const current = arr.join('');
                if (current > maxNum) maxNum = current;

                // Recurse
                helper(arr, k, index + 1);

                // Backtrack
                [arr[i], arr[index]] = [arr[index], arr[i]];
            }
        }
    }

    helper(str.split(''), k, 0);
    return maxNum;
}

console.log(findMaximumNum("123", 1));   // Output: "321"
console.log(findMaximumNum("254", 1));   // Output: "524"
console.log(findMaximumNum("2736", 2));  // Output: "7632"
