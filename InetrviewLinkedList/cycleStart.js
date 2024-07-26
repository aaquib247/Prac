class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function detectCycle(head) {
    let length = 0;

    let fast = head;
    let slow = head;

    while (fast !== null && fast.next !== null) {
        fast = fast.next.next;
        slow = slow.next;
        if (fast === slow) {
            length = lengthCycle(slow); // calculate length of the cycle
            break;
        }
    }

    if (length === 0) {
        return null;
    }

    // find the start node of the cycle
    let f = head;
    let s = head;

    while (length > 0) {
        s = s.next;
        length--;
    }

    // move both pointers until they meet at the start of the cycle
    while (f !== s) {
        f = f.next;
        s = s.next;
    }
    return s;
}

function lengthCycle(head) {
    let fast = head;
    let slow = head;

    while (fast !== null && fast.next !== null) {
        fast = fast.next.next;
        slow = slow.next;
        if (fast === slow) {
            // calculate the length of the cycle
            let temp = slow;
            let length = 0;
            do {
                temp = temp.next;
                length++;
            } while (temp !== slow);
            return length;
        }
    }
    return 0;
}

// Example usage
function main() {
    // Create a linked list with a cycle: 1 -> 2 -> 3 -> 4 -> 5 -> 2
    let head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    head.next.next.next = new ListNode(4);
    head.next.next.next.next = new ListNode(5);
    head.next.next.next.next.next = head.next; // cycle back to node with value 2

    let cycleStart = detectCycle(head);
    if (cycleStart !== null) {
        console.log("Cycle starts at node with value: " + cycleStart.val);
    } else {
        console.log("No cycle detected.");
    }
}

main();
