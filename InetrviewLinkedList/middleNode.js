class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function middleNode(head) {
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}

// Example usage
function main() {
    // Create a linked list: 1 -> 2 -> 3 -> 4 -> 5 -> null
    let head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    head.next.next.next = new ListNode(4);
    head.next.next.next.next = new ListNode(5);

    let middle = middleNode(head);
    console.log("Middle node value: " + middle.val);
}

main();
