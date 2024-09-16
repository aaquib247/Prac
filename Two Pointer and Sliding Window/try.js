// function longestSubstringK(str, k) {
//     let maxLength = 0;


//     for (let i = 0; i < str.length; i++) {
//         let map = new Map();
//         for (let j = i; j < str.length; j++) {

//             map.set(str[j], (map.get(str[j]) || 0) + 1);

//             if (map.size > k) {
//                 break;
//             }
//             maxLength = Math.max(maxLength, j - i + 1);
//         }
//     }

//     return maxLength;
// }

// let str = 'aaabbbcdef';
// let k = 2;

// console.log(longestSubstringK(str, k)); // Output: 6 ("aaabbb" has 2 unique characters 'a' and 'b')



// // Str = “aaabbbcdef”, k = 3

// function longestSubstringK(str, k) {
//     let maxLength = 0;
//     let i = 0;
//     let j = 0;
//     for (i = 0; i < str.length; i++) {
//         let set = new Set();
//         for (j = i; j < str.length; j++) {
//             set.add(str[j])
//             if (set.size > k) {
//               break;
//             }
//             maxLength = Math.max(maxLength, j - i + 1)
//         }
//     }
//     return maxLength;
// }

// let str = 'aaabbbcdef'
// let k = 2;

// console.log(longestSubstringK(str, k))
//---------------------------------------------------------------------------
// function countSubstringsContainingAllThreeCharacters(str) {
//     let count = 0;
//     let i = 0;
//     let j = 0;
//     for (i = 0; i < str.length; i++) {
//         let set = new Set();
//         for (j = i; j < str.length; j++) {
//             set.add(str[j])
//             if (set.size === 3) {
//               count++
//             }
//         }
//     }
//     return count;
// }
// const str = "abc";
// console.log(countSubstringsContainingAllThreeCharacters(str));

// function countSubstringsContainingAllThreeCharacters(str) {
//     let count = 0;
//     let l = 0;
//     let r = 0;
//     let set = new Set();
//     for (r = 0; r < str.length; r++) {
//         set.add(str[r])
//         if(set.size === 3)
//         {
//             count = str.length - r;
//             break;
//         }
      
//     }
//     return count;
// }
// // const str = "abc";
// const str = "abcabc";
// console.log(countSubstringsContainingAllThreeCharacters(str));


// var characterReplacement = function (str, k) {
//     let maxLength = 0;


//     for (let i = 0; i < str.length; i++) {
//         let charCount = Array(26).fill(0);
//         let maxF = 0;

//         for (let j = i; j < str.length; j++) {
//             // Update character frequency
//             charCount[str[j].charCodeAt(0) - 'A'.charCodeAt(0)]++;

//             maxF = Math.max(maxF, charCount[str[j].charCodeAt(0) - 'A'.charCodeAt(0)]);

//             let changes = (j - i + 1) - maxF;

//             if (changes <= k) {
//                 maxLength = Math.max(maxLength, j - i + 1);
//             }
//         }
//     }

//     return maxLength;
// };

// console.log(characterReplacement("AABABBA",2));


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
console.log(subarraysWithKDistinct([1,2,1,2,3],2))
