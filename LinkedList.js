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

    // Recursive insertion
    insertRec(val, index) {
        this.head = this._insertRec(val, index, this.head);
    }

    _insertRec(val, index, node) {
        if (index === 0) {
            const newNode = new Node(val, node);
            this.size++;
            return newNode;
        }
        node.next = this._insertRec(val, index - 1, node.next);
        return node;
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

    // Remove duplicates from sorted list
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

    // Merge two sorted linked lists
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

    // Bubble sort
    bubbleSort() {
        this._bubbleSort(this.size - 1, 0);
    }

    _bubbleSort(row, col) {
        if (row === 0) {
            return;
        }

        if (col < row) {
            const first = this.get(col);
            const second = this.get(col + 1);

            if (first.value > second.value) {
                // Swap nodes
                if (first === this.head) {
                    this.head = second;
                    first.next = second.next;
                    second.next = first;
                } else if (second === this.tail) {
                    const prev = this.get(col - 1);
                    prev.next = second;
                    this.tail = first;
                    first.next = null;
                    second.next = this.tail;
                } else {
                    const prev = this.get(col - 1);
                    prev.next = second;
                    first.next = second.next;
                    second.next = first;
                }
            }
            this._bubbleSort(row, col + 1);
        } else {
            this._bubbleSort(row - 1, 0);
        }
    }

    // Reverse the linked list iteratively
    reverse() {
        if (this.size < 2) {
            return;
        }

        let prev = null;
        let current = this.head;
        let next = current.next;

        while (current) {
            current.next = prev;
            prev = current;
            current = next;
            if (next) {
                next = next.next;
            }
        }
        this.head = prev;
        this.tail = prev;
    }
}

const main = () => {
    // Create two linked lists
    const first = new LinkedList1();
    const second = new LinkedList1();

    // Insert elements into the first list
    first.insertLast(1);
    first.insertLast(3);
    first.insertLast(5);
    console.log("First list after insertions:");
    first.display();

    // Insert elements into the second list
    second.insertLast(1);
    second.insertLast(2);
    second.insertLast(9);
    second.insertLast(14);
    console.log("Second list after insertions:");
    second.display();

    // Merge the two lists
    const merged = LinkedList1.merge(first, second);
    console.log("Merged list:");
    merged.display();

    // Create a new list for additional operations
    const list = new LinkedList1();
    for (let i = 7; i > 0; i--) {
        list.insertLast(i);
    }
    console.log("List before sorting:");
    list.display();

    // Bubble sort the list
    list.bubbleSort();
    console.log("List after bubble sort:");
    list.display();

    // Reverse the list
    list.reverse();
    console.log("List after reversal:");
    list.display();

    // Remove duplicates from a new sorted list
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

    // Insert at specific positions
    list.insert(10, 0);  // Insert at the beginning
    list.insert(20, list.size); // Insert at the end
    list.insert(15, 2); // Insert at index 2
    console.log("List after inserting elements at specific positions:");
    list.display();

    // Delete elements from specific positions
    list.delete(0); // Delete from the beginning
    list.delete(list.size - 1); // Delete from the end
    list.delete(2); // Delete from index 2
    console.log("List after deleting elements from specific positions:");
    list.display();

    // Test finding an element
    const foundNode = list.find(15);
    console.log(foundNode ? `Found node with value: ${foundNode.value}` : "Node not found");

    // Test inserting with recursion
    list.insertRec(25, 1);
    console.log("List after recursive insertion:");
    list.display();

    // Test deleting the first element
    const firstDeletedValue = list.deleteFirst();
    console.log(`Deleted first element: ${firstDeletedValue}`);
    list.display();

    // Test deleting the last element
    const lastDeletedValue = list.deleteLast();
    console.log(`Deleted last element: ${lastDeletedValue}`);
    list.display();
};

// Run the main function
main();
