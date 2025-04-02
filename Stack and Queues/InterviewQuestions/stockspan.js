// fin the count of min to the left. 3 has 1,2,3 so for fun[3] = 3, 0 has none and only itself so fun[4] = 1;
// O(N) and O(N)
function fun(arr)
{
    let st = [];
    let ans = Array(arr.length).fill(-1)

    for (let i = 0; i < arr.length; i++) {

        while (st.length > 0 && st[st.length - 1][0] <= arr[i]) {
          st.pop()
        }

        if (st.length > 0)
            ans[i] = st[st.length - 1][1]

        st.push([arr[i], i])
    }
    return ans;
}


let res = fun([4, 1, 2, 3, 0])
console.log(res)
for(let i = 0 ;i < res.length; i++){
    res[i] = i - res[i]
}

console.log(res); //out -[1,1,2,3,1]