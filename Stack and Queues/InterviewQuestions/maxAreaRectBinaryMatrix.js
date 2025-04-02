function maximalRectangle(matrix) {
    if (matrix.length === 0 || matrix[0].length === 0) return 0;
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    let maxArea = 0;
    
    // Initialize height array with 0s
    const heights = new Array(cols).fill(0);
    
    for (let i = 0; i < rows; i++) {
        // Update heights array for current row
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === '1') {
                heights[j] += 1;
            } else {
                heights[j] = 0;
            }
        }
        
        // Calculate max area for current histogram
        maxArea = Math.max(maxArea, largestRectangleArea(heights));
    }
    
    return maxArea;
}

// Helper functions from your previous implementation
function l(arr) {
    let st = []; 
    let ans = Array(arr.length).fill(-1);

    for (let i = 0; i < arr.length; i++) {
        while (st.length > 0 && st[st.length - 1][0] >= arr[i]) {
            st.pop();
        }
        if (st.length > 0) {
            ans[i] = st[st.length - 1][1];
        }
        st.push([arr[i], i]);
    }
    return ans;
}

function r(arr) {
    let stk = []; 
    let res = Array(arr.length).fill(arr.length);

    for (let i = arr.length - 1; i >= 0; i--) {
        while (stk.length > 0 && stk[stk.length - 1][0] >= arr[i]) {
            stk.pop();
        }
        if (stk.length > 0) {
            res[i] = stk[stk.length - 1][1];
        }
        stk.push([arr[i], i]);
    }
    return res;
}

function largestRectangleArea(heights) {
    let left = l(heights);
    let right = r(heights);
    let max = 0;

    for (let i = 0; i < heights.length; i++) {
        let width = right[i] - left[i] - 1;
        let area = width * heights[i];
        max = Math.max(max, area);
    }
    return max;
}

// Example Usage:
const matrix1 = [
    ["1","0","1","0","0"],
    ["1","0","1","1","1"],
    ["1","1","1","1","1"],
    ["1","0","0","1","0"]
];
console.log(maximalRectangle(matrix1)); // Output: 6

const matrix2 = [["0"]];
console.log(maximalRectangle(matrix2)); // Output: 0

const matrix3 = [["1"]];
console.log(maximalRectangle(matrix3)); // Output: 1