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