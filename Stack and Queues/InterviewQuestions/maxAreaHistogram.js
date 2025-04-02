//O(N) and O(N)

function l(arr) {
    let st = []; 
    let ans = Array(arr.length).fill(-1); // Left boundary initialized to -1

    for (let i = 0; i < arr.length; i++) {
        while (st.length > 0 && st[st.length - 1][0] >= arr[i]) {
            st.pop();
        }
        if (st.length > 0) {
            ans[i] = st[st.length - 1][1];
        }
        st.push([arr[i], i]); // Store [value, index]
    }
    return ans;
}

function r(arr) {
    let stk = []; 
    let res = Array(arr.length).fill(arr.length); // Right boundary initialized to arr.length

    for (let i = arr.length - 1; i >= 0; i--) {
        while (stk.length > 0 && stk[stk.length - 1][0] >= arr[i]) {
            stk.pop();
        }
        if (stk.length > 0) {
            res[i] = stk[stk.length - 1][1];
        }
        stk.push([arr[i], i]); // Store [value, index]
    }
    return res;
}

function largestRectangleArea(heights) {
    let left = l(heights);
    let right = r(heights);
    let max = 0;

    for (let i = 0; i < heights.length; i++) {
        let width = right[i] - left[i] - 1; // Corrected width calculation
        let area = width * heights[i];
        max = Math.max(max, area);
    }
    return max;
}

// Example Usage:
let heights = [6, 2, 5, 4, 5, 1, 6];
console.log(largestRectangleArea(heights)); // Output: 12
