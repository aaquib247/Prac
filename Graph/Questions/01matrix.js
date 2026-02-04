//https://leetcode.com/problems/01-matrix/description/
//Logic :
// New Matrix will all INFINITY and then populate the value 0 in new matrix from original.
//Idea is to get nearest 0's from 1's. or 1's from 0's. First isn the distance from 0 is 0 so in result matrix we set 0's position to 0 and rest Infinity.
// We will use BFS here. We will start from all 0's and explore their neighbors in 4 directions(up,down,left,right).
// If we find a neighbor which has value greater than current cell + 1, we update it and add that cell to queue for further exploration.
// This way we ensure that we are always expanding from the nearest 0's first, thus guaranteeing the shortest distance calculation.

// Time Complexity: O(m * n) where m is number of rows and n is number of columns in the matrix.
// Space Complexity: O(m * n) for the result matrix and the queue in worst case.
// get 4 directions and calculate shortest distance

// SLight change for 01 matrix nearest to 1 is to start from all 1's and mark them 0 in result matrix and rest as Infinity.
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

//TC : O(m*n)
//SC : O(m*n)