
// Question: 1190. Reverse Substrings Between Each Pair of Parentheses
//example 1:
// Input: s = "(abcd)"
// Output: "dcba"

//example 2:
// Input: s = "(u(love)i)"
// Output: "iloveu"

//example 3:
// Input: s = "(ed(et(oc))el)"
// Output: "leetcode"

//Intuition: We can use a stack to keep track of the characters in the string. 
// When we encounter a closing parenthesis, we pop characters from the stack until we reach an opening parenthesis, 
// reverse the popped characters, and push them back onto the stack. Finally, we join the characters in the stack to 
// form the final result.

var reverseParentheses = function (s) {
    const st = [];

    for(const ch of s){
        if(ch !== ')'){
            st.push(ch);
        } else {
            let rev = '';

            while( st[st.length - 1] !== '('){
                rev += st.pop();
            }

            st.pop();

            for(let n of rev){
                st.push(n)
            }
        }
    }
    
    return st.join('')

};

//complexity: O(n) where n is the length of the string s. 
// We traverse the string once and perform constant time operations for each character.