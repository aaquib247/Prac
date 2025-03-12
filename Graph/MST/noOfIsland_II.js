class Disjoint {
    constructor(n) {
        this.parent = new Array(n + 1).fill(0).map((_, index) => index);
        this.size = new Array(n + 1).fill(1);
    }

    findUPar(node) {
        if (node === this.parent[node]) {
            return node;
        }
        this.parent[node] = this.findUPar(this.parent[node]);
        return this.parent[node];
    }

    uBSize(u, v) {
        let ulp_u = this.findUPar(u);
        let ulp_v = this.findUPar(v);

        if (ulp_u === ulp_v) return;

        if (this.size[ulp_u] < this.size[ulp_v]) {
            this.parent[ulp_u] = ulp_v;
            this.size[ulp_v] += this.size[ulp_u];
        } else {
            this.parent[ulp_v] = ulp_u;
            this.size[ulp_u] += this.size[ulp_v];
        }
    }
}

class Solution {
    numOfIslands(n, m, operators) {
        let ds = new Disjoint(n * m);
        let vis = Array.from({ length: n }, () => new Array(m).fill(0));
        let cnt = 0;
        let ans = [];
        let len = operators.length;

        for (let i = 0; i < len; i++) {
            let [row, col] = operators[i];

            // If the cell is already land, continue without any changes.
            if (vis[row][col] === 1) {
                ans.push(cnt);
                continue;
            }

            // Mark the current cell as land
            vis[row][col] = 1;
            cnt++;

            // Directions array to check the four adjacent cells (up, right, down, left)
            let directions = [
                [-1, 0], [0, 1], [1, 0], [0, -1]
            ];

            // Check for adjacent cells
            for (let [dr, dc] of directions) {
                let adjr = row + dr;
                let adjc = col + dc;

                // Ensure that we are within bounds
                if (adjr >= 0 && adjr < n && adjc >= 0 && adjc < m && vis[adjr][adjc] === 1) {
                    let nodeNo = row * m + col;
                    let adjNodeNo = adjr * m + adjc;

                    // If they are in different sets, unite them and decrease the count
                    if (ds.findUPar(nodeNo) !== ds.findUPar(adjNodeNo)) {
                        cnt--;
                        ds.uBSize(nodeNo, adjNodeNo);
                    }
                }
            }

            ans.push(cnt);
        }

        return ans;
    }
}

// Example usage
let n = 4, m = 5;
let operators = [
    [0, 0], [0, 1], [3, 3], [3, 4]
];
// let operators = [
//     [0, 0], [0, 0], [1, 1], [1, 0], [0, 1],
//     [0, 3], [1, 3], [0, 4], [3, 2], [2, 2], [1, 2], [0, 2]
// ];


let solution = new Solution();
let result = solution.numOfIslands(n, m, operators);

console.log(result.join(' '));  // Output the result
