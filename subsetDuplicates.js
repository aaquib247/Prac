function subsetDuplicate(arr) {
    arr.sort(); // Sort the array to handle duplicates
    let outer = [[]];

    for (let i = 0; i < arr.length; i++) {
        let start = 0;
        let end = 0;
        // Adjust start index if current and previous elements are the same
        if (i > 0 && arr[i] === arr[i - 1]) {
            start = end + 1;
        }
        end = outer.length - 1;
        let n = outer.length;
        
        for (let j = start; j <= end; j++) {
            let internal = outer[j].slice(); // Create a copy of the subset
            internal.push(arr[i]); // Add current element to the subset
            outer.push(internal); // Add the updated subset to the result
        }
    }
    return outer;
}

// Example usage:
let arr = [1, 2, 2];
let ans = subsetDuplicate(arr);
for (let list of ans) {
    console.log(list);
}