function ladderLength(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;

    const queue = [[beginWord, 1]];
    const visited = new Set();
    visited.add(beginWord);

    while (queue.length > 0) {
        const [currentWord, level] = queue.shift();

        for (let i = 0; i < currentWord.length; i++) {
            const originalChar = currentWord.charAt(i); // Extract the character using charAt

            for (let c = 'a'; c <= 'z'; c++) {
                if (c === originalChar) continue; // Skip if the character is the same

                const newWord = currentWord.slice(0, i) + c + currentWord.slice(i + 1);

                if (newWord === endWord) return level + 1;

                if (wordSet.has(newWord) && !visited.has(newWord)) {
                    visited.add(newWord);
                    queue.push([newWord, level + 1]);
                }
            }
        }
    }

    return 0;
}
