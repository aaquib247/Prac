class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function lengthCycle(head) {
    let fast = head;
    let slow = head;

    while (fast !== null && fast.next !== null) {
        fast = fast.next.next;
        slow = slow.next;
        if (fast === slow) {
            // calculate the length of the cycle
            let temp = slow;
            let length = 0;
            do {
                temp = temp.next;
                length++;
            } while (temp !== slow);
            return length;
        }
    }
    return 0;
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

    let cycleLength = lengthCycle(head);
    console.log("Length of Cycle: " + cycleLength);
}

main();
