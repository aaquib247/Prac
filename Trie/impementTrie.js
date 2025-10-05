class TrieNode {
  constructor() {
    this.children = {}; // Map from char to TrieNode
    this.isEndOfWord = false; // True if node represents end of a word
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // Insert a word into the trie
  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  // Search for a whole word in the trie, returns true if found
  search(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  // Check if there is any word in the trie that starts with the given prefix
  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return true;
  }
}

// Example usage:
const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple"));   // true
console.log(trie.search("app"));     // false
console.log(trie.startsWith("app")); // true
trie.insert("app");
console.log(trie.search("app"));     // true


// | Operation  | Time Complexity | Space Complexity (Auxiliary) |
// | ---------- | --------------- | ---------------------------- |
// | Insert     | O(m)            | O(m)                         |
// | Search     | O(m)            | O(1)                         |
// | StartsWith | O(m)            | O(1)                         |
