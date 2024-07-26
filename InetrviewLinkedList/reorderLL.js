class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function reorderList(head) {
    if (head === null || head.next === null) {
        return;
    }

    let mid = middleNode(head);
    let hs = reverseList(mid);
    let hf = head;

    // rearrange
    while (hf !== null && hs !== null) {
        let temp = hf.next;
        hf.next = hs;
        hf = temp;

        temp = hs.next;
        hs.next = hf;
        hs = temp;
    }

    // set next of the last node to null
    if (hf !== null) {
        hf.next = null;
    }
}

// Example usage
function main() {
    // Create a linked list: 1 -> 2 -> 3 -> 4 -> 5 -> null
    let reorderList = new ListNode(1);
    reorderList.next = new ListNode(2);
    reorderList.next.next = new ListNode(3);
    reorderList.next.next.next = new ListNode(4);
    reorderList.next.next.next.next = new ListNode(5);

    reorderList(reorderList);
    console.log("Reordered list: ");
    printList(reorderList);
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
