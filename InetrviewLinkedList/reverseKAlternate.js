class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function reverseAlternateKGroup(head, k) {
    if (k <= 1 || head === null) {
        return head;
    }

    let current = head;
    let prev = null;

    while (current !== null) {
        let last = prev;
        let newEnd = current;

        // reverse between left and right
        let next = current ? current.next : null;
        for (let i = 0; current !== null && i < k; i++) {
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

        // skip the next k nodes
        for (let i = 0; current !== null && i < k; i++) {
            prev = current;
            current = current.next;
        }
    }
    return head;
}

// Example usage
function main() {
    // Create a linked list: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
    let head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    head.next.next.next = new ListNode(4);
    head.next.next.next.next = new ListNode(5);
    head.next.next.next.next.next = new ListNode(6);

    let k = 3;
    let reversedAlternateKGroup = reverseAlternateKGroup(head, k);
    console.log("Reversed alternate in groups of " + k + ": ");
    printList(reversedAlternateKGroup);
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
