// Import the Stack class from the collections library
const { Stack } = require('collections');

// Function to calculate minimum additions to make the parentheses valid
function minAddToMakeValid(s) {
    const stack = new Stack();

    for (const ch of s) {
        if (ch === ')') {
            if (stack.length > 0 && stack.peek() === '(') {
                stack.pop(); // Remove matching '('
            } else {
                stack.push(ch); // Push ')' if no matching '('
            }
        } else {
            stack.push(ch); // Push '(' or other characters
        }
    }

    return stack.length; // Number of unmatched parentheses
}

// Example usage:
console.log(minAddToMakeValid("())"));     // Output: 1
console.log(minAddToMakeValid("((("));     // Output: 3
console.log(minAddToMakeValid("()"));      // Output: 0
console.log(minAddToMakeValid("())("));    // Output: 2
