
//Brute will take O(N2)

// TC O(NlogN) + O(N)  and SC - O(N)
// function majorityElement(arr) {
//     // Size of the given array
//     const n = arr.length;

//     // Creating a Map
//     const map = new Map();

//     // Storing the elements with their occurrences
//     for (let i = 0; i < n; i++) {
//         const num = arr[i];
//         if (map.has(num)) {
//             map.set(num, map.get(num) + 1);
//         } else {
//             map.set(num, 1);
//         }
//     }

//     // Searching for the majority element
//     for (const [num, count] of map) {
//         if (count > Math.floor(n / 2)) {
//             return num;
//         }
//     }

//     return -1;
// }



//Moore's Voting Algo
// TC - O(N) + O(N) and SC- O(1) 
//If the question states that the array must contain a majority element, in that case, we do not need the second check. 
//Then the time complexity will boil down to O(N).
 function majorityElement(arr) {
    // Size of the given array
    let n = arr.length;
    let cnt = 0; // Count
    let el; // Element

    // Applying the algorithm
    for (let i = 0; i < n; i++) {
        if (cnt === 0) {
            cnt = 1;
            el = arr[i];
        } else if (el === arr[i]) {
            cnt++;
        } else {
            cnt--;
        }
    }

    // Checking if the stored element is the majority element
    let cnt1 = 0;
    for (let i = 0; i < n; i++) {
        if (arr[i] === el) {
            cnt1++;
        }
    }

    if (cnt1 > Math.floor(n / 2)) {
        return el;
    }
    return -1;
}

let arr1 = [2, 2, 1, 1, 1, 2, 2];
let ans1 = majorityElement(arr1);
console.log("The majority element is:", ans1);


// for n/3 case
// use maps for better and double loop for brute



// function majorityElement(v) {
//     let n = v.length; // size of the array

//     let cnt1 = 0, cnt2 = 0; // counts
//     let el1 = -Infinity; // element 1
//     let el2 = -Infinity; // element 2

//     // applying the Extended Boyer Moore's Voting Algorithm:
//     for (let i = 0; i < n; i++) {
//         if (cnt1 === 0 && el2 !== v[i]) {
//             cnt1 = 1;
//             el1 = v[i];
//         }
//         else if (cnt2 === 0 && el1 !== v[i]) {
//             cnt2 = 1;
//             el2 = v[i];
//         }
//         else if (v[i] === el1) cnt1++;
//         else if (v[i] === el2) cnt2++;
//         else {
//             cnt1--, cnt2--;
//         }
//     }

//     let ls = []; // list of answers

//     // Manually check if the stored elements in
//     // el1 and el2 are the majority elements:
//     cnt1 = 0, cnt2 = 0;
//     for (let i = 0; i < n; i++) {
//         if (v[i] === el1) cnt1++;
//         if (v[i] === el2) cnt2++;
//     }

//     let mini = Math.floor(n / 3) + 1;
//     if (cnt1 >= mini) ls.push(el1);
//     if (cnt2 >= mini) ls.push(el2);

//     // Uncomment the following line
//     // if it is told to sort the answer array:
//     // ls.sort(); // TC --> O(2*log2) ~ O(1);

//     return ls;
// }

// let arr = [11, 33, 33, 11, 33, 11];
// let ans = majorityElement(arr);
// console.log("The majority elements are: " + ans.join(" "));

