//In this problem, we are given a string s of lowercase English letters. We want to partition the string into as many parts as 
// possible so that each letter appears in at most one part, and return a list of integers representing the size of these parts.

//Intuition: The idea is to record the last occurrence of each character in the string. Then, we can iterate through the string and
//  keep track of the maximum last occurrence of the characters we have seen so far. When we reach the end of a partition 
// (i.e., when the current index matches the maximum last occurrence), we can cut the partition and start a new one.

//Time Complexity: O(n) where n is the length of the string s. We traverse the string twice, 
// once to record the last occurrence of each character and once to create the partitions.
//Space Complexity: O(1) since the size of the last occurrence map is limited to 26 characters (lowercase English letters).

function partitionLabels(s) {
    // step 1 — record last occurrence of each character
    const last = {};
    for (let i = 0; i < s.length; i++) {
        last[s[i]] = i;
    }

    const result = [];
    let start = 0;
    let end   = 0;

    for (let i = 0; i < s.length; i++) {
        // extend partition to include last occurrence
        end = Math.max(end, last[s[i]]);

        // reached end of partition — cut here
        if (i === end) {
            result.push(end - start + 1);
            start = i + 1;
        }
    }

    return result;
}

console.log(partitionLabels("ababcbacadefegdehijhklij")); // [9,7,8]
