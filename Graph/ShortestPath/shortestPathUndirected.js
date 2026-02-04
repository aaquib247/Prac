//https://www.geeksforgeeks.org/problems/shortest-path-in-weighted-undirected-graph/1
function shortestPath_Undirected(n, m, edges) {
    const adjList = Array(n + 1).fill(null).map(() => []);
    const dist = Array(n + 1).fill(Infinity);
    const prev = Array(n + 1).fill(null);
   
    

    edges.forEach(([u, v, w]) => {
        adjList[u].push([v, w]);
        adjList[v].push([u, w]);
    });

    dist[1] = 0;
    const pq = new MinHeap((a, b) => a[1] - b[1]);
    pq.push([1, 0])

    while (!pq.isEmpty()) { 
        const [vertex, val] = pq.pop();
        if (val > dist[vertex]) continue;
        adjList[vertex].forEach(([v, w]) => {
            const newDist = dist[vertex] + w;
            if (newDist < dist[v]) {
                dist[v] = newDist;
                prev[v] = vertex;
                pq.push([v, newDist])
            }
        })
    }
    const path = [];
    let node = n;
    let start = 1;
    // if (dist[n] === Infinity) {
    //     return [-1]; // No path found
    // }

    // while (node !== null) {
    //     path.unshift(node);
    //     node = prev[node];
    // }

    // // Check if path starts with 1
    // if (path[0] !== 1) {
    //     return [-1];
    // }
    if (dist[n] === Infinity) {
        return [-1];
    }
   

    while(node !== start){
        path.unshift(node);
        node = prev[node]
    }
    path.unshift(start);

    // Return the result
    return path;
}

class MinHeap {
    constructor(compare) {
        this.heap = [];
        this.compare = compare || ((a, b) => a[1] - b[1]); // default compare on distance
    }

    push(value) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }

    pop() {
        if (this.isEmpty()) return null;
        const min = this.heap[0];
        const end = this.heap.pop();
        if (!this.isEmpty()) {
            this.heap[0] = end;
            this.bubbleDown(0);
        }
        return min;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    bubbleUp(index) {
        const element = this.heap[index];
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            if (this.compare(element, parent) >= 0) break;
            this.heap[index] = parent;
            index = parentIndex;
        }
        this.heap[index] = element;
    }

    bubbleDown(index) {
        const length = this.heap.length;
        const element = this.heap[index];

        while (true) {
            const leftIndex = 2 * index + 1;
            const rightIndex = 2 * index + 2;
            let swap = null;

            if (leftIndex < length && this.compare(this.heap[leftIndex], element) < 0) {
                swap = leftIndex;
            }

            if (
                rightIndex < length &&
                this.compare(this.heap[rightIndex], swap === null ? element : this.heap[swap]) < 0
            ) {
                swap = rightIndex;
            }

            if (swap === null) break;

            this.heap[index] = this.heap[swap];
            index = swap;
        }

        this.heap[index] = element;
    }
}


const n = 5;
const m = 6;
const edges = [[1, 2, 2], [2, 5, 5], [2, 3, 4], [1, 4, 1], [4, 3, 3], [3, 5, 1]];
console.log(shortestPath_Undirected(n, m, edges)) 
//outpu t: [ 1, 4, 3, 5 ]

// const n = 2;
// const m = 1;
// const edges = [[1, 2, 2]];
// console.log(shortestPath_Undirected(n, m, edges))

// const n = 2;
// const m = 0;
// const edges = [];
// console.log(shortestPath_Undirected(n, m, edges))
