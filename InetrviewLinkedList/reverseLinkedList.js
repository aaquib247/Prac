class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function reverseList(head) {
    let prev = null;
    let present = head;
    let next = present ? present.next : null;

    while (present !== null) {
        present.next = prev;
        prev = present;
        present = next;
        next = next ? next.next : null;
    }
    return prev;
}

// Example usage
function main() {
    // Create a linked list: 1 -> 2 -> 3 -> 4 -> 5 -> null
    let head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    head.next.next.next = new ListNode(4);
    head.next.next.next.next = new ListNode(5);

    let reversed = reverseList(head);
    console.log("Reversed list: ");
    printList(reversed);
}

function printList(head) {
    let current = head;
    let result = "";
    while (current !== null) {
        result += current.val + " -> ";
        current = current.next;
    }
    result += "null";
    console.log(result);
}

main();
