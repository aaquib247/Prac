

//TC - O(N) or O(N*logN)  and Sc - O(N)

function countSubarraysWithXorK(arr, k) {
    let count = 0;
    let xorMap = new Map();
    let xor = 0;

    for (let i = 0; i < arr.length; i++) {
        xor ^= arr[i];

        if (xor === k) count++;

        let required = xor ^ k;
        if (xorMap.has(required)) {
            count += xorMap.get(required);
        }

        xorMap.set(xor, (xorMap.get(xor) || 0) + 1);
    }

    return count;
}

// Example usage:
const arr = [4, 2, 2, 6, 4];
const k1 = 6;
const result = countSubarraysWithXorK(arr, k1);
console.log("Number of subarrays with XOR = K:", result);

  
  
  
// O(N2) and Sc - O(1)

function subarraysWithXorK(a, k) {
    const n = a.length; //size of the given array.
    let cnt = 0;
  
    // Step 1: Generating subarrays:
    for (let i = 0; i < n; i++) {
      let xorr = 0;
      for (let j = i; j < n; j++) {
  
        //step 2:calculate XOR of all
        // elements:
        xorr = xorr ^ a[j];
  
        // step 3:check XOR and count:
        if (xorr == k) cnt++;
      }
    }
    return cnt;
  }
  
  const a = [4, 2, 2, 6, 4];
  const k = 6;
  const ans = subarraysWithXorK(a, k);
  console.log(`The number of subarrays with XOR k is: ${ans}`);
  
  // Similar
  // count subarray with sum k.
  function findAllSubarraysWithGivenSum(arr, k) {
    let n = arr.length;
    let mpp = new Map();
    let preSum = 0;
    let count = 0;

    mpp.set(0, 1); // Handle subarrays starting from index 0

    for (let i = 0; i < n; i++) {
        preSum += arr[i];

        let remove = preSum - k;
        if (mpp.has(remove)) {
            count += mpp.get(remove);
        }

        mpp.set(preSum, (mpp.get(preSum) || 0) + 1);
    }

    return count;
}

// Example usage:
let arr1 = [3, 1, 2, 4];
let k2 = 6;
let count = findAllSubarraysWithGivenSum(arr1, k2);
console.log("The number of subarrays is:", count);
