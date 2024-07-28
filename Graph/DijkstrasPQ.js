const { MinHeap } = require('heap');

function dijkstra(N, edges, src) {
    // Initialize adjacency list
    const adjList = Array.from({ length: N }, () => []);
    edges.forEach(([u, v, w]) => {
        adjList[u].push([v, w]);
        adjList[v].push([u, w]); // For undirected graph
    });

    // Initialize distances array
    const dist = Array(N).fill(Infinity);
    dist[src] = 0;

    // Priority queue (min-heap) for selecting the vertex with the smallest distance
    const pq = new MinHeap((a, b) => a[1] - b[1]);
    pq.add([src, 0]);

    // Dijkstra's algorithm
    while (!pq.isEmpty()) {
        const [u, uDist] = pq.remove();

        if (uDist > dist[u]) continue;

        adjList[u].forEach(([v, weight]) => {
            const newDist = uDist + weight;
            if (newDist < dist[v]) {
                dist[v] = newDist;
                pq.add([v, newDist]);
            }
        });
    }

    // Convert distances to -1 for unreachable nodes
    return dist.map(d => (d === Infinity ? -1 : d));
}

// Example usage
const N = 6; // Number of vertices
const edges = [[0, 1, 2], [0, 4, 1], [1, 2, 3], [2, 3, 6], [4, 5, 4], [5, 3, 1]];
const src = 0; // Source vertex

const result = dijkstra(N, edges, src);
console.log(result); // Output: [0, 2, 5, 3, 1, 6]



//----------------------------------------------------------------------------------------------------------
// function dijkstra(N, edges, src) {
//     // Initialize adjacency list
//     const adjList = Array.from({ length: N }, () => []);
//     edges.forEach(([u, v, w]) => {
//         adjList[u].push([v, w]);
//         adjList[v].push([u, w]); // For undirected graph
//     });

//     // Initialize distances array
//     const dist = Array(N).fill(Infinity);
//     dist[src] = 0;

//     // Priority queue (min-heap) for selecting the vertex with the smallest distance
//     const pq = new PriorityQueue((a, b) => a[1] < b[1]); // Min-heap based on distance
//     pq.enqueue([src, 0]);

//     // Dijkstra's algorithm
//     while (!pq.isEmpty()) {
//         const [u, uDist] = pq.dequeue();

//         if (uDist > dist[u]) continue;

//         adjList[u].forEach(([v, weight]) => {
//             const newDist = uDist + weight;
//             if (newDist < dist[v]) {
//                 dist[v] = newDist;
//                 pq.enqueue([v, newDist]);
//             }
//         });
//     }

//     // Convert distances to -1 for unreachable nodes
//     return dist.map(d => (d === Infinity ? -1 : d));
// }

// // Priority Queue implementation using a min-heap
// class PriorityQueue {
//     constructor(comparator) {
//         this.heap = [];
//         this.comparator = comparator;
//     }

//     enqueue(item) {
//         this.heap.push(item);
//         this._heapifyUp(this.heap.length - 1);
//     }

//     dequeue() {
//         if (this.isEmpty()) throw new Error('Priority queue is empty');
//         const root = this.heap[0];
//         const end = this.heap.pop();
//         if (!this.isEmpty()) {
//             this.heap[0] = end;
//             this._heapifyDown(0);
//         }
//         return root;
//     }

//     isEmpty() {
//         return this.heap.length === 0;
//     }

//     _heapifyUp(index) {
//         const element = this.heap[index];
//         while (index > 0) {
//             const parentIndex = Math.floor((index - 1) / 2);
//             const parent = this.heap[parentIndex];
//             if (this.comparator(element, parent)) break;
//             this.heap[index] = parent;
//             index = parentIndex;
//         }
//         this.heap[index] = element;
//     }

//     _heapifyDown(index) {
//         const length = this.heap.length;
//         const element = this.heap[index];
//         while (true) {
//             const leftChildIndex = 2 * index + 1;
//             const rightChildIndex = 2 * index + 2;
//             let swap = null;

//             if (leftChildIndex < length) {
//                 const leftChild = this.heap[leftChildIndex];
//                 if (this.comparator(leftChild, element)) {
//                     swap = leftChildIndex;
//                 }
//             }

//             if (rightChildIndex < length) {
//                 const rightChild = this.heap[rightChildIndex];
//                 if (
//                     (swap === null && this.comparator(rightChild, element)) ||
//                     (swap !== null && this.comparator(rightChild, this.heap[swap]))
//                 ) {
//                     swap = rightChildIndex;
//                 }
//             }

//             if (swap === null) break;
//             this.heap[index] = this.heap[swap];
//             index = swap;
//         }
//         this.heap[index] = element;
//     }
// }

// // Example usage
// const N = 6; // Number of vertices
// const edges = [[0, 1, 2], [0, 4, 1], [1, 2, 3], [2, 3, 6], [4, 5, 4], [5, 3, 1]];
// const src = 0; // Source vertex

// const result = dijkstra(N, edges, src);
// console.log(result); // Output: [0, 2, 5, 3, 1, 6]
