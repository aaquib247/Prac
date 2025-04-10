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

    // Create a dummy node that acts as the previous node to head
    let dummy = new ListNode(0);
    dummy.next = head;
    let prevTail = dummy;  // The previous node after reversing

    let current = head;

    while (current !== null) {
        let last = prevTail;
        let newEnd = current;

        // Reverse the first K nodes in this group
        let count = 0;
        let prev = null;
        while (current !== null && count < k) {
            let nextNode = current.next;  // Save the next node
            current.next = prev;          // Reverse the current node
            prev = current;               // Move prev to current
            current = nextNode;           // Move to the next node
            count++;
        }

        // After reversing, connect the previous part (last) to the reversed part (prev)
        last.next = prev;

        // Connect the new end of the reversed group to the next part
        newEnd.next = current;

        // Skip the next K nodes
        for (let i = 0; current !== null && i < k; i++) {
            prevTail = current;
            current = current.next;
        }
    }

    return dummy.next;  // Return the head of the modified list
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
    // Create a linked list: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
    let head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    head.next.next.next = new ListNode(4);
    head.next.next.next.next = new ListNode(5);
    head.next.next.next.next.next = new ListNode(6);

    let k = 2;
    let reversedAlternateKGroup = reverseAlternateKGroup(head, k);
    console.log("Reversed alternate in groups of " + k + ": ");
    printList(reversedAlternateKGroup);
}

main();
