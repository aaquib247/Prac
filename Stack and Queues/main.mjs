import {CustomStack, StackException} from './CustomStack.mjs'
function main() {
    try {
        const stack = new CustomStack();

        // Push elements onto the stack
        for (let i = 0; i < 12; i++) {
            try {
                stack.push(i);
                console.log("Pushed:", i);
            } catch (e) {
                if (e instanceof StackException) {
                    console.log(e.message);
                } else {
                    throw e;
                }
            }
        }

        // Peek the top element
        try {
            console.log("Top element:", stack.peek());
        } catch (e) {
            if (e instanceof StackException) {
                console.log(e.message);
            } else {
                throw e;
            }
        }

        // Pop elements from the stack
        while (!stack.isEmpty()) {
            try {
                console.log("Popped:", stack.pop());
            } catch (e) {
                if (e instanceof StackException) {
                    console.log(e.message);
                } else {
                    throw e;
                }
            }
        }

        // Try popping from an empty stack
        try {
            stack.pop();
        } catch (e) {
            if (e instanceof StackException) {
                console.log(e.message);
            } else {
                throw e;
            }
        }
    } catch (e) {
        console.error("An unexpected error occurred:", e);
    }
}

// Run the main function
main();
