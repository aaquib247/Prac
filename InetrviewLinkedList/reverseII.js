class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function reverseBetween(head, left, right) {
    // Create a dummy node to mark the head of this list
    let dummy = new ListNode(0);
    dummy.next = head;

    // Make markers for the node before the reversing point and the current node
    let leftPre = dummy;
    let currNode = head;

    // Traverse the list to find the (left - 1)th node and the left-th node
    for (let i = 0; i < left - 1; i++) {
        leftPre = leftPre.next;
        currNode = currNode.next;
    }

    // Mark the node where the reversal starts
    let subListHead = currNode;

    // Perform the in-place reversal
    let preNode = null;
    for (let i = 0; i <= right - left; i++) {
        let nextNode = currNode.next;
        currNode.next = preNode;
        preNode = currNode;
        currNode = nextNode;
    }

    // Join the reversed sublist back with the rest of the list
    leftPre.next = preNode;
    subListHead.next = currNode;

    return dummy.next; // Return the new head of the list
}

// Helper function to print the list
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

// Example usage:
function main() {
    // Create a linked list: 1 -> 2 -> 3 -> 4 -> 5 -> null
    let head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    head.next.next.next = new ListNode(4);
    head.next.next.next.next = new ListNode(5);

    let left = 2;
    let right = 4;
    let reversedList = reverseBetween(head, left, right);
    console.log("Reversed between " + left + " and " + right + ": ");
    printList(reversedList);
}

main();




// class ListNode {
//     constructor(val) {
//         this.val = val;
//         this.next = null;
//     }
// }

// function reverseBetween(head, left, right) {
//     if (left === right) {
//         return head;
//     }

//     let current = head;
//     let prev = null;
//     for (let i = 0; current !== null && i < left - 1; i++) {
//         prev = current;
//         current = current.next;
//     }

//     let last = prev;
//     let newEnd = current;

//     let next = current ? current.next : null;
//     for (let i = 0; current !== null && i < right - left + 1; i++) {
//         current.next = prev;
//         prev = current;
//         current = next;
//         next = next ? next.next : null;
//     }

//     if (last !== null) {
//         last.next = prev;
//     } else {
//         head = prev;
//     }

//     newEnd.next = current;
//     return head;
// }

// // Example usage
// function main() {
//     // Create a linked list: 1 -> 2 -> 3 -> 4 -> 5 -> null
//     let head = new ListNode(1);
//     head.next = new ListNode(2);
//     head.next.next = new ListNode(3);
//     head.next.next.next = new ListNode(4);
//     head.next.next.next.next = new ListNode(5);

//     let left = 2;
//     let right = 4;
//     let reversedBetween = reverseBetween(head, left, right);
//     console.log("Reversed between " + left + " and " + right + ": ");
//     printList(reversedBetween);
// }

// function printList(head) {
//     let current = head;
//     let result = "";
//     while (current !== null) {
//         result += current.val + " -> ";
//         current = current.next;
//     }
//     result += "null";
//     console.log(result);
// }

// main();
