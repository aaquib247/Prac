class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function mergeTwoLists(list1, list2) {
    // Dummy node to start the merged list
    let dummy = new ListNode(-1);
    let current = dummy;

    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }

    // If one list still has nodes left, attach it
    current.next = list1 !== null ? list1 : list2;

    return dummy.next; // Head of merged list
}

// Helper function to print the list
function printList(head) {
    let result = '';
    while (head) {
        result += head.val + ' → ';
        head = head.next;
    }
    console.log(result + 'null');
}

// Creating first sorted list: 1 → 3 → 5
let list1 = new ListNode(1);
list1.next = new ListNode(3);
list1.next.next = new ListNode(5);

// Creating second sorted list: 2 → 4 → 6
let list2 = new ListNode(2);
list2.next = new ListNode(4);
list2.next.next = new ListNode(6);

// Merging
let merged = mergeTwoLists(list1, list2);
printList(merged); // Output: 1 → 2 → 3 → 4 → 5 → 6 → null
