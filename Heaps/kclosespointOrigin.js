class MaxHeap {
    constructor() {
        this.heap = [];
    }

    push(distance, point) {
        this.heap.push({ distance, point });
        this.bubbleUp(this.heap.length - 1);
    }

    pop() {
        const max = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.bubbleDown(0);
        }
        return max;
    }

    bubbleUp(index) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.heap[parent].distance >= this.heap[index].distance) break;
            [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
            index = parent;
        }
    }

    bubbleDown(index) {
        while (true) {
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            let largest = index;

            if (left < this.heap.length && this.heap[left].distance > this.heap[largest].distance) {
                largest = left;
            }
            if (right < this.heap.length && this.heap[right].distance > this.heap[largest].distance) {
                largest = right;
            }
            if (largest === index) break;
            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            index = largest;
        }
    }

    size() {
        return this.heap.length;
    }
}

function kClosest(points, k) {
    const maxHeap = new MaxHeap();
    
    // Push all points into the max-heap
    for (const point of points) {
        const distance = point[0] * point[0] + point[1] * point[1];
        maxHeap.push(distance, point);
        if (maxHeap.size() > k) {
            maxHeap.pop(); // Remove the point with maximum distance
        }
    }
    
    // Extract points from the heap using while loop
    const result = [];
    while (maxHeap.size() > 0) {
        const { point } = maxHeap.pop();
        result.push(point);
    }
    
    // The points will be in reverse order (max to min), so reverse them
    return result.reverse();
}

// Example usage:
const points = [[1, 3], [-2, 2], [5, 8], [0, 1]];
const k = 2;
console.log(kClosest(points, k)); // Output: [[-2, 2], [0, 1]]