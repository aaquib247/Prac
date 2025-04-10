class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function getIntersectionNode(headA, headB) {
    if (!headA || !headB) return null;

    let a = headA;
    let b = headB;

    while (a !== b) {
        a = a ? a.next : headB;
        b = b ? b.next : headA;
    }

    return a; // could be null or the intersection node
}

function test() {
    // Shared part
    let common = new ListNode(8);
    common.next = new ListNode(9);

    // List A: 1 -> 2 -> 8 -> 9
    let headA = new ListNode(1);
    headA.next = new ListNode(2);
    headA.next.next = common;

    // List B: 3 -> 4 -> 5 -> 8 -> 9
    let headB = new ListNode(3);
    headB.next = new ListNode(4);
    headB.next.next = new ListNode(5);
    headB.next.next.next = common;

    let intersection = getIntersectionNode(headA, headB);
    console.log("Intersection Node Value:", intersection ? intersection.val : "No intersection");
}

test();
