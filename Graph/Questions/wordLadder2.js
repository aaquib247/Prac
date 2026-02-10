var findLadders = function(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return [];
    
    // PHASE 1: BFS - Find shortest distance and build parent map
    
    const distance = new Map();     // word -> steps from beginWord
    const parents = new Map();       // word -> [words that can reach it in shortest path]
    
    distance.set(beginWord, 0);
    const queue = [beginWord];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const levelVisited = new Set();  // Track words found at THIS level
        
        // Process entire level at once
        for (let i = 0; i < levelSize; i++) {
            const word = queue.shift();
            const dist = distance.get(word);
            
            // If we've already found endWord at a previous level, stop
            if (word === endWord) continue;
            
            // Try all single-letter transformations
            for (let j = 0; j < word.length; j++) {
                for (let c = 97; c <= 122; c++) {
                    const newChar = String.fromCharCode(c);
                    if (newChar === word[j]) continue;
                    
                    const newWord = word.slice(0, j) + newChar + word.slice(j + 1);
                    
                    if (!wordSet.has(newWord)) continue;
                    
                    // First time seeing this word
                    if (!distance.has(newWord)) {
                        distance.set(newWord, dist + 1);
                        levelVisited.add(newWord);
                    }
                    
                    // If this word is at the right distance, add parent
                    if (distance.get(newWord) === dist + 1) {
                        if (!parents.has(newWord)) {
                            parents.set(newWord, []);
                        }
                        parents.get(newWord).push(word);
                    }
                }
            }
        }
        
        // Add all words found at this level to queue
        for (let word of levelVisited) {
            queue.push(word);
        }
        
        // If we found endWord at this level, we can stop BFS
        if (distance.has(endWord)) break;
    }
    
    // If endWord not reachable
    if (!distance.has(endWord)) return [];
    
    // PHASE 2: Backtrack to reconstruct all shortest paths
    
    const result = [];
    const currentPath = [endWord];
    
    function buildPaths(word) {
        // Base case: reached the beginning
        if (word === beginWord) {
            result.push([...currentPath].reverse());
            return;
        }
        
        // No parents means no path (shouldn't happen if endWord is reachable)
        if (!parents.has(word)) return;
        
        // Try all parents
        for (let parent of parents.get(word)) {
            currentPath.push(parent);
            buildPaths(parent);
            currentPath.pop();  // Backtrack
        }
    }
    
    buildPaths(endWord);
    return result;
};

console.log(findLadders("hit", "cog", ["hot","dot","dog","lot","log","cog"])); // [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]