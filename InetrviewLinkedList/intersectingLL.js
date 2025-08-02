class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function getIntersectionNode(headA, headB) {
  if (!headA || !headB) return null;

  // Step 1: Get the lengths of both lists
  let lenA = 0, lenB = 0;
  let tempA = headA, tempB = headB;

  while (tempA) {
    lenA++;
    tempA = tempA.next;
  }

  while (tempB) {
    lenB++;
    tempB = tempB.next;
  }

  // Step 2: Align the starting point of both lists if they have different lengths
  tempA = headA;
  tempB = headB;

  if (lenA > lenB) {
    for (let i = 0; i < lenA - lenB; i++) {
      tempA = tempA.next;  // Move tempA forward
    }
  } else if (lenB > lenA) {
    for (let i = 0; i < lenB - lenA; i++) {
      tempB = tempB.next;  // Move tempB forward
    }
  }

  // Step 3: Traverse both lists together to find the intersection
  while (tempA !== tempB) {
    tempA = tempA.next;
    tempB = tempB.next;
  }

  return tempA; // This will be the intersection node, or null if no intersection
}

// Create List A: 1 -> 2 -> 3 -> 4 -> 5
let headA = new ListNode(1);
headA.next = new ListNode(2);
headA.next.next = new ListNode(3);
headA.next.next.next = new ListNode(4);
headA.next.next.next.next = new ListNode(5);

// Create List B: 6 -> 7 -> 3 -> 4 -> 5 (intersects at node 3)
let headB = new ListNode(6);
headB.next = new ListNode(7);
headB.next.next = headA.next.next;  // Points to node 3 of List A

// Get the intersection node
let intersection = getIntersectionNode(headA, headB);
console.log(intersection ? intersection.val : "No intersection"); // Output: 3
