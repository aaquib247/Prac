class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function mergeTwoLists(l1, l2) {
  // Create a dummy node to act as the starting point of the merged list
  let dummy = new ListNode(0);
  let current = dummy;

  // Traverse both lists and add the smaller node to the merged list
  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next; // Move l1 pointer forward
    } else {
      current.next = l2;
      l2 = l2.next; // Move l2 pointer forward
    }
    current = current.next; // Move the current pointer forward
  }

  // If one list is exhausted, append the remaining part of the other list
  if (l1 !== null) {
    current.next = l1;
  } else if (l2 !== null) {
    current.next = l2;
  }

  // Return the merged list (skipping the dummy node)
  return dummy.next;
}

// Example usage:

// Create first sorted linked list: 1 -> 3 -> 5
let l1 = new ListNode(1);
l1.next = new ListNode(3);
l1.next.next = new ListNode(5);

// Create second sorted linked list: 2 -> 4 -> 6
let l2 = new ListNode(2);
l2.next = new ListNode(4);
l2.next.next = new ListNode(6);

// Merge the two sorted lists
let mergedList = mergeTwoLists(l1, l2);

// Print the merged list
let current = mergedList;
while (current !== null) {
  console.log(current.val); // Output: 1 2 3 4 5 6
  current = current.next;
}
