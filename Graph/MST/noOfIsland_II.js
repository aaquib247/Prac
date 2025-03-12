// Time Complexity (TC): O(len), where len is the number of operations in operators.
// Space Complexity (SC): O(n * m), where n and m are the dimensions of the grid.

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

// The algorithm steps are as follows:

// Initial Configuration:
// Visited array: This 2D array should be initialized with 0.
// Counter variable: This variable will also be initialized with 0.
// Answer array: After performing the algorithm, this array will store the results after performing the queries.

// First, we will iterate over all the queries selecting each at a time.
// Now, we can get the row and the column of the cell given in that query.
// Then, we will check that cell in the visited array, if the cell is previously visited or not. 
// If the cell is previously visited, we will just take the current count into our account storing that count value in our answer array 
// and we will move on to the next query.
// Otherwise, we will mark the cell as visited in the visited array and increase the value of the counter variable by 1.
// Now, it’s time to connect the adjacent islands properly. For that, we will check all four adjacent cells of the current cell. 
// If any island is found, we will first check if they(the current cell and the adjacent cell that contains an island) are already connected or not using the findUPar() method.
// For checking, we will first convert the indices of the current cell and the adjacent cell into the numbers using the specified formula. Then we will check their ultimate parents.
// If the ultimate parents are different, we will decrease the counter value by 1 and perform the union(either unionBySize() or unionByRank()) between those two numbers that represent the cells.
// Similarly, checking all four sides and making the required changes in the counter variable, we will put the counter value into our answer array.
// After performing step 2 for all the queries, we will get our final answer array containing the results for all the queries.
