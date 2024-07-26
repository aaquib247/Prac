function subset(arr) {
    let outer = [[]];

    for (let num of arr) {
        let n = outer.length;
        for (let i = 0; i < n; i++) {
            let internal = outer[i].slice(); // Create a copy of the subset
            internal.push(num); // Add current element to the subset
            outer.push(internal); // Add the updated subset to the result
        }
    }

    return outer;
}

// Example usage:
let arr = [1, 2, 3];
let ans = subset(arr);
for (let list of ans) {
    console.log(list);
}
