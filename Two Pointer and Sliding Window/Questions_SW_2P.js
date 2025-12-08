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

//OptimalSolution
//Idea is to do min number of changes. Till r, check the length - max and if its greater than k , we need to shrink
var characterReplacement = function (s, k) {

    let l = 0;
    let r = 0;
    let max = 0;
    let freq = {};
    let maxLength = 0;

    for (r = 0; r < s.length; r++) {
        freq[s[r]] = (freq[s[r]] || 0) + 1;
        max = Math.max(max, freq[s[r]]);

        if ((r - l + 1) - max > k) {
            freq[s[l]] = freq[s[l]] - 1;
            l++;
        }

        maxLength = Math.max(maxLength, r - l + 1)
    }

    return maxLength;

};

//https://leetcode.com/problems/binary-subarrays-with-sum/
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

//https://leetcode.com/problems/count-number-of-nice-subarrays/description/ - same way as above or 
// without map it can be implementted like the below where we make space complex as O(1)
var numberOfSubarrays = function (nums, k) {
    let res = test(nums, k) - test(nums, k - 1)
    return res;
};

function test(nums, k) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % 2 === 0)
            nums[i] = 0;
        else
            nums[i] = 1
    }
    let sum = 0; count = 0;
    let r = 0, l = 0
    for (r = 0; r < nums.length; r++) {
        sum += nums[r]

        while (sum > k) {
            sum = sum - nums[l]
            l = l + 1
        }
        count += r - l + 1;
    }

    return count;

}

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


//1456. Maximum Number of Vowels in a Substring of Given Length
// Example 1:

// Input: s = "abciiidef", k = 3
// Output: 3
// Explanation: The substring "iii" contains 3 vowel letters.
// Example 2:

// Input: s = "aeiou", k = 2
// Output: 2
// Explanation: Any substring of length 2 contains 2 vowels.
// Example 3:

// Input: s = "leetcode", k = 3
// Output: 2
// Explanation: "lee", "eet" and "ode" contain 2 vowels.

var maxVowels = function (s, k) {
    const vowel = new Set(['a', 'e', 'i', 'o', 'u']);  // Correct set of vowels
    let l = 0;
    let count = 0;
    let max = 0;

    for (let r = 0; r < s.length; r++) {
        if (vowel.has(s[r])) {
            count++;
        }

        if (r - l + 1 > k) {
            if (vowel.has(s[l])) count--;
            l++;
        }

        max = Math.max(max, count);
    }

    return max;
};

//Minimum Window Questions -- finding min/shortest window

//leetcode.com/problems/minimum-window-substring/
function minWindow(s, t) {
    if (t.length > s.length) return "";

    const need = new Map();
    for (let c of t) {
        need.set(c, (need.get(c) || 0) + 1);
    }

    const window = new Map();
    let have = 0;
    let needCount = need.size;
    let res = [-1, -1];
    let resLen = Infinity;
    let left = 0;

    for (let right = 0; right < s.length; right++) {
        let c = s[right];
        window.set(c, (window.get(c) || 0) + 1);

        if (need.has(c) && window.get(c) === need.get(c)) {
            have++;
        }

        // shrink the window when we have all needed characters
        while (have === needCount) {
            // update result
            if ((right - left + 1) < resLen) {
                res = [left, right];
                resLen = right - left + 1;
            }

            // pop from left
            let leftChar = s[left];
            window.set(leftChar, window.get(leftChar) - 1);
            if (need.has(leftChar) && window.get(leftChar) < need.get(leftChar)) {
                have--;
            }
            left++;
        }
    }

    let [start, end] = res;
    return resLen === Infinity ? "" : s.slice(start, end + 1);
}

console.log(minWindow("ADOBECODEBANC","ABC"))

//The Substring with All Characters from t (Permutation Problem)

function findAnagrams(s, t) {
    if (s.length < t.length) return []; // If s is smaller than t, no anagrams are possible

    const result = [];
    const tFrequency = new Map();
    const sFrequency = new Map();
    
    // Build frequency map for string t
    for (let char of t) {
        tFrequency.set(char, (tFrequency.get(char) || 0) + 1);
    }

    // Initialize the sliding window
    let left = 0;
    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];
        // Update frequency map for current window in s
        sFrequency.set(rightChar, (sFrequency.get(rightChar) || 0) + 1);

        // Shrink the window from the left if the window size exceeds the length of t
        if (right - left + 1 > t.length) {
            const leftChar = s[left];
            sFrequency.set(leftChar, sFrequency.get(leftChar) - 1);
            if (sFrequency.get(leftChar) === 0) {
                sFrequency.delete(leftChar);
            }
            left++; // Move the left pointer to shrink the window
        }

        // Check if the current window matches the frequency map of t
        if (right - left + 1 === t.length && isEqual(sFrequency, tFrequency)) {
            result.push(s.slice(left, right + 1)); // Found a valid substring, add it to result
        }
    }

    return result;
}

// Helper function to compare two frequency maps
function isEqual(map1, map2) {
    if (map1.size !== map2.size) return false;
    for (let [key, value] of map1) {
        if (map2.get(key) !== value) return false;
    }
    return true;
}

// Test cases
// let s = "cbaebabacd", t = "abc";
// console.log(findAnagrams(s, t));  // ["cba", "bac"]

// let s = "abab", t = "ab";
// console.log(findAnagrams(s, t));  // ["ab", "ba", "ab"]

//https://leetcode.com/problems/permutation-in-string/description/
function checkInclusion(s1, s2) {
    if (s2.length < s1.length) return false;

    const tFrequency = new Map();
    const sFrequency = new Map();

    for (let char of s1) {
        tFrequency.set(char, (tFrequency.get(char) || 0) + 1);
    }

    let left = 0;

    for (let right = 0; right < s2.length; right++) {
        const rightChar = s2[right];
        sFrequency.set(rightChar, (sFrequency.get(rightChar) || 0) + 1);

        if (right - left + 1 > s1.length) {
            const leftChar = s2[left];
            sFrequency.set(leftChar, sFrequency.get(leftChar) - 1);
            if (sFrequency.get(leftChar) === 0) {
                sFrequency.delete(leftChar);
            }
            left++;
        }

        if (right - left + 1 === s1.length && isEqual(sFrequency, tFrequency)) {
            return true; // Found at least one permutation
        }
    }

    return false;
}

// Helper function (same as before)
function isEqual(map1, map2) {
    if (map1.size !== map2.size) return false;
    for (let [key, value] of map1) {
        if (map2.get(key) !== value) return false;
    }
    return true;
}

// Test
console.log(checkInclusion("ab", "eidbaooo"));  // true
console.log(checkInclusion("ab", "eidboaoo"));  // false



//https://leetcode.com/problems/sliding-window-maximum/
function maxSlidingWindow(nums, k) {
    const n = nums.length;
    const result = [];
    const deque = []; // Will store indices

    for (let i = 0; i < n; i++) {
        // Remove indices that are out of the current window
        if (deque.length && deque[0] === i - k) {
            deque.shift();
        }

        // Remove indices whose corresponding values are less than nums[i]
        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }

        // Add current index to deque
        deque.push(i);

        // If window has hit size k, add current max to result
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }

    return result;
}

// Example usage
// const arr = [4, 0, -1, 3, 5, 3, 6, 8];
// const k = 3;
// const ans = maxSlidingWindow(arr, k);

// console.log(`Maximum element in every ${k} window:`);
// console.log(ans.join("  "));

// Test case
// let nums = [1,3,-1,-3,5,3,6,7], k = 3;
// console.log(maxSlidingWindow(nums, k));  // Output: [3, 3, 5, 5, 6, 7]