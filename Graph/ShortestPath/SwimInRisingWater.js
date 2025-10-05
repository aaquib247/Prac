//https://leetcode.com/problems/swim-in-rising-water/description/

class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(val) {
        this.heap.push(val);
        this._bubbleUp();
    }

    pop() {
        if (this.size() === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._sinkDown();
        return min;
    }

    _bubbleUp() {
        let idx = this.heap.length - 1;
        const element = this.heap[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            if (this.heap[parentIdx][0] <= element[0]) break;
            [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
            idx = parentIdx;
        }
    }

    _sinkDown() {
        let idx = 0;
        const length = this.heap.length;
        const element = this.heap[0];

        while (true) {
            let leftIdx = 2 * idx + 1;
            let rightIdx = 2 * idx + 2;
            let swap = null;

            if (leftIdx < length) {
                if (this.heap[leftIdx][0] < element[0]) {
                    swap = leftIdx;
                }
            }

            if (rightIdx < length) {
                if (
                    (swap === null && this.heap[rightIdx][0] < element[0]) ||
                    (swap !== null && this.heap[rightIdx][0] < this.heap[leftIdx][0])
                ) {
                    swap = rightIdx;
                }
            }

            if (swap === null) break;
            [this.heap[idx], this.heap[swap]] = [this.heap[swap], this.heap[idx]];
            idx = swap;
        }
    }

    size() {
        return this.heap.length;
    }
}

function swimInWater(grid) {
    const n = grid.length;
    const visited = Array.from({ length: n }, () => Array(n).fill(false));
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const heap = new MinHeap();
    
    heap.push([grid[0][0], 0, 0]);

    while (heap.size()) {
        const [time, x, y] = heap.pop();

        if (visited[x][y]) continue;
        visited[x][y] = true;

        if (x === n - 1 && y === n - 1) return time;

        for (let [dx, dy] of directions) {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && ny >= 0 && nx < n && ny < n && !visited[nx][ny]) {
                heap.push([Math.max(time, grid[nx][ny]), nx, ny]);
            }
        }
    }
}

const grid = [
  [0, 2],
  [1, 3]
];

console.log(swimInWater(grid)); // Output: 3
