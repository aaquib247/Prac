function bubblesort(arr) {

    var i, j, temp;

    for (i = 0; i < arr.length; i++) {

        for (j = 0; j < arr.length - i - 1; j++) {

            if (arr[j] > arr[j + 1]) {
                temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }

        }

    }

    return arr;
}

// Example usage:
const arr = [5, 9, 6, 1, 2];
const sortedArr = bubblesort(arr);
console.log(sortedArr); // Output: [1, 2, 3, 4, 5]
