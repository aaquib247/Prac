//https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/description/

/*Example 1:

Input: cardPoints = [1,2,3,4,5,6,1], k = 3
Output: 12
Explanation: After the first step, your score will always be 1. However, choosing the rightmost card first will maximize your total score. The optimal strategy is to take the three cards on the right, giving a final score of 1 + 6 + 5 = 12.
*/

var maxScore = function (cardPoints, k) {
    let ls = 0;
    let rs = 0;
    let maxSum = 0;

    for (let i = 0; i < k; i++) {
        ls = ls + cardPoints[i]
    }
    maxSum = ls;

    let end = cardPoints.length - 1;
    for (let j = k - 1; j >= 0; j--) {
        ls = ls - cardPoints[j];
        rs = rs + cardPoints[end]
        maxSum = Math.max(maxSum, ls + rs)
        end --;
    }

    return maxSum;

};

//https://leetcode.com/problems/longest-substring-without-repeating-characters/

/*Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.*/

//using Set
var lengthOfLongestSubstring = function (s) {
    if (s.length === 0) return 0;
    let l = 0;
    let r = 0;
    let maxLength = 0;
    let set = new Set();

    for (r = 0; r < s.length; r++) {
        while (set.has(s[r])) {
            set.delete(s[l])
            l = l + 1;
        }
        set.add(s[r])
        maxLength = Math.max(maxLength, r - l + 1)
    }
    return maxLength;
};

// Using Map
var lengthOfLongestSubstring = function (s) {
    if (s.length === 0) return 0;
    let l = 0;
    let r = 0;
    let maxLength = 0;
    let map = new Map();

    for (r = 0; r < s.length; r++) {
        if (map.has(s[r]) && map.get(s[r]) >= l) {
            l = map.get(s[r]) + 1
        }
        map.set(s[r],r)
        maxLength = Math.max(maxLength, r - l + 1)
    }
    return maxLength;
};

// /https://leetcode.com/problems/max-consecutive-ones-iii/description/
/*Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: [1,1,1,0,0,1,1,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.*/
var longestOnes = function(nums, k) {
    let l = 0; 
    let maxLength = 0; 
    let zeroCount = 0; 

    for (let r = 0; r < nums.length; r++) {
        if (nums[r] === 0) {
            zeroCount++;
        }

        // Shrink the window from the left if zeroCount exceeds k
        // this while can we written "if" - the time complexity will be O(N) from O(2N)(while case)
        while (zeroCount > k) {
            if (nums[l] === 0) {
                zeroCount--;
            }
            l++;
        }

        // Update the maximum length of the window
         maxLength = Math.max(maxLength, r - l + 1);
    }

    return maxLength;
};

// Example usage
console.log(longestOnes([1,1,1,0,0,0,1,1,1,1,0], 2)); // Output: 6
console.log(longestOnes([0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], 3)); // Output: 10


// https://leetcode.com/problems/fruit-into-baskets/description/
// Input: fruits = [1,2,3,2,2]
// Output: 4
// Explanation: We can pick from trees [2,3,2,2].
// If we had started at the first tree, we would only pick from trees [1,2].
var totalFruits = function(fruits) {
    let l = 0; // Left pointer of the sliding window
    let maxLength = 0; // Maximum length of subarray with at most two types of fruits
    let fruitCount = new Map(); // Map to count occurrences of each fruit type

    for (let r = 0; r < fruits.length; r++) {
        // Add the current fruit to the map
        fruitCount.set(fruits[r], (fruitCount.get(fruits[r]) || 0) + 1);

        // Shrink the window if we have more than 2 types of fruits
        while (fruitCount.size > 2) {
            fruitCount.set(fruits[l], fruitCount.get(fruits[l]) - 1);
            if (fruitCount.get(fruits[l]) === 0) {
                fruitCount.delete(fruits[l]);
            }
            l++;
        }

        // Update the maximum length of the window
        maxLength = Math.max(maxLength, r - l + 1);
    }

    return maxLength;
};

// Example usage
console.log(totalFruits([1,2,1])); // Output: 3
console.log(totalFruits([0,1,2,2])); // Output: 3
console.log(totalFruits([1,2,3,2,2])); // Output: 4

//https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/description/
function longestSubstringK(str, k) {
    const n = str.length;
    if (k === 0 || n === 0) return 0;

    let maxLength = 0;
    const charMap = new Map(); // To track the frequency of characters
    let left = 0;

    for (let right = 0; right < n; right++) {
        // Add the current character to the map
        charMap.set(str[right], (charMap.get(str[right]) || 0) + 1);

        // Shrink the window if the number of unique characters exceeds k
        while (charMap.size > k) {
            const leftChar = str[left];
            charMap.set(leftChar, charMap.get(leftChar) - 1);
            if (charMap.get(leftChar) === 0) {
                charMap.delete(leftChar);
            }
            left++;
        }

        // Update the maximum length if the current window has exactly k unique characters
        if (charMap.size === k) {
            maxLength = Math.max(maxLength, right - left + 1);
        }
    }

    return maxLength;
}

// Example usage:
const str = 'aaabbbcdef';
const k = 2;
console.log(longestSubstringK(str, k)); // Output: 6 ("aaabbb" has 2 unique characters 'a' and 'b')

//https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/submissions/1377348366/
var numberOfSubstrings = function (s) {
    let l = 0;
    let count = 0;
    let lastSeen = [-1,-1,-1]

for (let r = 0; r < s.length; r++) {
    lastSeen[s[r].charCodeAt(0) - 'a'.charCodeAt(0)] = r;

    // Check if the window contains all three characters
    if (lastSeen[0] != -1 && lastSeen[1] != -1 && lastSeen[2] != -1) {
        count = count + (1 + Math.min(lastSeen[0], lastSeen[1], lastSeen[2]))
    }
}
return count;
};

//https://leetcode.com/problems/longest-repeating-character-replacement/description/
var characterReplacement = function (s, k) {
    let maxLength = 0;

    // Explore all substrings starting from index i
    for (let i = 0; i < s.length; i++) {
        let charCount = {};
        let maxFreq = 0; // Maximum frequency of any single character in the current window
        // Explore all substrings starting from index i and ending at index j
        for (let j = i; j < s.length; j++) {
            // Update character frequency map
            charCount[s[j]] = (charCount[s[j]] || 0) + 1;
            // Update maxFreq
            maxFreq = Math.max(maxFreq, charCount[s[j]]);
            // Number of characters to replace to make all characters the same in the current window
            let windowLength = j - i + 1;
            let changesNeeded = windowLength - maxFreq;
            if (changesNeeded <= k) {
                maxLength = Math.max(maxLength, windowLength);
            }
        }
    }

    return maxLength;
};

//https://leetcode.com/problems/binary-subarrays-with-sum/
//https://leetcode.com/problems/count-number-of-nice-subarrays/description/ - same
function numSubarraysWithSum(nums, goal) {
    let count = 0;
    let sum = 0;
    let map = new Map();
    
    // Initialize the map with sum 0 having one occurrence
    map.set(0, 1);
    
    for (let num of nums) {
        // Update the current sum
        sum += num;
        
        // If (sum - goal) is in the map, it means there are subarrays summing to goal
        if (map.has(sum - goal)) {
            count += map.get(sum - goal);
        }
        
        // Update the map with the current sum
        if (map.has(sum)) {
            map.set(sum, map.get(sum) + 1);
        } else {
            map.set(sum, 1);
        }
    }
    
    return count;
}

// Example usage:
const nums = [1, 0, 1, 0, 1];
const goal = 2;
console.log(numSubarraysWithSum(nums, goal)); // Output: 4

//Subarray with k different integers
function subarraysWithKDistinct(nums, k) {
    function atMostK(k) {
        let count = 0;
        let left = 0;
        const map = new Map();
        
        for (let right = 0; right < nums.length; right++) {
            if (!map.has(nums[right])) {
                map.set(nums[right], 0);
            }
            map.set(nums[right], map.get(nums[right]) + 1);
            
            while (map.size > k) {
                map.set(nums[left], map.get(nums[left]) - 1);
                if (map.get(nums[left]) === 0) {
                    map.delete(nums[left]);
                }
                left++;
            }
            
            count += right - left + 1;
        }
        
        return count;
    }
    
    return atMostK(k) - atMostK(k - 1);
}

// Example usage:
const num = [1, 2, 1, 2, 3];
const k1 = 2;
console.log(subarraysWithKDistinct(num, k1)); // Output: 7
