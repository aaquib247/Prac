//https://leetcode.com/problems/min-stack/description/
// TC - O(1) for push and pop and for getMin its O(N)
class MinStack {
    constructor() {
        this.stack = [];  // Main stack to store elements
    }

    push(val) {
        this.stack.push(val);
    }

    pop() {
        if (this.stack.length === 0) return null;
        return this.stack.pop();
    }

    top() {
        if (this.stack.length === 0) return null;
        return this.stack[this.stack.length - 1];
    }

    getMin() {
        if (this.stack.length === 0) return null;
        let min = this.stack[0];
        for (const num of this.stack) {
            if (num < min) min = num;
        }
        return min;
    }
}

// Example Usage
const minStack1 = new MinStack();
minStack1.push(-2);
minStack1.push(0);
minStack1.push(-3);
console.log(minStack1.getMin()); // Output: -3 (scans entire stack)
minStack1.pop();
console.log(minStack1.top());    // Output: 0
console.log(minStack1.getMin()); // Output: -2 (scans again)

//------------------------------------
// use another stack tos ave min and return
//getMin - O(1)
class MinStackOptimized {
    constructor() {
        this.stack = [];  // Main stack
        this.minStack = [];  // Tracks minimums
    }

    push(val) {
        this.stack.push(val);
        if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(val);
        }
    }

    pop() {
        if (this.stack.length === 0) return null;
        const popped = this.stack.pop();
        if (popped === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }
        return popped;
    }

    top() {
        if (this.stack.length === 0) return null;
        return this.stack[this.stack.length - 1];
    }

    getMin() {
        if (this.minStack.length === 0) return null;
        return this.minStack[this.minStack.length - 1];  // O(1)
    }
}

// Example Usage
const minStackOpt = new MinStackOptimized();
minStackOpt.push(-2);
minStackOpt.push(0);
minStackOpt.push(-3);
console.log(minStackOpt.getMin()); // Output: -3 (O(1))
minStackOpt.pop();
console.log(minStackOpt.top());    // Output: 0
console.log(minStackOpt.getMin()); // Output: -2 (O(1))

//----------------------------------
// so if mini is encountered, use the below formula.
class MinStack {
    constructor() {
        this.stack = [];
        this.mini = Infinity; // Tracks current minimum
    }

    push(val) {
        if (this.stack.length === 0) {
            this.mini = val;
            this.stack.push(val);
        } else {
            if (val < this.mini) {
                // Push encoded value (2*val - prev_mini)
                this.stack.push(2 * val - this.mini);
                this.mini = val; // Update mini to new min
            } else {
                this.stack.push(val);
            }
        }
    }

    pop() {
        if (this.stack.length === 0) return;

        const popped = this.stack.pop();
        if (popped < this.mini) {
            // Restore previous mini
            this.mini = 2 * this.mini - popped;
        }
    }

    top() {
        if (this.stack.length === 0) return null;
        const top = this.stack[this.stack.length - 1];
        // If top is encoded, return mini; else return top
        return top < this.mini ? this.mini : top;
    }

    getMin() {
        return this.mini;
    }
}

// Example Usage
const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); // -3
minStack.pop();
console.log(minStack.top());    // 0
console.log(minStack.getMin()); // -2


// Approach	         getMin()   Time	      SpaceComplexity	  
// Brute Force	       O(n)	    O(n)	           Easy	           
// Two-Stack	       O(1)	    O(n)              (worst)	    
// Space-Optimized	   O(1)	    O(1)            additional    