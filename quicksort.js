function quickSort(nums, low, hi) {
    if (low >= hi) {
        return;
    }

    let s = low;
    let e = hi;
    let m = Math.floor(s + (e - s) / 2);
    let pivot = nums[m];

    while (s <= e) {
        while (nums[s] < pivot) {
            s++;
        }
        while (nums[e] > pivot) {
            e--;
        }

        if (s <= e) {
            let temp = nums[s];
            nums[s] = nums[e];
            nums[e] = temp;
            s++;
            e--;
        }
    }

    quickSort(nums, low, e);
    quickSort(nums, s, hi);
}

// Example usage:
let arr = [5,2,6,1,9];
quickSort(arr, 0, arr.length - 1);
console.log(arr); // Output: [1, 2, 3, 4, 5]
