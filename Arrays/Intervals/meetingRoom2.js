class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(i) { return Math.floor((i - 1) / 2); }
  getLeftChildIndex(i) { return 2 * i + 1; }
  getRightChildIndex(i) { return 2 * i + 2; }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  push(val) {
    this.heap.push(val);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = this.getParentIndex(index);
      if (this.heap[parentIndex] <= this.heap[index]) break;
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  heapifyDown() {
    let index = 0;
    const length = this.heap.length;
    while (this.getLeftChildIndex(index) < length) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      let rightChildIndex = this.getRightChildIndex(index);

      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex] < this.heap[smallerChildIndex]
      ) {
        smallerChildIndex = rightChildIndex;
      }

      if (this.heap[index] <= this.heap[smallerChildIndex]) break;
      this.swap(index, smallerChildIndex);
      index = smallerChildIndex;
    }
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }
}

var minMeetingRooms = function(intervals) {
  if (intervals.length === 0) return 0;

  // Sort intervals by start time
  intervals.sort((a, b) => a[0] - b[0]);

  const heap = new MinHeap();
  heap.push(intervals[0][1]);  // push end time of first meeting

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] >= heap.peek()) {
      heap.pop(); // room freed, reuse
    }
    heap.push(intervals[i][1]); // assign current meeting's end time
  }

  return heap.size();
};


//TC - O(NlogN) and SC O(n)