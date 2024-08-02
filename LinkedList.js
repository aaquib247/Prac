class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList1 {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    insertFirst(val) {
        const node = new Node(val);
        node.next = this.head;
        this.head = node;
        if (!this.tail) {
            this.tail = this.head;
        }
        this.size++;
    }

    insertLast(val) {
        if (!this.tail) {
            this.insertFirst(val);
            return;
        }
        const node = new Node(val);
        this.tail.next = node;
        this.tail = node;
        this.size++;
    }

    insert(val, index) {
        if (index < 0 || index > this.size) {
            return; // Index out of bounds
        }
        if (index === 0) {
            this.insertFirst(val);
            return;
        }
        if (index === this.size) {
            this.insertLast(val);
            return;
        }

        const prev = this.get(index - 1);
        const node = new Node(val, prev.next);
        prev.next = node;
        this.size++;
    }

    deleteLast() {
        if (this.size <= 1) {
            return this.deleteFirst();
        }

        const secondLast = this.get(this.size - 2);
        const val = this.tail.value;
        this.tail = secondLast;
        this.tail.next = null;
        this.size--;
        return val;
    }

    delete(index) {
        if (index < 0 || index >= this.size) {
            return; // Index out of bounds
        }
        if (index === 0) {
            return this.deleteFirst();
        }
        if (index === this.size - 1) {
            return this.deleteLast();
        }

        const prev = this.get(index - 1);
        const val = prev.next.value;
        prev.next = prev.next.next;
        this.size--;
        return val;
    }

    find(value) {
        let node = this.head;
        while (node) {
            if (node.value === value) {
                return node;
            }
            node = node.next;
        }
        return null;
    }

    get(index) {
        if (index < 0 || index >= this.size) {
            return null; // Index out of bounds
        }
        let node = this.head;
        for (let i = 0; i < index; i++) {
            node = node.next;
        }
        return node;
    }

    deleteFirst() {
        if (!this.head) return null;
        const val = this.head.value;
        this.head = this.head.next;
        if (!this.head) {
            this.tail = null;
        }
        this.size--;
        return val;
    }

    display() {
        let temp = this.head;
        let result = '';
        while (temp) {
            result += temp.value + ' -> ';
            temp = temp.next;
        }
        console.log(result + 'END');
    }

    removeDuplicates() {
        let node = this.head;
        while (node && node.next) {
            if (node.value === node.next.value) {
                node.next = node.next.next;
                this.size--;
            } else {
                node = node.next;
            }
        }
        this.tail = node;
        if (this.tail) {
            this.tail.next = null;
        }
    }

    static merge(list1, list2) {
        let f = list1.head;
        let s = list2.head;
        const mergedList = new LinkedList1();

        while (f && s) {
            if (f.value < s.value) {
                mergedList.insertLast(f.value);
                f = f.next;
            } else {
                mergedList.insertLast(s.value);
                s = s.next;
            }
        }

        while (f) {
            mergedList.insertLast(f.value);
            f = f.next;
        }

        while (s) {
            mergedList.insertLast(s.value);
            s = s.next;
        }

        return mergedList;
    }

    bubbleSort() {
        for (let i = 0; i < this.size - 1; i++) {
            let current = this.head;
            let next = current.next;
            for (let j = 0; j < this.size - 1 - i; j++) {
                if (current.value > next.value) {
                    // Swap nodes
                    let temp = current.value;
                    current.value = next.value;
                    next.value = temp;
                }
                current = next;
                next = next.next;
            }
        }
    }

    reverse() {
        if (this.size < 2) {
            return;
        }

        let prev = null;
        let current = this.head;
        let next = null;

        while (current) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        this.tail = this.head;
        this.head = prev;
    }
}

const main = () => {
    const first = new LinkedList1();
    const second = new LinkedList1();

    first.insertLast(1);
    first.insertLast(3);
    first.insertLast(5);
    console.log("First list after insertions:");
    first.display();

    second.insertLast(1);
    second.insertLast(2);
    second.insertLast(9);
    second.insertLast(14);
    console.log("Second list after insertions:");
    second.display();

    const merged = LinkedList1.merge(first, second);
    console.log("Merged list:");
    merged.display();

    const list = new LinkedList1();
    for (let i = 7; i > 0; i--) {
        list.insertLast(i);
    }
    console.log("List before sorting:");
    list.display();

    list.bubbleSort();
    console.log("List after bubble sort:");
    list.display();

    list.reverse();
    console.log("List after reversal:");
    list.display();

    const sortedList = new LinkedList1();
    sortedList.insertLast(1);
    sortedList.insertLast(1);
    sortedList.insertLast(2);
    sortedList.insertLast(3);
    sortedList.insertLast(3);
    sortedList.insertLast(4);
    console.log("Sorted list with duplicates:");
    sortedList.display();

    sortedList.removeDuplicates();
    console.log("List after removing duplicates:");
    sortedList.display();

    list.insert(10, 0); // Insert at the beginning
    list.insert(20, list.size); // Insert at the end
    list.insert(15, 2); // Insert at index 2
    console.log("List after inserting elements at specific positions:");
    list.display();

    list.delete(0); // Delete from the beginning
    list.delete(list.size - 1); // Delete from the end
    list.delete(2); // Delete from index 2
    console.log("List after deleting elements from specific positions:");
    list.display();

    const foundNode = list.find(15);
    console.log(foundNode ? `Found node with value: ${foundNode.value}` : "Node not found");

    list.insertRec(25, 1);
    console.log("List after recursive insertion:");
    list.display();

    const firstDeletedValue = list.deleteFirst();
    console.log(`Deleted first element: ${firstDeletedValue}`);
    list.display();

    const lastDeletedValue = list.deleteLast();
    console.log(`Deleted last element: ${lastDeletedValue}`);
    list.display();
};

// Run the main function
main();
