class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class WordDictionary {
  constructor() {
    this.root = new TrieNode();
  }

  addWord(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(word) {
    return this._searchHelper(word, 0, this.root);
  }

  _searchHelper(word, index, node) {
    if (index === word.length) {
      return node.isEndOfWord;
    }

    const char = word[index];
    if (char === '.') {
      // '.' can match any character, so check all children
      for (const child in node.children) {
        if (this._searchHelper(word, index + 1, node.children[child])) {
          return true;
        }
      }
      return false;
    } else {
      // regular character must match exactly
      if (!node.children[char]) return false;
      return this._searchHelper(word, index + 1, node.children[char]);
    }
  }
}

// Usage example:
const wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");

console.log(wordDictionary.search("pad")); // false
console.log(wordDictionary.search("bad")); // true
console.log(wordDictionary.search(".ad")); // true (matches "bad", "dad", "mad")
console.log(wordDictionary.search("b..")); // true (matches "bad")
