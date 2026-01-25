var longestValidParentheses = function (s) {
    let stack = [];
    let maxLen = 0;

    for (let i = 0; i < s.length; i++) {
        let ch = s[i];

        if (ch === '(' && (st[st.length - 1] === ')' || st.length === 0)) {
            stack.push(ch);
        }
        else {
            if (st.length > 0 && ch === ')' && st[st.length - 1] !== ')') {
                st.push(ch);
                maxLen = Math.max(maxLen, st.length);
            }
            else if (ch === '(') {
                st.pop()
            } else {
                st = [];
                continue
            }
        }
    }

    return maxLen;
};

console.log(longestValidParentheses("()(() ")); // Output: 2
console.log(longestValidParentheses(")()())"));  //output: 4