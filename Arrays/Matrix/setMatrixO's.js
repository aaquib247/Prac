//O(m * n) and O(m+n)
function setZeroes(matrix) {
    const rows = new Set();
    const cols = new Set();
    const m = matrix.length;
    const n = matrix[0].length;

    // First pass: mark rows and columns that need to be zeroed
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 0) {
                rows.add(i);
                cols.add(j);
            }
        }
    }

    // Second pass: set zeroes
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (rows.has(i) || cols.has(j)) {
                matrix[i][j] = 0;
            }
        }
    }
}

// Example
const matrix = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1]
];

setZeroes(matrix);
console.log(matrix);
