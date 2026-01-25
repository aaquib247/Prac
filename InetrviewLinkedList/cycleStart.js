class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}


function detectCycleStart(head) {
  let slow = head;
  let fast = head;

  // Step 1: Detect if a cycle exists
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      // Step 2: Find the start of the cycle
      let start = head;
      while (start !== slow) {
        start = start.next;
        slow = slow.next;
      }
      return start; // This is the start node of the cycle
    }
  }

  return null; // No cycle
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

    let cycleStart = detectCycleStart(head);
    if (cycleStart !== null) {
        console.log("Cycle starts at node with value: " + cycleStart.val);
    } else {
        console.log("No cycle detected.");
    }
}

main();
