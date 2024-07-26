// We create a class for each node within the list
class Node{
    // Each node has two properties, its value and a pointer that indicates the node that follows
    constructor(val){
        this.val = val
        this.next = null
    }
}

// We create a class for the list
class SinglyLinkedList{
    // The list has three properties, the head, the tail and the list size
    constructor(){
        this.head = null
        this.tail = null
        this.length = 0
    }
    // The push method takes a value as parameter and assigns it as the tail of the list
    push(val) {
        const newNode = new Node(val)
        if (!this.head){
            this.head = newNode
            this.tail = this.head
        } else {
            this.tail.next = newNode
            this.tail = newNode
        }
        this.length++
        return this
    }
    // The pop method removes the tail of the list --->  [node1 - node2 - node3 - node4]
    pop() {
        if (!this.head) return undefined
        var current = this.head
        var newTail = current
        while (current.next) {
            newTail = current
            current = current.next
        }
        this.tail = newTail
        this.tail.next = null
        this.length--
        if (this.length === 0) {
            this.head = null
            this.tail = null
        }
        return current
    }
    // The shift method removes the head of the list
    shift() {
        if (!this.head) return undefined
        var currentHead = this.head
        this.head = currentHead.next
        this.length--
        if (this.length === 0) {
            this.tail = null
        }
        return currentHead
    }
    // The unshift method takes a value as parameter and assigns it as the head of the list
    unshift(val) {
        const newNode = new Node(val)
        if (!this.head) {
            this.head = newNode
            this.tail = this.head
        }
        newNode.next = this.head
        this.head = newNode
        this.length++
        return this
    }
    // The get method takes an index number as parameter and returns the value of the node at that index
    get(index) {
        if(index < 0 || index >= this.length) return null
        var counter = 0
        var current = this.head
        while(counter !== index) {
            current = current.next
            counter++
        }
        return current
    }
    // The set method takes an index number and a value as parameters, and modifies the node value at the given index in the list
    set(index, val) {
        var foundNode = this.get(index)
        if (foundNode) {
            foundNode.val = val
            return true
        }
        return false
    }
    // The insert method takes an index number and a value as parameters, and inserts the value at the given index in the list
    insert(index, val) {
        if (index < 0 || index > this.length) return false
        if (index === this.length) return !!this.push(val)
        if (index === 0) return !!this.unshift(val)

        const newNode = new Node(val)
        var prev = this.get(index - 1)
        var temp = prev.next
        prev.next = newNode
        newNode.next = temp
        this.length++
        return true
    }
    // The remove method takes an index number as parameter and removes the node at the given index in the list
    remove(index) {
        if(index < 0 || index >= this.length) return undefined
        if(index === 0) return this.shift()
        if(index === this.length - 1) return this.pop()
        var previousNode = this.get(index - 1)
        var removed = previousNode.next
        previousNode.next = removed.next
        this.length--
        return removed
    }
    // The reverse method reverses the list and all pointers so that the head becomes the tail and the tail becomes the head
    reverse(){
      var node = this.head
      this.head = this.tail
      this.tail = node
      let next
      var prev = null
      for(let i = 0; i < this.length; i++) {
        next = node.next
        node.next = prev
        prev = node
        node = next
      }
      return this
    }
}

// Create an instance of SinglyLinkedList
const singlyList = new SinglyLinkedList();

// Push values into the list
singlyList.push("Value1");
singlyList.push("Value2");
singlyList.push("Value3");
singlyList.push("Value4");
console.log("After push operations:", singlyList);

// Pop the last value from the list
const poppedValue = singlyList.pop();
console.log("Popped value:", poppedValue.val);
console.log("After pop operation:", singlyList);

// Shift (remove) the first value from the list
const shiftedValue = singlyList.shift();
console.log("Shifted value:", shiftedValue.val);
console.log("After shift operation:", singlyList);

// Unshift (add) a value to the start of the list
singlyList.unshift("NewValue1");
console.log("After unshift operation:", singlyList);

// Get the value at a specific index
const valueAtIndex1 = singlyList.get(1);
console.log("Value at index 1:", valueAtIndex1.val);

// Set the value at a specific index
const setResult = singlyList.set(1, "UpdatedValue2");
console.log("Set result:", setResult);
console.log("After set operation:", singlyList);

// Insert a value at a specific index
const insertResult = singlyList.insert(2, "InsertedValue3");
console.log("Insert result:", insertResult);
console.log("After insert operation:", singlyList);

// Remove a value at a specific index
const removedValue = singlyList.remove(2);
console.log("Removed value:", removedValue.val);
console.log("After remove operation:", singlyList);

// Reverse the list
console.log("Before reverse operation:", singlyList);
singlyList.reverse();
console.log("After reverse operation:", singlyList);
