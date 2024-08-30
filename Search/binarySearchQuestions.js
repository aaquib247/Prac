//https://leetcode.com/problems/search-insert-position/

var searchInsert = function (nums, target) {

    let start = 0;
    let end = nums.length - 1;

    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (nums[mid] === target)
            return mid;

        if (nums[mid] > target)
            end = mid - 1;

        if (nums[mid] < target)
            start = mid + 1;
    }

    return start;
    // to get floor in sorted array --> return end;

};


//https://leetcode.com/problems/find-smallest-letter-greater-than-target/
var nextGreatestLetter = function (letters, target) {
    let start = 0;
    let end = letters.length - 1;

    // If the target is greater than or equal to the largest letter, return the first letter
    if (target >= letters[end]) {
        return letters[0];
    }

    // Perform binary search
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        
        if (letters[mid] <= target) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return letters[start];
};

//Better Way
function nextGreatestLetter(letters, target) {
    let left = 0;
    let right = letters.length - 1;

    // Binary search
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (letters[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    // After binary search, `left` is the smallest index where letters[left] > target
    return letters[left % letters.length];
}

// Example usage:
console.log(nextGreatestLetter(["c", "f", "j"], "a")); // Output: "c"
console.log(nextGreatestLetter(["c", "f", "j"], "c")); // Output: "f"
console.log(nextGreatestLetter(["x", "x", "y", "y"], "z")); // Output: "x"



//https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
var findMin = function (nums) {

    let pivot = find(nums);
    return pivot

};

function find(arr) {
    let s = 0;
    let e = arr.length - 1;

    while (s < e) {
        let m = Math.floor((s + e) / 2);

        if (arr[m] > arr[e])
           s = m + 1;
        else
            e = m;
    }

    return arr[s];
}

//https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/submissions/1371392583/
var searchRange = function (nums, target) {

    let f = true;
    let first = -1;
    let last = -1;
    let arr = []

    first = index(nums, target, f)
    last = index(nums, target, !f)

    if (first != -1 && last != -1) {
        arr.push(first)
        arr.push(last)
        return arr;
    }
    return [-1, -1]
}

function index(nums, target, f) {
    let start = 0;
    let end = nums.length - 1;
    let ans = -1;

    while (start <= end) {
        mid = Math.floor((start + end) / 2);
        if (nums[mid] === target) {
            ans = mid;
            if (f)
                end = mid - 1;
            else
                start = mid + 1;
        }

        if (nums[mid] > target)
            end = mid - 1;

        if (nums[mid] < target)
            start = mid + 1;
    }
    return ans;
}


//https://leetcode.com/discuss/interview-experience/1979273/infinite-sorted-array (search in infinite sorted array)
function searchInInfiniteArray(arr, target) {
    // First, find the range where the target could be
    let start = 0;
    let end = 1;

    // Exponentially expand the range to find the bounds
    while (target > arr[end]) {
        let temp = end + 1; // This is the new start
        end = end + (end - start + 1) * 2; // Double the range size
        start = temp;
    }

    // Perform binary search within the range [start, end]
    return binarySearch(arr, target, start, end);
}

function binarySearch(arr, target, start, end) {
    // Ensure end does not exceed the bounds of the array
    end = Math.min(end, arr.length - 1);

    while (start <= end) {
        let mid = start + Math.floor((end - start) / 2);

        if (target < arr[mid]) {
            end = mid - 1;
        } else if (target > arr[mid]) {
            start = mid + 1;
        } else {
            // Target found
            return mid;
        }
    }

    return -1; // Target not found
}

// Example usage
const arr1 = [3, 5, 7, 9, 10, 90, 100, 130, 140, 160, 170];
const target1 = 10;
console.log(searchInInfiniteArray(arr1, target1)); // Should print the index of the target (4)


//https://leetcode.com/problems/peak-index-in-a-mountain-array/
// same for Medium Question - Find Peak Element

var peakIndexInMountainArray = function (arr) {
    let start = 0;
    let end = arr.length - 1;
    let mid = 0;

    while (start < end) {
        mid = Math.floor((start + end) / 2);
        if (arr[mid] > arr[mid + 1]) {
            end = mid;
        } else {
            start = mid + 1;
        }
    }
    return start;
};

//https://leetcode.com/problems/find-in-mountain-array/description/
class SearchInMountain {
    search(arr, target) {
      const peak = this.peakIndexInMountainArray(arr);
      const firstTry = this.orderAgnosticBS(arr, target, 0, peak);
      if (firstTry !== -1) {
        return firstTry;
      }
      // try to search in the second half
      return this.orderAgnosticBS(arr, target, peak + 1, arr.length - 1);
    }
  
    peakIndexInMountainArray(arr) {
      let start = 0;
      let end = arr.length - 1;
  
      while (start < end) {
        const mid = start + Math.floor((end - start) / 2);
        if (arr[mid] > arr[mid + 1]) {
          // you are in the descending part of the array
          end = mid; // this might be the answer, but look at the left
        } else {
          // you are in the ascending part of the array
          start = mid + 1; // because we know that mid+1 element > mid element
        }
      }
      // start and end are always pointing to the peak element
      return start; // or return end as both are equal
    }
  
    orderAgnosticBS(arr, target, start, end) {
      // find whether the array is sorted in ascending or descending
      const isAsc = arr[start] < arr[end];
  
      while (start <= end) {
        const mid = start + Math.floor((end - start) / 2);
  
        if (arr[mid] === target) {
          return mid;
        }
  
        if (isAsc) {
          if (target < arr[mid]) {
            end = mid - 1;
          } else {
            start = mid + 1;
          }
        } else {
          if (target > arr[mid]) {
            end = mid - 1;
          } else {
            start = mid + 1;
          }
        }
      }
      return -1;
    }
  }
  
  // Example usage
  const searchInMountain = new SearchInMountain();
  const arr = [1, 3, 8, 12, 4, 2];
  const target = 4;
  console.log(searchInMountain.search(arr, target)); // Output: 4
  

  //Roatated Binary Search
