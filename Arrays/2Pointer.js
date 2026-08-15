// TEMPLATE: Same Direction (Slow & Fast Pointers)
function slowFast(arr) {
    let slow = 0;
    let fast = 0;
    
    while (fast < arr.length) {
        if (condition) {
            slow++;
        }
        fast++;
    }
    
    return slow; // or arr[0...slow]
}

// Problems: Remove Duplicates, Move Zeroes, Valid Palindrome
// Used when: Modifying array in-place, removing/moving elements

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. REMOVE DUPLICATES (LC 26)
var removeDuplicates = function(nums) {
    let slow = 0;
    let fast = 1;
    
    while (fast < nums.length) {
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
        fast++;
    }
    
    return slow + 1; // Return length of array with duplicates removed
};

// Example:
// Input: [1,1,2]
// Output: 2, nums = [1,2,_]
// Explanation: slow moves only when we find new element

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 2. MOVE ZEROES (LC 283)
var moveZeroes = function(nums) {
    let slow = 0; // Pointer to place non-zero element
    let fast = 0; // Pointer to find non-zero element
    
    // First pass: move all non-zero elements to front
    while (fast < nums.length) {
        if (nums[fast] !== 0) {
            nums[slow] = nums[fast];
            slow++;
        }
        fast++;
    }
    
    // Second pass: fill remaining positions with 0
    while (slow < nums.length) {
        nums[slow] = 0;
        slow++;
    }
};

// Example:
// Input: [0,1,0,3,12]
// Output: [1,3,12,0,0]
// Explanation: slow tracks where to place non-zero, fast scans array

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 3. VALID PALINDROME (LC 125)
// Note: This one uses OPPOSITE ENDS template (left & right)
// But showing for comparison

var isPalindrome = function(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Skip non-alphanumeric from left
        while (left < right && !isAlphaNumeric(s[left])) {
            left++;
        }
        
        // Skip non-alphanumeric from right
        while (left < right && !isAlphaNumeric(s[right])) {
            right--;
        }
        
        // Compare characters (case-insensitive)
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
};

function isAlphaNumeric(char) {
    return /[a-zA-Z0-9]/.test(char);
}

// Example:
// Input: "A man, a plan, a canal: Panama"
// Output: true
// Explanation: This uses OPPOSITE ENDS (left & right from different sides)

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// TEST CASES
console.log("=== Remove Duplicates ===");
let arr1 = [1,1,2];
console.log(removeDuplicates(arr1)); // 2
console.log(arr1); // [1,2,_]

console.log("\n=== Move Zeroes ===");
let arr2 = [0,1,0,3,12];
moveZeroes(arr2);
console.log(arr2); // [1,3,12,0,0]

console.log("\n=== Valid Palindrome ===");
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome(" ")); // true