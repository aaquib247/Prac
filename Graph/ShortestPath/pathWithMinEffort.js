//https://leetcode.com/problems/path-with-minimum-effort/description/

class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(value) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }

    pop() {
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
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
            if (element.distance >= parent.distance) break;
            this.heap[index] = parent;
            index = parentIndex;
        }
        this.heap[index] = element;
    }

    bubbleDown(index) {
        const length = this.heap.length;
        const element = this.heap[index];
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let swap = null;
            if (leftChildIndex < length) {
                const leftChild = this.heap[leftChildIndex];
                if (leftChild.distance < element.distance) swap = leftChildIndex;
            }
            if (rightChildIndex < length) {
                const rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild.distance < element.distance) ||
                    (swap !== null && rightChild.distance < this.heap[swap].distance)
                ) {
                    swap = rightChildIndex;
                }
            }
            if (swap === null) break;
            this.heap[index] = this.heap[swap];
            index = swap;
        }
        this.heap[index] = element;
    }
}

function minimumEffort(heights) {
    const n = heights.length;
    const m = heights[0].length;
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const dist = Array.from({ length: n }, () => Array(m).fill(Infinity));
    const minHeap = new MinHeap();

    dist[0][0] = 0;
    minHeap.push({ distance: 0, row: 0, col: 0 });

    while (!minHeap.isEmpty()) {
        const { distance, row, col } = minHeap.pop();

        if (row === n - 1 && col === m - 1) return distance;

        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < m) {
                const newEffort = Math.max(Math.abs(heights[row][col] - heights[newRow][newCol]), distance);

                if (newEffort < dist[newRow][newCol]) {
                    dist[newRow][newCol] = newEffort;
                    minHeap.push({ distance: newEffort, row: newRow, col: newCol });
                }
            }
        }
    }

    return 0;
}

// Example usage
const heights1 = [
    [1, 2, 2],
    [3, 8, 2],
    [5, 3, 5]
];
console.log(minimumEffort(heights1)); // Output: 2

const heights2 = [
    [1, 2, 3],
    [3, 8, 4],
    [5, 3, 5]
];
console.log(minimumEffort(heights2)); // Output: 1

const heights3 = [
    [1, 2, 1, 1, 1],
    [1, 2, 1, 2, 1],
    [1, 2, 1, 2, 1],
    [1, 2, 1, 2, 1],
    [1, 1, 1, 2, 1]
];
console.log(minimumEffort(heights3)); // Output: 0
