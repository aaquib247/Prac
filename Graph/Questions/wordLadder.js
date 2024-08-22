//https://leetcode.com/problems/word-ladder/

function shortestTransformationSequence(wordList, startWord, targetWord) {
    const wordSet = new Set(wordList); // Convert list to set for O(1) lookups
    if (!wordSet.has(targetWord)) return 0; // If targetWord is not in the wordList, return 0

    const queue = [[startWord, 1]]; // Queue stores tuples of (currentWord, currentLevel)
    const visited = new Set(); // Set to keep track of visited words
    visited.add(startWord);

    while (queue.length > 0) {
        const [currentWord, level] = queue.shift();

        // Try all possible single letter changes
        for (let i = 0; i < currentWord.length; i++) {
            for (let charCode = 'a'.charCodeAt(0); charCode <= 'z'.charCodeAt(0); charCode++) {
                const newChar = String.fromCharCode(charCode);
                if (newChar === currentWord[i]) continue; // Skip the same character
                
                const newWord = currentWord.slice(0, i) + newChar + currentWord.slice(i + 1);
                
                // Check if the new word is the target
                if (newWord === targetWord) {
                    return level + 1;
                }

                // If the new word is in the wordList and hasn't been visited
                if (wordSet.has(newWord) && !visited.has(newWord)) {
                    visited.add(newWord);
                    queue.push([newWord, level + 1]);
                }
            }
        }
    }

    return 0; // Return 0 if there is no valid transformation sequence
}

// Example usage
const wordList1 = ["des", "der", "dfr", "dgt", "dfs"];
const startWord1 = "der";
const targetWord1 = "dfs";
console.log(shortestTransformationSequence(wordList1, startWord1, targetWord1)); // Output: 3

const wordList2 = ["geek", "gefk"];
const startWord2 = "gedk";
const targetWord2 = "geek";
console.log(shortestTransformationSequence(wordList2, startWord2, targetWord2)); // Output: 2

const wordList3 = ["poon", "plee", "same", "poie", "plea", "plie", "poin"];
const startWord3 = "toon";
const targetWord3 = "plea";
console.log(shortestTransformationSequence(wordList3, startWord3, targetWord3)); // Output: 7
