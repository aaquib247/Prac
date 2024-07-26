class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function isPalindrome(head) {
    let mid = middleNode(head);
    let headSecond = reverseList(mid);
    let rereverseHead = headSecond;

    // compare both halves
    while (head !== null && headSecond !== null) {
        if (head.val !== headSecond.val) {
            break;
        }
        head = head.next;
        headSecond = headSecond.next;
    }
    reverseList(rereverseHead);

    return head === null || headSecond === null;
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
    let present = head;
    let next = present ? present.next : null;

    while (present !== null) {
        present.next = prev;
        prev = present;
        present = next;
        next = next ? next.next : null;
    }
    return prev;
}

// Example usage
function main() {
    // Create a palindrome linked list: 1 -> 2 -> 3 -> 2 -> 1 -> null
    let palindromeList = new ListNode(1);
    palindromeList.next = new ListNode(2);
    palindromeList.next.next = new ListNode(3);
    palindromeList.next.next.next = new ListNode(2);
    palindromeList.next.next.next.next = new ListNode(1);

    let isPalindromeResult = isPalindrome(palindromeList);
    console.log("Is the list a palindrome? " + isPalindromeResult);
}

main();
