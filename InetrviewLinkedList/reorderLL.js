class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function reorderLL(head) {
    if (head === null || head.next === null) {
        return;
    }

    let mid = middleNode(head);
    let hs = reverseList(mid.next);
    let hf = head;

    // rearrange
    while (hf !== null && hs !== null) {
       let t1 = hf;
       let t2 = hs;
       hf = hf.next;
       hs = hs.next;
       t1.next = t2;
       t2.next = hf;
    }

    // set next of the last node to null
    if (hf !== null) {
        hf.next = null;
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

function reverseList(head) {
    let prev = null;
    let current = head;
    while (current !== null) {
        let next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    return prev;
}

// Helper function to print the linked list
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

// Example usage
function main() {
    // Create a linked list: 1 -> 2 -> 3 -> 4 -> 5 -> null
    let reorderList = new ListNode(1);
    reorderList.next = new ListNode(2);
    reorderList.next.next = new ListNode(3);
    reorderList.next.next.next = new ListNode(4);
    reorderList.next.next.next.next = new ListNode(5);

    reorderLL(reorderList);
    console.log("Reordered list: ");
    printList(reorderList);
}

main();
