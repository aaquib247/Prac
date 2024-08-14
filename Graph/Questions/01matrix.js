//https://leetcode.com/problems/01-matrix/description/
//Logic :
// New Matrix will all INFINITY and then populate the value 0 in new matrix from original.
// get 4 directions and calculate shortest distance
/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
function updateMatrix(mat) {
    const m = mat.length;
    const n = mat[0].length;
    
    // Initialize the result matrix with Infinity for cells with 1
    const result = Array.from({ length: m }, () => Array(n).fill(Infinity));
    
    // Initialize the BFS queue with all the 0 cells
    const queue = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (mat[i][j] === 0) {
                result[i][j] = 0;
                queue.push([i, j]);
            }
        }
    }
    
    // Directions for moving up, down, left, right
    const directions = [
        [-1, 0], // up
        [1, 0],  // down
        [0, -1], // left
        [0, 1]   // right
    ];
    
    // Perform BFS
    while (queue.length > 0) {
        const [x, y] = queue.shift();
        
        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;
            
            // Check if the new cell is within bounds and if we found a shorter path
            if (newX >= 0 && newX < m && newY >= 0 && newY < n && result[newX][newY] > result[x][y] + 1) {
                result[newX][newY] = result[x][y] + 1;
                queue.push([newX, newY]);
            }
        }
    }
    
    return result;
}

console.log(updateMatrix([[0,0,0],[0,1,0],[1,1,1]]))

