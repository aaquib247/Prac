//TC -  NLog(K)
function mergeKLists(lists) {
    const minHeap = new MinHeap();
    
    // Push all elements into the heap
    for (const list of lists) {
      for (const val of list) {
        minHeap.push(val);
      }
    }
    
    // Build the result list
    const result = [];
    while (minHeap.size() > 0) {
      result.push(minHeap.pop());
    }
    
    return result;
  }

  //----------

function mergeKLists(lists) {
    const minHeap = new MinHeap();
    const dummy = new ListNode(0);
    let current = dummy;
  
    // Add the first node of each list to the heap
    for (const list of lists) {
      if (list) minHeap.push(list);
    }
  
    // Process nodes until heap is empty
    while (minHeap.size() > 0) {
      const smallest = minHeap.pop();
      current.next = smallest;
      current = current.next;
      
      if (smallest.next) {
        minHeap.push(smallest.next);
      }
    }
  
    return dummy.next;
  }


// Create sample lists:
const list1 = new ListNode(1, new ListNode(4, new ListNode(5)));
const list2 = new ListNode(1, new ListNode(3, new ListNode(4)));
const list3 = new ListNode(2, new ListNode(6));

const merged = mergeKLists([list1, list2, list3]);

// Print merged list
let current = merged;
while (current) {
  console.log(current.val);
  current = current.next;
}
// Output: 1 → 1 → 2 → 3 → 4 → 4 → 5 → 6


//full
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  const minHeap = new MinHeap();
  const dummy = new ListNode(0);
  let curr = dummy;
  
  // Insert the first node of each list into the min-heap
  for(let list of lists){
      if(list) {
          minHeap.insert(list);
      }
  }

  while(minHeap.size() > 0){
      const smallest = minHeap.remove();
      curr.next = smallest;
      curr = curr.next;
      
      if(smallest.next){
          minHeap.insert(smallest.next);
      }
  }

  return dummy.next;
};

class MinHeap {
  constructor() {
      this.heap = [];
  }

  insert(node) {
      this.heap.push(node);
      this.bubbleUp(this.heap.length - 1);
  }

  remove() {
      if (this.heap.length === 0) return null;
      const min = this.heap[0];
      const last = this.heap.pop();
      if (this.heap.length > 0) {
          this.heap[0] = last;
          this.sinkDown(0);
      }
      return min;
  }

  bubbleUp(index) {
      while (index > 0) {
          const parentIndex = Math.floor((index - 1) / 2);
          if (this.heap[parentIndex].val <= this.heap[index].val) break;
          [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
          index = parentIndex;
      }
  }

  sinkDown(index) {
      const length = this.heap.length;
      while (true) {
          let left = 2 * index + 1;
          let right = 2 * index + 2;
          let smallest = index;
          
          if (left < length && this.heap[left].val < this.heap[smallest].val) {
              smallest = left;
          }
          if (right < length && this.heap[right].val < this.heap[smallest].val) {
              smallest = right;
          }
          if (smallest === index) break;
          [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
          index = smallest;
      }
  }

  size() {
      return this.heap.length;
  }
}