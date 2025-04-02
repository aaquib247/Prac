//O(n) for both

function removeKdigits(num, k) {
    const stack = [];
    
    for (const digit of num) {
        while (k > 0 && stack.length && stack[stack.length - 1] > digit) {
            stack.pop();
            k--;
        }
        stack.push(digit);
    }
    
    // Remove remaining digits from the end if k > 0
    while (k-- > 0) {
        stack.pop();
    }
    
    // Remove leading zeros
    let result = stack.join('');
    
    return result === '' ? '0' : result;
}

console.log(removeKdigits("12345", 2))
console.log(removeKdigits("1432219", 3))