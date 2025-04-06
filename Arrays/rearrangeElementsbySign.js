//Brute - Tc(O(N) + O(N/2)) and SC - O(N)
// take 2 arrays one for pos and one for neg and iterate till isze n and place positives at even and odds at odd

// Define a function to rearrange an array of integers by sign.
function RearrangebySign(A) {

    let n = A.length;
    let ans = new Array(n).fill(0);

    let posIndex = 0, negIndex = 1;
    for (let i = 0; i < n; i++) {

      if (A[i] < 0) {
        ans[negIndex] = A[i];
        negIndex += 2;
      }

      else {
        ans[posIndex] = A[i];
        posIndex += 2;
      }
    }
  
    return ans;
  }

//   let A = [1, 2, -4, -5];
//   let ans = RearrangebySign(A);
//   console.log(ans.join(" "));

//FollowUp -- if the pos and neg ar not equals : brute -  take min of either and then fill normally then add remaining.

  function RearrangebySign(A) {
    
    let n = A.length;
    let pos = [];
    let neg = [];
    
    // Segregate the array into positives and negatives.
    for(let i=0;i<n;i++){
        
        if(A[i]>0) pos.push(A[i]);
        else neg.push(A[i]);
    }
    
    // If positives are lesser than the negatives.
    if(pos.length < neg.length){
        
      // First, fill array alternatively till the point 
      // where positives and negatives are equal in number.
      for(let i=0;i<pos.length;i++){
        
        A[2*i] = pos[i];
        A[2*i+1] = neg[i];
      }
      
      // Fill the remaining negatives at the end of the array.
      let index = pos.length*2;
      for(let i = pos.length;i<neg.length;i++){
          
          A[index] = neg[i];
          index++;
      }
    }
    
    // If negatives are lesser than the positives.
    else{
        
        // First, fill array alternatively till the point 
        // where positives and negatives are equal in number.
        for(let i=0;i<neg.length;i++){
        
        A[2*i] = pos[i];
        A[2*i+1] = neg[i];
    }
      
      // Fill the remaining positives at the end of the array.
      let index = neg.length*2;
      for(let i = neg.length;i<pos.length;i++){
          
          A[index] = pos[i];
          index++;
      }
    }
    return A;
      
  }
  
  // Array Initialisation.
  let A = [1,2,-4,-5,3,4];
  
  let ans = RearrangebySign(A);
  
  for (let i = 0; i < ans.length; i++) {
      console.log(ans[i]);
  }