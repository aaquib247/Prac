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

    // Create a dummy node to handle edge cases when head changes
    let dummy = new ListNode(0);
    dummy.next = head;

    let prevTail = dummy; // The node before the group that is currently being reversed
    let current = head;

    while (current !== null) {
        // Check if there are at least k nodes left in the list
        let count = 0;
        let temp = current;
        while (temp !== null && count < k) {
            temp = temp.next;
            count++;
        }

        // If there are fewer than k nodes left, no reversal is done for this group
        if (count < k) {
            break;
        }

        // Reverse k nodes
        let prev = null;
        let next = null;
        let lastNodeOfPrevPart = prevTail;
        let lastNodeOfSubList = current;

        // Reverse the k nodes
        for (let i = 0; i < k; i++) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        // Connect with the previous part
        lastNodeOfPrevPart.next = prev;

        // Connect the last node of the reversed group to the next part
        lastNodeOfSubList.next = current;

        // Move the prevTail pointer to the last node of the reversed group
        prevTail = lastNodeOfSubList;
    }

    return dummy.next; // Return the new head
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
    let reversedKGroup = reverseKGroup(head, k);
    console.log("Reversed in groups of " + k + ": ");
    printList(reversedKGroup);
}

main();
