// function isValid(s) {
//     const stack = [];
//     for (const it of s) {
//         if (it === '(' || it === '[' || it === '{') {
//             stack.push(it);
//         } else {
//             if (stack.length === 0) return false;
//             const ch = stack.pop();
//             if ((it === ')' && ch === '(') || (it === ']' && ch === '[') || (it === '}' && ch === '{')) {
//                 continue;
//             } else {
//                 return false;
//             }
//         }
//     }
//     return stack.length === 0;
// }

// TC - O(N) and SC - O(N)
function isValid(s) {
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        let ch = s[i];
        if (ch === '(' || ch === '[' || ch === '{')
            stack.push(ch)
        else {
            if (stack.length === 0) return false;
            let t = stack.pop()
            if ((t === '(' && ch === ')') || (t === '[' && ch === ']') || (t === '{' && ch === '}'))
                continue;
            else
                 return false;
        }
    }
    return stack.length === 0;
}

const s = "()[{}()]";
if (isValid(s)) {
    console.log("True");
} else {
    console.log("False");
}