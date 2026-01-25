// with second half reversal from mid.next so that mid remains in first half and incase of odd length list, middle element is ignored
class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

var isPalindrome = function(head) {
    if (!head || !head.next) return true;
    
    // STEP 1: Find the middle of the linked list
    let mid = findMiddle(head);
    
    // STEP 2: Reverse the second half starting from mid.next
    let second = reverse(mid.next);
    
    // STEP 3: Compare first half with reversed second half
    let first = head;
    
    while (second) {  // Loop over second (always smaller or equal)
        if (first.val !== second.val) {
            return false;
        }
        first = first.next;
        second = second.next;
    }
    
    return true;
};

// Helper 1: Find middle using slow/fast pointers
function findMiddle(head) {
    let slow = head;
    let fast = head;
    
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;
}

// Helper 2: Reverse linked list iteratively
function reverse(head) {
    let prev = null;
    let curr = head;
    
    while (curr) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    
    return prev;
}

// Example usage:
function main() {
    // Create a palindrome linked list: 1 -> 2 -> 3 -> 3 ->  2 -> 1
    let head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    head.next.next.next = new ListNode(3);
    head.next.next.next.next = new ListNode(2);
    head.next.next.next.next.next = new ListNode(1);
    
    console.log("Is Palindrome: " + isPalindrome(head)); // Output: true

    // Create a non-palindrome linked list: 1 -> 2 -> 3
    let head2 = new ListNode(1);
    head2.next = new ListNode(2);
    head2.next.next = new ListNode(3);
    
    console.log("Is Palindrome: " + isPalindrome(head2)); // Output: false
}

main();


// ------------------
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