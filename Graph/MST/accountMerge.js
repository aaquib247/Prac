// Disjoint Set (Union-Find) implementation
class DisjointSet {
    // Constructor to initialize DSU
    constructor(n) {
        this.parent = new Array(n + 1);
        this.size = new Array(n + 1);

        // Initialize every node
        for (let i = 0; i <= n; i++) {
            this.parent[i] = i;
            this.size[i] = 1;
        }
    }

    // Function to find ultimate parent with path compression
    findUPar(node) {
        if (node === this.parent[node]) 
            return node;
        this.parent[node] = this.findUPar(this.parent[node]);
        return this.parent[node];
    }

    // Function to perform union by size
    unionBySize(u, v) {
        let ulp_u = this.findUPar(u);
        let ulp_v = this.findUPar(v);

        if (ulp_u === ulp_v) return;

        if (this.size[ulp_u] < this.size[ulp_v]) {
            this.parent[ulp_u] = ulp_v;
            this.size[ulp_v] += this.size[ulp_u];
        } 
        else {
            this.parent[ulp_v] = ulp_u;
            this.size[ulp_u] += this.size[ulp_v];
        }
    }
}

// Solution class to merge accounts
class Solution {
    // Function to merge accounts with common emails
    accountsMerge(details) {
        // Number of accounts
        let n = details.length;

        // Create Disjoint Set
        let ds = new DisjointSet(n);

        // Map to store email -> account index
        let mapMailNode = new Map();

        // Step 1: Union accounts having common emails
        for (let i = 0; i < n; i++) {
            for (let j = 1; j < details[i].length; j++) {
                let mail = details[i][j];

                if (!mapMailNode.has(mail)) {
                    mapMailNode.set(mail, i);
                } 
                else {
                    ds.unionBySize(i, mapMailNode.get(mail));
                }
            }
        }

        // Step 2: Group emails under ultimate parent
        let mergedMail = Array.from({ length: n }, () => []);
        for (let [mail, idx] of mapMailNode.entries()) {
            let node = ds.findUPar(idx);
            mergedMail[node].push(mail);
        }

        // Step 3: Prepare final merged result
        let ans = [];
        for (let i = 0; i < n; i++) {
            if (mergedMail[i].length === 0) continue;

            mergedMail[i].sort();
            let temp = [details[i][0]];

            for (let mail of mergedMail[i]) {
                temp.push(mail);
            }
            ans.push(temp);
        }

        // Sort final answer
        ans.sort((a, b) => a[0].localeCompare(b[0]));
        return ans;
    }
}

// Driver function
function main() {
    // Input accounts
    let accounts = [
        ["John", "j1@com", "j2@com", "j3@com"],
        ["John", "j4@com"],
        ["Raj", "r1@com", "r2@com"],
        ["John", "j1@com", "j5@com"],
        ["Raj", "r2@com", "r3@com"],
        ["Mary", "m1@com"]
    ];

    // Create Solution object
    let obj = new Solution();

    // Call function
    let ans = obj.accountsMerge(accounts);

    // Print output
    for (let acc of ans) {
        process.stdout.write(acc[0] + ":");
        for (let i = 1; i < acc.length; i++) {
            process.stdout.write(acc[i] + " ");
        }
        console.log();
    }
}

main();
//complexity
//TC: O(N * K * log(K)) where N is number of accounts and K is max emails in an account (for sorting emails)
//SC: O(N * K) for the map and mergedMail array
