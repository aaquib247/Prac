/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxDistance = function (grid) {
    let n = grid.length;
    let dir = [[1, 0], [0, 1], [-1, 0], [0, -1]]
    let q = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                q.push([i, j, 0])
            }
        }
    }
    if (q.length === 0 || q.length === n * n) return -1;
    let max = -Infinity;
    while (q.length > 0) {
        let [i, j, d] = q.shift();
        max = Math.max(max, d);

        for (const [dr, dc] of dir) {
            let row = dr + i;
            let col = dc + j;

            if (row >= 0 && row < n && col >= 0 && col < n &&  grid[row][col] === 0) {
                 grid[row][col] === 1;
                q.push([row, col, d+1])
            }
        }
    }

    return max;

};

console.log(maxDistance([[1, 0, 1], [0, 0, 0], [1, 0, 1]])) //output: 2
console.log(maxDistance([[1, 0, 0], [0, 0, 0], [0, 0, 0]])) //output: 4

//https://leetcode.com/problems/as-far-from-land-as-possible/description/   

//TC: O(N*M)
//SC: O(N*M)    