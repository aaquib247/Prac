/**
 * @param {number[][]} rooms
 * @return {void} Do not return anything, modify rooms in-place instead.
 */
var wallsAndGates = function(rooms) {
    if (!rooms || rooms.length === 0) return;

    const m = rooms.length;
    const n = rooms[0].length;

    const queue = [];

    // Put all gates (0s) into the queue initially
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (rooms[i][j] === 0) {
                queue.push([i, j]);
            }
        }
    }

    const directions = [
        [-1, 0], // up
        [1, 0],  // down
        [0, -1], // left
        [0, 1]   // right
    ];

    // BFS from all gates
    while (queue.length > 0) {
        const [x, y] = queue.shift();

        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;

            // Check bounds and if we can update the distance
            if (
                newX >= 0 && newX < m &&
                newY >= 0 && newY < n &&
                rooms[newX][newY] === 2147483647 // INF
            ) {
                rooms[newX][newY] = rooms[x][y] + 1;
                queue.push([newX, newY]);
            }
        }
    }
};

// Example usage:
const INF = 2147483647;
const rooms = [
    [INF, -1, 0, INF],
    [INF, INF, INF, -1],
    [INF, -1, INF, -1],
    [0, -1, INF, INF]
];

wallsAndGates(rooms);
console.log(rooms);

/* Output:
[
  [3, -1, 0, 1],
  [2, 2, 1, -1],
  [1, -1, 2, -1],
  [0, -1, 3, 4]
]
*/
//Question is from LeetCode: https://leetcode.com/problems/walls-and-gates/description/
