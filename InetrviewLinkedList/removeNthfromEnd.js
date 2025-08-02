class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function removeNthFromEnd(head, n) {
  let dummy = new ListNode(0);
  dummy.next = head;

  let fast = dummy;
  let slow = dummy;

  // Move fast pointer n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }

  // Move both fast and slow until fast reaches the end
  while (fast !== null) {
    fast = fast.next;
    slow = slow.next;
  }

  // Delete the target node
  slow.next = slow.next.next;

  return dummy.next;
}

// Helper to create linked list from array
function createLinkedList(arr) {
  let dummy = new ListNode(0);
  let current = dummy;
  for (let val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  return dummy.next;
}

// Helper to print linked list
function printLinkedList(head) {
  let current = head;
  let result = [];
  while (current) {
    result.push(current.val);
    current = current.next;
  }
  console.log(result.join(" → "));
}

// === Test ===
let head = createLinkedList([1, 2, 3, 4, 5]);
console.log("Original List:");
printLinkedList(head);

let n = 2;
let newHead = removeNthFromEnd(head, n);
console.log(`\nList after removing ${n}th node from end:`);
printLinkedList(newHead);


//In Cycle the fast pointer skips 2 steps and the slow pointer skips 1 step where as in above code both pointers move at the same speed.