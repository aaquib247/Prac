/** https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/ - Dijkstras
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
var countPaths = function (n, roads) {
    const dist = Array(n).fill(Infinity)
    const count = Array(n).fill(0);
    const adj = Array(n).fill(null).map(() => [])


    roads.forEach(([u, v, t]) => {
        adj[u].push([v, t]);
        adj[v].push([u, t])
    })

    dist[0] = 0;
    count[0] = 1;


    const queue = [];
    queue.push([0, 0]);

    while (queue.length > 0) {
          queue.sort((a, b) => a[1] - b[1]); // Min-heap simulation
        const [vertex, d] = queue.shift();
        if (d > dist[vertex]) continue;

        adj[vertex].forEach(([node, time]) => {

            const newTime = dist[vertex] + time;
            if (newTime < dist[node]) {
                dist[node] = newTime;
                count[node] = count[vertex];
                queue.push([node, dist[node]])
            } else if (newTime === dist[node]) {
                count[node] = (count[node] + count[vertex]) % (1e9 + 7);
            }


        })
    }

    return count[n - 1]

};

console.log(countPaths(7,[[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]))