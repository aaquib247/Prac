// fin the count of min to the left. 3 has 1,2,3 so for fun[3] = 3, 0 has none and only itself so fun[4] = 1;
// O(N) and O(N)
// function fun(arr)
// {
//     let st = [];
//     let ans = Array(arr.length).fill(-1)

//     for (let i = 0; i < arr.length; i++) {

//         while (st.length > 0 && st[st.length - 1][0] <= arr[i]) {
//           st.pop()
//         }

//         if (st.length > 0)
//             ans[i] = st[st.length - 1][1]

//         st.push([arr[i], i])
//     }
//     return ans;
// }


// // let res = fun([4, 1, 2, 3, 0])
// let res = fun([100,80,60,70,60,75,85])
// console.log(res)
// for(let i = 0 ;i < res.length; i++){
//     res[i] = i - res[i]
// }

// console.log(res); //out -[1,1,2,3,1]


function fun(arr) {
    let st = [];  // Stack to store numbers and their indices
    let ans = Array(arr.length).fill(-1);  // Array to store the index of the next greater element, initially -1

    // Loop through the array
    for (let i = 0; i < arr.length; i++) {
        // If the current number is greater than the number at the top of the stack
        // then that number is the "next greater" for those we are popping
        while (st.length > 0 && arr[st[st.length - 1]] <= arr[i]) {
            st.pop();  // Pop from stack
        }

        // If the stack is not empty, then the top of the stack is the next greater element for arr[i]
        if (st.length > 0) {
            ans[i] = st[st.length - 1];  // Store the index of the next greater element
        }

        // Push the current number and its index onto the stack
        st.push(i);
    }

    return ans;  // Return the indices of the next greater elements
}

// Example usage
let res = fun([120, 100, 60, 80, 90, 110, 115]) 
console.log("Indices of next greater elements:", res);  // Output the indices of the next greater elements

for (let i = 0; i < res.length; i++) {
    if (res[i] !== -1) {
        res[i] = i - res[i];  // Calculate the distance between current index and the next greater element index
    }
}

console.log(res);  

