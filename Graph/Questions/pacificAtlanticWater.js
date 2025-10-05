//https://leetcode.com/problems/pacific-atlantic-water-flow/submissions/1770234400/

function pacificAtlantic(heights) {
    const rows = heights.length;
    const cols = heights[0].length;

    const pacific = Array.from({ length: rows }, () => Array(cols).fill(false));
    const atlantic = Array.from({ length: rows }, () => Array(cols).fill(false));

    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    function dfs(r, c, visited, prevHeight) {
        // Out of bounds or already visited or not valid flow
        if (
            r < 0 || c < 0 || r >= rows || c >= cols ||
            visited[r][c] || heights[r][c] < prevHeight
        ) return;

        visited[r][c] = true;

        for (let [dr, dc] of directions) {
            dfs(r + dr, c + dc, visited, heights[r][c]);
        }
    }

    // DFS from Pacific (top and left)
    for (let r = 0; r < rows; r++) {
        dfs(r, 0, pacific, heights[r][0]); // Left column
        dfs(r, cols - 1, atlantic, heights[r][cols - 1]); // Right column
    }

    for (let c = 0; c < cols; c++) {
        dfs(0, c, pacific, heights[0][c]); // Top row
        dfs(rows - 1, c, atlantic, heights[rows - 1][c]); // Bottom row
    }

    // Result: cells reachable by both oceans
    const result = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (pacific[r][c] && atlantic[r][c]) {
                result.push([r, c]);
            }
        }
    }

    return result;
}

const heights = [
  [1, 2, 2, 3, 5],
  [3, 2, 3, 4, 4],
  [2, 4, 5, 3, 1],
  [6, 7, 1, 4, 5],
  [5, 1, 1, 2, 4]
];

console.log(pacificAtlantic(heights));
/*
Output:
[
  [0,4],[1,3],[1,4],[2,2],
  [3,0],[3,1],[4,0]
]
*/
