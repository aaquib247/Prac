class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function isPalindrome(head) {
    
    if (head === null || head.next === null) return true;

    let mid = middleNode(head);
    let headSecond = reverseList(mid);
    let rereverseHead = headSecond;

    let isPalin = true;
    while (headSecond !== null) {
        if (head.val !== headSecond.val) {
            isPalin = false;
            break;
        }
        head = head.next;
        headSecond = headSecond.next;
    }

    reverseList(rereverseHead); // restore list
    return isPalin;
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

// Example usage
function main() {
    // Create a palindrome list: 1 -> 2 -> 3 -> 2 -> 1
    let head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    head.next.next.next = new ListNode(2);
    head.next.next.next.next = new ListNode(1);

    console.log("Is the list a palindrome? " + isPalindrome(head)); // true
}

main();
