// This question is similar to Painter's Partition Problem and Allocate books or Book Allocation Problem.
// Its to split an array into m subarrays such that the largest sum among these subarrays is minimized.

var splitArray = function(nums, m) {
    let left = Math.max(...nums); 
    let right = nums.reduce((a,b)=>a+b,0);

    const canSplit = (maxSum) => {
        let pieces = 1, current = 0;

        for (let n of nums) {
            if (current + n > maxSum) {
                pieces++;
                current = n;
                if (pieces > m) return false;
            } else {
                current += n;
            }
        }
        return true;
    };

    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (canSplit(mid)) right = mid;
        else left = mid + 1;
    }
    return left;
};
// Example usage:
console.log(splitArray([7,2,5,10,8], 2)); // Output: 18
console.log(splitArray([1,2,3,4,5], 2)); // Output: 9
console.log(splitArray([1,4,4], 3));     // Output: 4   

// Allocate Books Problem
// Given an array of integers where each element represents the number of pages in a book,
// and an integer m representing the number of students, allocate books to students such that
// the maximum number of pages assigned to a student is minimized. Each student must be assigned
// at least one book, and books must be allocated in contiguous order.

function allocateBooks(books, students) {
    if (students > books.length) return -1;  // cannot give at least 1 book per student

    let low = Math.max(...books);  // Minimum possible max pages
    let high = books.reduce((a, b) => a + b, 0);  // Maximum possible max pages

    function canAllocate(maxPages) {
        let requiredStudents = 1;
        let currentPages = 0;

        for (let pages of books) {
            if (currentPages + pages > maxPages) {
                requiredStudents++;
                currentPages = pages;

                if (requiredStudents > students) return false;
            } else {
                currentPages += pages;
            }
        }
        return true;
    }

    let result = -1;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);

        if (canAllocate(mid)) {
            result = mid;
            high = mid - 1;  // try smaller max
        } else {
            low = mid + 1;   // need larger ma
        }
    }

    return result;
}
console.log(allocateBooks([12, 34, 67, 90], 2)); // Output: 113x pages
console.log(allocateBooks([10, 20, 30, 40], 2)); // Output: 60