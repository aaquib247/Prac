function selectionSortDescending(arr) {
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        // Assume the maximum is the first element in the unsorted portion
        let maxIndex = i;

        // Find the index of the maximum element in the unsorted portion
        for (let j = i + 1; j < n; j++) {
            if (arr[j] > arr[maxIndex]) {
                maxIndex = j;
            }
        }

        // Swap the found maximum element with the first element of the unsorted portion
        if (maxIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[maxIndex];
            arr[maxIndex] = temp;
        }
    }

    return arr;
}

// Example usage
let array = [4, 1, 8, 3, 9];
console.log("Original array:", array);
console.log("Sorted array (Descending):", selectionSortDescending(array));
