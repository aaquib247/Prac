var findTheCity = function (n, edges, distanceThreshold) {

    let dist = Array.from({ length: n }, () => new Array(n).fill(Infinity));
    for (let i = 0; i < n; i++) {
        dist[i][i] = 0
    }

    for (const[u, v, w] of edges) {
        dist[u][v] = w;
        dist[v][u] = w;
    }

    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j])
            }
        }
    }

    let city = 0;
    let min = Infinity;

    for (let i = 0; i < n; i++) {
        let count = 0;
        for (let j = 0; j < n; j++) {
            if (i !== j && dist[i][j] <= distanceThreshold) {
                count++;
            }
        }
        if (count <= min) {
            min = count;
            city = i;
        }
    }

    return city;

};
//TC: O(n^3)
//SC: O(n^2)
console.log(findTheCity(4, [[0, 1, 3], [1, 2, 1], [1, 3, 4], [2, 3, 1]], 4)); //3
console.log(findTheCity(5, [[0, 1, 2], [0, 4, 8], [1, 2, 3], [1, 4, 2], [2, 3, 1], [3, 4, 1]], 2)); //0

//--------------------------
class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(val) {
        this.heap.push(val);
        this._heapifyUp();
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this._heapifyDown();
        }
        return min;
    }

    _heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex][1] <= this.heap[index][1]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    _heapifyDown() {
        let index = 0;
        const length = this.heap.length;
        while (index < length) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let smallest = index;

            if (leftChildIndex < length && this.heap[leftChildIndex][1] < this.heap[smallest][1]) {
                smallest = leftChildIndex;
            }
            if (rightChildIndex < length && this.heap[rightChildIndex][1] < this.heap[smallest][1]) {
                smallest = rightChildIndex;
            }
            if (smallest === index) break;
            [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
            index = smallest;
        }
    }
}

var findTheCity = function(n, edges, distanceThreshold) {
    const graph = Array.from({ length: n }, () => []);
    for (const [u, v, w] of edges) {
        graph[u].push([v, w]);
        graph[v].push([u, w]);
    }

    const dijkstra = (start) => {
        const dist = Array(n).fill(Infinity);
        dist[start] = 0;
        const minHeap = new MinHeap();
        minHeap.insert([start, 0]);

        while (minHeap.heap.length > 0) {
            const [node, d] = minHeap.extractMin();
            if (d > dist[node]) continue;

            for (const [neighbor, weight] of graph[node]) {
                const newDist = d + weight;
                if (newDist < dist[neighbor]) {
                    dist[neighbor] = newDist;
                    minHeap.insert([neighbor, newDist]);
                }
            }
        }

        return dist;
    };

    let city = -1;
    let minCount = Infinity;

    for (let i = 0; i < n; i++) {
        const dist = dijkstra(i);
        let count = 0;
        for (let j = 0; j < n; j++) {
            if (i !== j && dist[j] <= distanceThreshold) {
                count++;
            }
        }

        if (count <= minCount) {
            minCount = count;
            city = i;
        }
    }

    return city;
};

// Test cases
console.log(findTheCity(4, [[0, 1, 3], [1, 2, 1], [1, 3, 4], [2, 3, 1]], 4)); // 3
console.log(findTheCity(5, [[0, 1, 2], [0, 4, 8], [1, 2, 3], [1, 4, 2], [2, 3, 1], [3, 4, 1]], 2)); // 0

//TC: O(n * (E log V)) where E is the number of edges and V is the number of vertices
//SC: O(n^2) for the graph representation and distance array