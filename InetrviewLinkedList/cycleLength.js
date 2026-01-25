class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function cycleLength(head) {
  let slow = head;
  let fast = head;

  // Detect cycle using Floyd’s Tortoise and Hare
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      // Cycle detected, find its length
      let length = 1;
      let current = slow.next;
      while (current !== slow) {
        current = current.next;
        length++;
      }
      return length;
    }
  }

  return 0; // No cycle
}

// Example usage
function main() {
    // Create a linked list with a cycle: 1 -> 2 -> 3 -> 4 -> 5 -> 2
    let head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    head.next.next.next = new ListNode(4);
    head.next.next.next.next = new ListNode(5);
    head.next.next.next.next.next = head.next; // cycle back to node with value 2

    let len = cycleLength(head);
    console.log("Length of Cycle: " + len);
}

main();
