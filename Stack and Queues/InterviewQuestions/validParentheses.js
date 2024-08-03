function isValid(s) {
    const stack = [];

    for (const ch of s) {
        if (ch === '(' || ch === '{' || ch === '[') {
            stack.push(ch);
        } else {
            if (ch === ')') {
                if (stack.length === 0 || stack.pop() !== '(') {
                    return false;
                }
            } else if (ch === '}') {
                if (stack.length === 0 || stack.pop() !== '{') {
                    return false;
                }
            } else if (ch === ']') {
                if (stack.length === 0 || stack.pop() !== '[') {
                    return false;
                }
            }
        }
    }

    return stack.length === 0;
}

// Example usage:
console.log(isValid("()"));         // Output: true
console.log(isValid("()[]{}"));     // Output: true
console.log(isValid("(]"));         // Output: false
console.log(isValid("([)]"));       // Output: false
console.log(isValid("{[]}"));       // Output: true
