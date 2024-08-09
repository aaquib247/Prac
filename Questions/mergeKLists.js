const Heap = require('heap');

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeKLists(lists) {
  // Create a min-heap using the heap library
  const minHeap = new Heap((a, b) => a.val - b.val);
  
  // Add the head of each list to the heap
  for (const list of lists) {
    if (list) {
      minHeap.push(list);
    }
  }

  const dummy = new ListNode(0);
  let current = dummy;

  // Process the heap until it's empty
  while (!minHeap.empty()) {
    const node = minHeap.pop();
    current.next = node;
    current = current.next;

    // If there is a next node, add it to the heap
    if (node.next) {
      minHeap.push(node.next);
    }
  }

  return dummy.next;
}

// Example usage
const lists = [
  new ListNode(1, new ListNode(4, new ListNode(5))),
  new ListNode(1, new ListNode(3, new ListNode(4))),
  new ListNode(2, new ListNode(6))
];

const mergedList = mergeKLists(lists);

// Function to print linked list
function printList(node) {
  let result = '';
  while (node) {
    result += node.val + ' -> ';
    node = node.next;
  }
  return result.slice(0, -4); // Remove the trailing ' -> '
}

console.log(printList(mergedList)); // Output: 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6


//----Brute-Force--------------
// class ListNode {
//   constructor(val = 0, next = null) {
//     this.val = val;
//     this.next = next;
//   }
// }

// function mergeKLists(lists) {
//   // Step 1: Collect all nodes into an array
//   let values = [];
  
//   for (const list of lists) {
//     let current = list;
//     while (current) {
//       values.push(current.val);
//       current = current.next;
//     }
//   }
  
//   // Step 2: Sort the array of node values
//   values.sort((a, b) => a - b);
  
//   // Step 3: Reconstruct the merged linked list from the sorted values
//   const dummy = new ListNode(0);
//   let current = dummy;
  
//   for (const value of values) {
//     current.next = new ListNode(value);
//     current = current.next;
//   }
  
//   return dummy.next;
// }

// // Example usage
// const lists = [
//   new ListNode(1, new ListNode(4, new ListNode(5))),
//   new ListNode(1, new ListNode(3, new ListNode(4))),
//   new ListNode(2, new ListNode(6))
// ];

// const mergedList = mergeKLists(lists);

// // Function to print linked list
// function printList(node) {
//   let result = '';
//   while (node) {
//     result += node.val + ' -> ';
//     node = node.next;
//   }
//   return result.slice(0, -4); // Remove the trailing ' -> '
// }

// console.log(printList(mergedList)); // Output: 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6
