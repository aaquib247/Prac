class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    add(word) {
        let node = this.root;

        for (let ch of word) {
            if (!node.children[ch]) {
                node.children[ch] = new TrieNode();
            }

            node = node.children[ch];
        }

        node.isEndOfWord = true;
    }

    autoComplete(prefix) {
        let node = this.root;

        // 1. Find the node where prefix ends
        for (let ch of prefix) {
            if (!node.children[ch]) {
                return [];
            }

            node = node.children[ch];
        }

        // 2. DFS from that node
        let result = [];

        this.dfs(node, prefix, result);

        return result;
    }

    dfs(node, word, result) {

        // We found a complete word
        if (node.isEndOfWord) {
            result.push(word);
        }

        // Visit all children
        for (let ch in node.children) {
            this.dfs(
                node.children[ch],
                word + ch,
                result
            );
        }
    }
}

const trie = new Trie();

trie.add("apple");
trie.add("app");
trie.add("application");
trie.add("ape");
trie.add("bat");

console.log(trie.autoComplete("app"));
// Trie for trie.add("apple");
// trie.add("app");
// trie.add("application");
// trie.add("ape");
// trie.add("bat");

// The trie structure would look like this:
//
//        root
//         |
//         a
//         |
//         p
//        / \
//       p   e (isEndOfWord: true)
//       |
//       l
//       |
//       e (isEndOfWord: true)
//       |
//       i
//       |
//       c
//       |
//       a
//       |
//       t
//       |
//       i
//       |
//       o
//       |
//       n (isEndOfWord: true)
// 
//         b
//         |
//         a
//         |
//         t (isEndOfWord: true)
