class Heap {
    constructor() {
      this.list = [];
    }
  
    insert(value) {
      this.list.push(value);
      this.upheap(this.list.length - 1);
    }
  
    size() {
      return this.list.length;
    }
  
    upheap(index) {
      if (index === 0) {
        return;
      }
  
      let parentIndex = this.parent(index);
  
      if (this.list[index] < this.list[parentIndex]) {
        this.swap(index, parentIndex);
        this.upheap(parentIndex);
      }
    }
  
    remove() {
      if (this.list.length === 0) {
        throw new Error("Removing from empty heap");
      }
  
      let temp = this.list[0];
      let last = this.list.pop();
  
      if (this.list.length > 0) {
        this.list[0] = last;
        this.downheap(0);
      }
  
      return temp;
    }
  
    downheap(index) {
      let min = index;
      let left = this.left(index);
      let right = this.right(index);
  
      if (left < this.list.length && this.list[left] < this.list[min]) {
        min = left;
      }
  
      if (right < this.list.length && this.list[right] < this.list[min]) {
        min = right;
      }
  
      if (min !== index) {
        this.swap(min, index);
        this.downheap(min);
      }
    }
  
    heapSort() {
      let sorted = [];
      while (this.list.length > 0) {
        sorted.push(this.remove());
      }
      return sorted;
    }
  
    swap(i, j) {
      let temp = this.list[i];
      this.list[i] = this.list[j];
      this.list[j] = temp;
    }
  
    parent(index) {
      return Math.floor((index - 1) / 2);
    }
  
    left(index) {
      return 2 * index + 1;
    }
  
    right(index) {
      return 2 * index + 2;
    }
  }
  
  // Example usage:
  let heap = new Heap();
  heap.insert(3);
  heap.insert(2);
  heap.insert(1);
  heap.insert(4);
  heap.insert(5);
  
  console.log(heap.heapSort()); // Output: [1, 2, 3, 4, 5]
  