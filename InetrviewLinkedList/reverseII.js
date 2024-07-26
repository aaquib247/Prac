class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function reverseBetween(head, left, right) {
    if (left === right) {
        return head;
    }

    let current = head;
    let prev = null;
    for (let i = 0; current !== null && i < left - 1; i++) {
        prev = current;
        current = current.next;
    }

    let last = prev;
    let newEnd = current;

    let next = current ? current.next : null;
    for (let i = 0; current !== null && i < right - left + 1; i++) {
        current.next = prev;
        prev = current;
        current = next;
        next = next ? next.next : null;
    }

    if (last !== null) {
        last.next = prev;
    } else {
        head = prev;
    }

    newEnd.next = current;
    return head;
}

// Example usage
function main() {
    // Create a linked list: 1 -> 2 -> 3 -> 4 -> 5 -> null
    let head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    head.next.next.next = new ListNode(4);
    head.next.next.next.next = new ListNode(5);

    let left = 2;
    let right = 4;
    let reversedBetween = reverseBetween(head, left, right);
    console.log("Reversed between " + left + " and " + right + ": ");
    printList(reversedBetween);
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
