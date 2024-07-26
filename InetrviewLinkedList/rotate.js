class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function rotateRight(head, k) {
    if (k <= 0 || head === null || head.next === null) {
        return head;
    }

    let last = head;
    let length = 1;
    while (last.next !== null) {
        last = last.next;
        length++;
    }

    last.next = head;
    let rotations = k % length;
    let skip = length - rotations;
    let newLast = head;
    for (let i = 0; i < skip - 1; i++) {
        newLast = newLast.next;
    }
    head = newLast.next;
    newLast.next = null;

    return head;
}

// Example usage
function main() {
    // Create a linked list: 1 -> 2 -> 3 -> 4 -> 5 -> null
    let rotateList = new ListNode(1);
    rotateList.next = new ListNode(2);
    rotateList.next.next = new ListNode(3);
    rotateList.next.next.next = new ListNode(4);
    rotateList.next.next.next.next = new ListNode(5);

    let rotations = 2;
    let rotatedList = rotateRight(rotateList, rotations);
    console.log("Rotated list by " + rotations + " positions: ");
    printList(rotatedList);
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
