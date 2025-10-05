class TrieNode {
  constructor() {
    this.children = {};         // Map from char to TrieNode
    this.wordCount = 0;         // Number of times a word ends here
    this.prefixCount = 0;       // Number of words with this prefix
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
      node.prefixCount += 1;
    }
    node.wordCount += 1;
  }

  // Count how many times a word was inserted
  countWordsEqualTo(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) return 0;
      node = node.children[char];
    }
    return node.wordCount;
  }

  // Count how many words start with a given prefix
  countWordsStartingWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) return 0;
      node = node.children[char];
    }
    return node.prefixCount;
  }

  // Erase one occurrence of a word from the trie
 erase(word) {
  if (this.countWordsEqualTo(word) === 0) return;

  let node = this.root;
  for (const char of word) {
    const child = node.children[char];
    child.prefixCount -= 1;
    node = child;
  }
  node.wordCount -= 1;
}

  // Search if a full word exists
  search(word) {
    return this.countWordsEqualTo(word) > 0;
  }

  // Check if any word starts with a given prefix
  startsWith(prefix) {
    return this.countWordsStartingWith(prefix) > 0;
  }
}

// ✅ Example usage:
const trie = new Trie();
trie.insert("apple");
trie.insert("apple");
trie.insert("app");
trie.insert("apex");

console.log(trie.countWordsEqualTo("apple"));     // 2
console.log(trie.countWordsStartingWith("app"));  // 3
console.log(trie.countWordsEqualTo("app"));       // 1

trie.erase("apple");
console.log(trie.countWordsEqualTo("apple"));     // 1

trie.erase("apple");
console.log(trie.countWordsEqualTo("apple"));     // 0
