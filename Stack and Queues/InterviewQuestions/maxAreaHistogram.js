//O(N) and O(N)

function l(arr) {
    let st = []; 
    let ans = Array(arr.length).fill(-1); // Left boundary initialized to -1    

    for (let i = 0; i < arr.length; i++) {
        while (st.length > 0 && arr[st[st.length - 1]] >= arr[i]) {
            st.pop();
        }
        if (st.length > 0) {
            ans[i] = st[st.length - 1]; // Store index of the next smaller element on the left
        }
        st.push(i); // Store only the index
    }
    return ans;
}

function r(arr) {
    let stk = []; 
    let res = Array(arr.length).fill(-1); // Right boundary initialized to arr.length

    for (let i = arr.length - 1; i >= 0; i--) {
        while (stk.length > 0 && arr[stk[stk.length - 1]] >= arr[i]) {
            stk.pop();
        }
        if (stk.length > 0) {
            res[i] = stk[stk.length - 1]; // Store index of the next smaller element on the right
        }
        stk.push(i); // Store only the index
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
// let heights = [6, 2, 5, 4, 5, 1, 6];
let heights = [2,1,5,6,2,3];
console.log(largestRectangleArea(heights)); // Output: 12



//Max Area Rectangle in binary matrix
// so when mah method is called assume it gives your max area like above

var maximalRectangle = function(matrix) {
    if (matrix.length === 0 || matrix[0].length === 0) return 0;
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    let maxArea = 0;
    
    // Create an array to store the height of each column (for histogram)
    let heights = Array(cols).fill(0);
    
    // Iterate through each row in the matrix
    for (let r = 0; r < rows; r++) {
        // Update heights array based on the current row
        for (let c = 0; c < cols; c++) {
            if (matrix[r][c] === '1') {
                heights[c] += 1; // Increase height if the cell is 1
            } else {
                heights[c] = 0; // Reset height if the cell is 0
            }
        }

        // Calculate the largest rectangle area for this updated histogram
        maxArea = Math.max(maxArea, largestRectangleInHistogram(heights));
    }
    
    return maxArea;
};

// Helper function to calculate the largest rectangle area in a histogram
function largestRectangleInHistogram(heights) {
    let stack = [];
    let maxArea = 0;
    heights.push(0); // Add a 0 height at the end to ensure the stack is emptied at the end

    for (let i = 0; i < heights.length; i++) {
        while (stack.length > 0 && heights[stack[stack.length - 1]] > heights[i]) {
            let h = heights[stack.pop()];
            let w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, h * w);
        }
        stack.push(i);
    }

    return maxArea;
}
