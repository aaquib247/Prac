/**
 * @param {number[][]} grid
 * @return {number}
 */


var shortestPathBinaryMatrix = function (grid) {
    let n = grid.length;
    let m = grid[0].length;
    let visited = Array.from({ length: n }, () => new Array(m).fill(false))
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1], // up, down, left, right
        [-1, -1], [-1, 1], [1, -1], [1, 1] // 4 diagonals
    ];

    if(grid[0][0] === 1 || grid[n-1][m-1] === 1)
     return -1;

    const queue = [[0, 0, 1]]; // [row, col, distance]
    visited[0][0] = true;

    while (queue.length > 0) {
        let [row, col, dist] = queue.shift();

        if (row === n - 1 && col === m - 1)
            return dist;

        for (let [dr, dc] of directions) {
            let x = dr + row;
            let y = dc + col;

            if (x >= 0 && x < n && y >= 0 && y < m && grid[x][y] === 0 && !visited[x][y]) {
                visited[x][y] = true;
                queue.push([x, y, dist + 1])
            }
        }
    }
     return -1
};

console.log(shortestPathBinaryMatrix([[0, 1], [1, 0]])) // Output: 2
console.log(shortestPathBinaryMatrix([[0, 0, 0], [1, 1, 0], [1, 1, 0]])) // Output: 4
console.log(shortestPathBinaryMatrix([[1, 0, 0], [1, 1, 0], [1, 1, 0]])) // Output: -1