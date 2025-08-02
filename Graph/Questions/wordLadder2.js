function findLadders(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return [];

    let result = [];
    let queue = [[beginWord]];
    let visited = new Set();
    let found = false;

    while (queue.length && !found) {
        let nextQueue = [];
        let levelVisited = new Set();

        for (let path of queue) {
            let lastWord = path[path.length - 1];

            // Try changing every letter in the word
            for (let i = 0; i < lastWord.length; i++) {
                for (let c = 97; c <= 122; c++) {
                    let newChar = String.fromCharCode(c);
                    if (newChar === lastWord[i]) continue;

                    let newWord = lastWord.slice(0, i) + newChar + lastWord.slice(i + 1);

                    if (wordSet.has(newWord) && !visited.has(newWord)) {
                        let newPath = [...path, newWord];

                        if (newWord === endWord) {
                            found = true;
                            result.push(newPath);
                        } else {
                            nextQueue.push(newPath);
                            levelVisited.add(newWord);
                        }
                    }
                }
            }
        }

        for (let word of levelVisited) {
            visited.add(word);
        }

        queue = nextQueue;
    }

    return result;
}
// Example usage:
const beginWord = "hit";
const endWord = "cog";
const wordList = ["hot", "dot", "dog", "lot", "log", "cog"];
console.log(findLadders(beginWord, endWord, wordList));
// Expected output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
// Note: The output may vary in order, but all valid paths should be included.  