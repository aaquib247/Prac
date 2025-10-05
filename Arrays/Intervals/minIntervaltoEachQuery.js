//https://neetcode.io/problems/minimum-interval-including-query?list=neetcode150

function minInterval(intervals, queries) {
    // Step 1: Sort the intervals by size (right - left + 1) in ascending order
    intervals.sort((a, b) => (a[1] - a[0]) - (b[1] - b[0]));
    
    // Step 2: Sort queries to process them in order
    const result = [];
    
    for (let q of queries) {
        let smallestInterval = -1;
        
        // Step 3: Iterate through intervals and find the smallest one that contains the query
        for (let [left, right] of intervals) {
            if (left <= q && right >= q) {
                smallestInterval = right - left + 1; // The size of the interval
                break; // No need to check further intervals, we found the smallest one
            }
        }
        
        // Add the result for the current query
        result.push(smallestInterval);
    }

    return result;
}

// Test the function
const intervals = [[1, 4], [2, 4], [3, 6], [4, 4]];
const queries = [2, 3, 4, 5];
console.log(minInterval(intervals, queries));  // Output: [3, 3, 1, 4]
