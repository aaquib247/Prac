function search(nums, target) {
    function findPivot(arr) {
        let start = 0;
        let end = arr.length - 1;

        while (start < end) {
            const mid = Math.floor((start + end) / 2);
            if (arr[mid] > arr[end]) {
                // Pivot is in the right half
                start = mid + 1;
            } else {
                // Pivot is in the left half or at mid
                end = mid;
            }
        }

        // 
        // while (start < end) {
        //     const mid = Math.floor((start + end) / 2);
        //     if (arr[mid] > arr[end]) {
        //         // Pivot is in the right half
        //         start = mid + 1;
        //     } else if(arr[mid] < arr[end]) {
        //         // Pivot is in the left half or at mid
        //         end = mid;
        // //     }
        //       else
        //       end --;
        // }

        return start;
    }

    function binarySearch(arr, target, start, end) {
        while (start <= end) {
            const mid = Math.floor((start + end) / 2);
            if (arr[mid] === target) {
                return mid;
            } else if (arr[mid] < target) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }
        return -1;
    }

    const pivot = findPivot(nums);

    // If the pivot is 0, the array is not rotated, so search the entire array
    if (pivot === 0) {
        return binarySearch(nums, target, 0, nums.length - 1);
    }

    // Determine which part of the array to search
    if (target >= nums[0]) {
        // Search in the left sorted part
        return binarySearch(nums, target, 0, pivot - 1);
    } else {
        // Search in the right sorted part
        return binarySearch(nums, target, pivot, nums.length - 1);
    }
}

// Example usage:
console.log(search([4, 5, 6, 7, 0, 1, 2], 0)); // Output: 4
console.log(search([4, 5, 6, 7, 0, 1, 2], 3)); // Output: -1
console.log(search([1], 0)); // Output: -1
