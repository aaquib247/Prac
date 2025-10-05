// https://leetcode.com/problems/network-delay-time/

function solveNetworkDelayTime(times, n, k) {
    class MinHeap {
        constructor(compare) {
            this.data = [];
            this.compare = compare;
        }

        add(val) {
            this.data.push(val);
            this.bubbleUp();
        }

        remove() {
            const top = this.data[0];
            const end = this.data.pop();
            if (this.data.length > 0) {
                this.data[0] = end;
                this.bubbleDown();
            }
            return top;
        }

        isEmpty() {
            return this.data.length === 0;
        }

        bubbleUp() {
            let idx = this.data.length - 1;
            const element = this.data[idx];
            while (idx > 0) {
                const parentIdx = Math.floor((idx - 1) / 2);
                const parent = this.data[parentIdx];
                if (this.compare(element, parent) >= 0) break;
                this.data[idx] = parent;
                idx = parentIdx;
            }
            this.data[idx] = element;
        }

        bubbleDown() {
            let idx = 0;
            const length = this.data.length;
            const element = this.data[0];

            while (true) {
                let left = 2 * idx + 1;
                let right = 2 * idx + 2;
                let swapIdx = null;

                if (left < length && this.compare(this.data[left], element) < 0) {
                    swapIdx = left;
                }

                if (
                    right < length &&
                    this.compare(this.data[right], swapIdx === null ? element : this.data[left]) < 0
                ) {
                    swapIdx = right;
                }

                if (swapIdx === null) break;
                this.data[idx] = this.data[swapIdx];
                idx = swapIdx;
            }

            this.data[idx] = element;
        }
    }

    // Dijkstra
    const adj = Array.from({ length: n + 1 }, () => []);
    const dist = Array(n + 1).fill(Infinity);
    dist[k] = 0;

    times.forEach(([u, v, w]) => {
        adj[u].push([v, w]);
    });

    const pq = new MinHeap((a, b) => a[1] - b[1]);
    pq.add([k, 0]);

    while (!pq.isEmpty()) {
        const [u, uDist] = pq.remove();
        if (uDist > dist[u]) continue;

        for (const [v, weight] of adj[u]) {
            const newDist = uDist + weight;
            if (newDist < dist[v]) {
                dist[v] = newDist;
                pq.add([v, newDist]);
            }
        }
    }

    let maxTime = 0;
    for (let i = 1; i <= n; i++) {
        if (dist[i] === Infinity) return -1;
        maxTime = Math.max(maxTime, dist[i]);
    }

    return maxTime;
}

console.log(solveNetworkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2)); // → 2
