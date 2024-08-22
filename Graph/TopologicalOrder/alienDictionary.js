function findOrder(N, K, dict) {
    const graph = Array.from({ length: K }, () => []);
    const inDegree = Array(K).fill(0);
    const charIndex = new Map();
    
    // Map each character to its index
    for (let i = 0; i < K; i++) {
        charIndex.set(String.fromCharCode(97 + i), i); // 97 is ASCII for 'a'
    }

    // Build the graph and compute in-degrees
    for (let i = 0; i < N - 1; i++) {
        const word1 = dict[i];
        const word2 = dict[i + 1];
        let minLength = Math.min(word1.length, word2.length);
        
        for (let j = 0; j < minLength; j++) {
            if (word1[j] !== word2[j]) {
                const u = charIndex.get(word1[j]);
                const v = charIndex.get(word2[j]);
                graph[u].push(v);
                inDegree[v]++;
                break;
            }
        }
    }

    // Kahn's Algorithm for Topological Sorting
    const queue = [];
    const order = [];

    for (let i = 0; i < K; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    while (queue.length > 0) {
        const u = queue.shift();
        order.push(String.fromCharCode(97 + u));

        for (const v of graph[u]) {
            inDegree[v]--;
            if (inDegree[v] === 0) {
                queue.push(v);
            }
        }
    }

    // Check if we have a valid topological order
    if (order.length === K) {
        return 1; // Order is valid
    } else {
        return 0; // No valid order
    }
}

// Example usage:
const N1 = 5, K1 = 4, dict1 = ["baa","abcd","abca","cab","cad"];
console.log(findOrder(N1, K1, dict1)); // Output: 1

const N2 = 3, K2 = 3, dict2 = ["caa","aaa","aab"];
console.log(findOrder(N2, K2, dict2)); // Output: 1
