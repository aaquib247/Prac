// This question is similar to Painter's Partition Problem and Allocate books or Book Allocation Problem.
// Its to split an array into m subarrays such that the largest sum among these subarrays is minimized.

// Pattern: Minimize Maximum (Binary Search on Answer)
// TC: O(n * log(sum)), SC: O(1)

var splitArray = function(nums, k) {
    // Step 1: Define search space
    // Left = max element (can't split a single number)
    // Right = sum of all (put everything in one subarray)
    let left = Math.max(...nums);
    let right = nums.reduce((a, b) => a + b, 0);
    
    // Step 2: Helper function - can we split into k subarrays with max sum ≤ maxSum?
    const canSplit = (maxSum) => {
        let subarrays = 1;      // Start with 1 subarray
        let currentSum = 0;     // Current subarray sum
        
        for (let num of nums) {
            // If adding num exceeds maxSum, start new subarray
            if (currentSum + num > maxSum) {
                subarrays++;
                currentSum = num;   // Start new subarray with current num
                
                // If we need more than k subarrays, maxSum is too small
                if (subarrays > k) return false;
            } else {
                currentSum += num;  // Add to current subarray
            }
        }
        
        return true;  // Successfully split into ≤ k subarrays
    };
    
       // Step 3: Binary search for minimum maxSum
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        
        if (canSplit(mid)) {
            // mid works, try smaller
            right = mid;
        } else {
            // mid too small, need larger
            left = mid + 1;
        }
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

//TC: O(N log S) where N is number of books and S is sum of all pages
//SC: O(1)

function allocateBooks(books, students) {
    if (students > books.length) return -1;  // cannot give at least 1 book per student

    let low = Math.max(...books);  // Minimum possible max pages
    let high = books.reduce((a, b) => a + b, 0);  // Maximum possible max pages

    function canAllocate(maxPages) {
        let requiredStudents = 1; // Start with 1 student why? Because we always need at least one student to allocate books
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
// All possible allocations are:
// [12] and [34, 67, 90] -> max = 191
// [12, 34] and [67, 90] -> max = 157
// [12, 34, 67] and [90] -> max = 113 -- this is the minimum possible maximum
//total pages = 12 + 34 + 67 + 90 = 203
console.log(allocateBooks([10, 20, 30, 40], 2)); // Output: 60

//painters partition problem : The problem is to paint n boards of different lengths with k painters such that the time taken to paint all boards is minimized.
// TC: O(N log S) where N is number of boards and S is sum of all board lengths
// SC: O(1)

function paintersPartition(boards, painters) {
    if (painters > boards.length) return -1;  // cannot assign at least 1 board per painter

    let low = Math.max(...boards);  // Minimum possible max length
    let high = boards.reduce((a, b) => a + b, 0);  // Maximum possible max length

    function canPaint(maxLength) {
        let requiredPainters = 1;
        let currentLength = 0;

        for (let length of boards) {
            if (currentLength + length > maxLength) {
                requiredPainters++;
                currentLength = length;

                if (requiredPainters > painters) return false;
            }               
            else {
                currentLength += length;
            }
        }
        return true;
    }

    let result = -1;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);

        if (canPaint(mid)) {
            result = mid;
            high = mid - 1;  // try smaller max
        } else {
            low = mid + 1;   // need larger max
        }
    }

    return result;
}
console.log(paintersPartition([10, 20, 30, 40], 2)); // Output: 60
console.log(paintersPartition([10, 10, 10, 10], 2)); // Output: 20   

//Capacity to Ship Packages Within D Days : Problem is to find the least weight capacity of a ship such that all packages can be shipped within D days.
// TC: O(N log S) where N is number of weights and S is sum of all weights
// SC: O(1)

function shipWithinDays(weights, days) {
    let low = Math.max(...weights);  // Minimum possible capacity
    let high = weights.reduce((a, b) => a + b, 0);  // Maximum possible capacity

    function canShip(capacity) {
        let requiredDays = 1;
        let currentLoad = 0;

        for (let weight of weights) {
            if (currentLoad + weight > capacity) {
                requiredDays++;
                currentLoad = weight;

                if (requiredDays > days) return false;
            }               
            else {
                currentLoad += weight;
            }           
        }
        return true;
    }

    let result = -1;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);

        if (canShip(mid)) {
            result = mid;
            high = mid - 1;  // try smaller capacity
        } else {
            low = mid + 1;   // need larger capacity
        }
    }

    return result;
}
console.log(shipWithinDays([1,2,3,4,5,6,7,8,9,10], 5)); // Output: 15
console.log(shipWithinDays([3,2,2,4,1,4], 3)); // Output: 6
