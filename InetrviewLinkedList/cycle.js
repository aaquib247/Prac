class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function hasCycle(head) {
    let fast = head;
    let slow = head;

    while (fast !== null && fast.next !== null) {
        fast = fast.next.next;
        slow = slow.next;
        if (fast === slow) {
            return true;
        }
    }
    return false;
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

    let hasCycleResult = hasCycle(head);
    console.log("Has Cycle: " + hasCycleResult);
}

main();
