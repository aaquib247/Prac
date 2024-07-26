class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function reverseKGroup(head, k) {
    if (k <= 1 || head === null) {
        return head;
    }

    let current = head;
    let prev = null;

    let length = getLength(head);
    let count = Math.floor(length / k);
    while (count > 0) {
        let last = prev;
        let newEnd = current;

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

        prev = newEnd;
        count--;
    }
    return head;
}

function getLength(head) {
    let node = head;
    let length = 0;
    while (node !== null) {
        length++;
        node = node.next;
    }
    return length;
}

// Example usage
function main() {
    // Create a linked list: 1 -> 2 -> 3 -> 4 -> 5 -> null
    let head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    head.next.next.next = new ListNode(4);
    head.next.next.next.next = new ListNode(5);

    let k = 2;
    let reversedKGroup = reverseKGroup(head, k);
    console.log("Reversed in groups of " + k + ": ");
    printList(reversedKGroup);
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
