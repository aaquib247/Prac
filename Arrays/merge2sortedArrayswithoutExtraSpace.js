
//Time Complexity: O(n+m) + O(n+m), where n and m are the sizes of the given arrays.
//Space Complexity: O(n+m) as we use an extra array of size n+m.
function merge(arr1, arr2, n, m) {

    //Declare a 3rd array and 2 pointers:
    let arr3 = new Array(n + m);
    let left = 0;
    let right = 0;

    let index = 0;

    //Insert the elements from the 2 arrays
    // into the 3rd array using left and right
    // pointers:

    while (left < n && right < m) {
        if (arr1[left] <= arr2[right]) {
            arr3[index] = arr1[left];
            left++, index++;
        }
        else {
            arr3[index] = arr2[right];
            right++, index++;
        }
    }

    // If right pointer reaches the end:
    while (left < n) {
        arr3[index++] = arr1[left++];
    }

    // If left pointer reaches the end:
    while (right < m) {
        arr3[index++] = arr2[right++];
    }

    // Fill back the elements from arr3[]
    // to arr1[] and arr2[]:
    for (let i = 0; i < n + m; i++) {
        if (i < n) arr1[i] = arr3[i];
        else arr2[i - n] = arr3[i];
    }
}

// let arr1 = [1, 4, 8, 10];
// let arr2 = [2, 3, 9];
// let n = 4, m = 3;
let arr1 = [3,1,5];
let arr2 = [0,8,9,2];
let n = 3, m = 4;
merge(arr1, arr2, n, m);
console.log("The merged arrays are: ");
console.log("arr1[] = " + arr1.join(" "));
console.log("arr2[] = " + arr2.join(" "));

//Without Extra Space
//Time Complexity: O(min(n, m)) + O(n*logn) + O(m*logm), where n and m are the sizes of the given arrays.
// Space Complexity: O(1) as we are not using any extra space.
function merge(arr1, arr2, n, m) {
    // First sort both arrays:
    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);

    //Declare 2 pointers:
    let left = n - 1;
    let right = 0;

    //Swap the elements until arr1[left] is
    // greater than arr2[right]:
    while (left >= 0 && right < m) {
        if (arr1[left] > arr2[right]) {
            [arr1[left], arr2[right]] = [arr2[right], arr1[left]];
            left--;
            right++;
        } else {
            break;
        }
    }

    // Final sort to ensure overall order
    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);
}

let num = [3,1,5];
let num2 = [0,8,9,2];
let x = 3, y = 4;
merge(num, num2, x, y);
console.log("The merged arrays are: ");
console.log("arr1[] = " + num.join(" "));
console.log("arr2[] = " + num2.join(" "));