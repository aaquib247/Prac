import { Heap } from "heap-js";
class MedianFinder {
    constructor() {
        this.minHeap = new Heap();
        this.maxHeap = new Heap((a, b) => b - a);
    }

    addNum(num) {

        if (this.maxHeap.size() === 0 || this.maxHeap.peek() >= num) {
            this.maxHeap.push(num);
        } else {
            this.minHeap.push(num);
        }

        // Balance the heaps
        if (this.maxHeap.size() > this.minHeap.size() + 1) {
            this.minHeap.push(this.maxHeap.pop());
        } else if (this.minHeap.size() > this.maxHeap.size()) {
            this.maxHeap.push(this.minHeap.pop());
        }

    }

    findMedian() {

        if (this.maxHeap.size() === this.minHeap.size()) {
            return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
        } else {
            return this.maxHeap.peek();
        }
    }

}




const medianFinder = new MedianFinder();

medianFinder.addNum(1);
console.log(medianFinder.findMedian());  // Output: 1

medianFinder.addNum(2);
console.log(medianFinder.findMedian());  // Output: 1.5

medianFinder.addNum(3);
console.log(medianFinder.findMedian());  // Output: 2
