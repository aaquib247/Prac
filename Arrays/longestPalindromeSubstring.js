//TC: O(n²) | SC: O(1)

var longestPalindrome = function(s) {
    let start = 0;
    let maxLen = 0;
    
    function expandAroundCenter(left, right) {
        // Expand while characters match
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            if (right - left + 1 > maxLen) {
                maxLen = right - left + 1;
                start = left;
            }
            left--;
            right++;
        }
    }
    
    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i);     // Odd length: "aba"
        expandAroundCenter(i, i + 1); // Even length: "abba"
    }
    
    return s.substring(start, start + maxLen);
};

console.log(longestPalindrome("babad")); // "bab"
console.log(longestPalindrome("cbbd"));  // "bb"
console.log(longestPalindrome("racecar")); // "racecar"