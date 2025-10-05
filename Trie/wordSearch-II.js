// Word Search II - Find all words from the list on the board

// Trie Node class
class TrieNode {
  constructor() {
    this.children = {};
    this.word = null; // store complete word at the end node
  }
}

// Build Trie from words list
function buildTrie(words) {
  const root = new TrieNode();
  for (const word of words) {
    let node = root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.word = word; // mark end of word
  }
  return root;
}

// Main function to find words in the board
function findWords(board, words) {
  const root = buildTrie(words);
  const result = new Set();
  const rows = board.length;
  const cols = board[0].length;

  // DFS helper function
  function dfs(r, c, node) {
    // Boundary and visited checks
    if (r < 0 || c < 0 || r >= rows || c >= cols) return;
    const char = board[r][c];
    if (char === '#' || !node.children[char]) return;

    node = node.children[char];
    // If end of word found, add to result
    if (node.word !== null) {
      result.add(node.word);
      node.word = null; // avoid duplicates
    }

    board[r][c] = '#'; // mark visited

    // Explore neighbors (up, down, left, right)
    dfs(r + 1, c, node);
    dfs(r - 1, c, node);
    dfs(r, c + 1, node);
    dfs(r, c - 1, node);

    board[r][c] = char; // backtrack
  }

  // Run DFS from every cell
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dfs(r, c, root);
    }
  }

  return Array.from(result);
}

// Example usage:

const board = [
  ['o', 'a', 'a', 'n'],
  ['e', 't', 'a', 'e'],
  ['i', 'h', 'k', 'r'],
  ['i', 'f', 'l', 'v']
];

const words = ["oath", "pea", "eat", "rain"];

const foundWords = findWords(board, words);
console.log(foundWords); // Output: [ 'oath', 'eat' ]
