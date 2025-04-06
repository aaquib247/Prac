
//Time Complexity: O(N*logN) + O(2*N), where N = the size of the given array.
//SC - O(N)
function mergeOverlappingIntervals(arr) {
    const n = arr.length; // size of the array

    //sort the given intervals:
    arr.sort((a, b) => a[0] - b[0]);
  
    const ans = [];
  
    for (let i = 0; i < n; i++) { // select an interval:
      let start = arr[i][0];
      let end = arr[i][1];
  
      //Skip all the merged intervals:
      if (ans.length && end <= ans[ans.length - 1][1]) {
        continue;
      }
  
      //check the rest of the intervals:
      for (let j = i + 1; j < n; j++) {
        if (arr[j][0] <= end) {
          end = Math.max(end, arr[j][1]);
        } else {
          break;
        }
      }
      ans.push([start, end]);
    }
    return ans;
  }
  
  const arr = [[1, 3], [8, 10], [2, 6], [15, 18]];
  const ans = mergeOverlappingIntervals(arr);
  console.log("The merged intervals are:");
  for (let it of ans) {
    console.log(`[${it[0]}, ${it[1]}]`);
  }

//Optimal


//O(N*logN) + O(N), where N = the size of the given array - done in single iteratio and SC is same
function mergeOverlappingIntervals(arr) {
    const n = arr.length;
    
    // sort the given intervals
    arr.sort((a, b) => a[0] - b[0]);
    
    const ans = [arr[0]];
    
    for (let i = 1; i < n; i++) {
      const last = ans[ans.length - 1];
      const curr = arr[i];
      
      // if the current interval overlaps with the last interval
      if (curr[0] <= last[1]) {
        last[1] = Math.max(last[1], curr[1]);
      }
      // if the current interval does not overlap with the last interval
      else {
        ans.push(curr);
      }
    }
    
    return ans;
  }
  
  const arr1 = [[1, 3], [8, 10], [2, 6], [15, 18]];
  const ans1 = mergeOverlappingIntervals(arr);
  console.log("The merged intervals are:");
  for (let it of ans1) {
    console.log(`[${it[0]}, ${it[1]}]`);
  }
  
  
  
  
  