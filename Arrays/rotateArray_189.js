

//O(n) time and O(n) space
//Intuition: The idea is to create a new array and store the elements in their new positions after rotation. 
// Then copy the new array back to the original array.
var rotate = function(nums, k) {
    const n = nums.length;
    k %= n;

    const res = new Array(n);

    for (let i = 0; i < n; i++) {
        res[(i + k) % n] = nums[i];
    }

    for (let i = 0; i < n; i++) {
        nums[i] = res[i];
    }
};


//O(n) time and O(1) space
//Intuition: The idea is to reverse the whole array, then reverse the first k elements and finally reverse the rest n-k elements.
var rotate = function(nums, k) {
    const n = nums.length;
    k %= n;

    reverse(nums, 0, n - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, n - 1);
};

function reverse(arr, left, right) {
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
}