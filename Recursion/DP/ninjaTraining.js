//https://www.naukri.com/code360/problems/ninja%E2%80%99s-training_3621003?utm_source=striver&utm_medium=website&utm_campaign=a_zcoursetuf

var matrixDistance = function (n, points) {
    function f(days, last) {

        if (days === 0) {
            let max = 0;
            for (let i = 0; i < 3; i++) {
                if (i !== last) {
                    max = Math.max(max, points[0][i])
                }
            }
            return max;
        }

        let maxi = 0;
        for (let i = 0; i < 3; i++) {
            if (i !== last) {
                let activity = points[days][i] + f(days - 1, i);
                maxi = Math.max(maxi, activity)
            }
        }
        return maxi;
    }

    return f(n - 1, 3)
};
//TC - O(3^N) and SC - O(N) where N is number of days
//TC is exponential because for each day we are making 3 recursive calls (one for each activity) and the depth of the recursion tree is N (number of days).

  // Define the 'points' array with the ninja training data
  let points = [
    [10, 40, 70],
    [20, 50, 80],
    [30, 60, 90]
  ];
  
  // Get the number of days
  let n = points.length;
console.log(matrixDistance(n,points))

// By Memoization 
// declare a dp array with values -1/undefined or null
// if found then return 
// return statement
// TC - O(N*4)*3 and SC - O(N)(days)+O(N*4)
//why TC is O(N*4)*3 because for each day (N) and for each last activity (4), we are making 3 recursive calls (one for each activity except the last one).
var matrixDistance = function (n, points) {
    let dp = Array.from({ length: n }, () => new Array(4).fill(-1));
    function f(days, last) {

        if(dp[days][last] !== -1)
             return dp[days][last]

        if (days === 0) {
            let max = 0;
            for (let i = 0; i < 3; i++) {
                if (i !== last) {
                    max = Math.max(max, points[0][i])
                }
            }
            return dp[days][last] = max;
        }

        let maxi = 0;
        for (let i = 0; i < 3; i++) {
            if (i !== last) {
                let activity = points[days][i] + f(days - 1, i);
                maxi = Math.max(maxi, activity)
            }
        }
        return dp[days][last] = maxi;
    }

    return f(n - 1, 3)
};

  // Define the 'points' array with the ninja training data
  let point = [
    [10, 40, 70],
    [20, 50, 80],
    [30, 60, 90]
  ];
  
  // Get the number of days
  let m = points.length;
console.log(matrixDistance(m,point))


// Tabulation
// TC - O(N*4)*3 and SC - O(N*4)
function ninjaTraining(n, points) {
    // Create a 2D array 'dp' with dimensions (n x 4) and initialize it with 0
    let dp = new Array(n);
    for (let i = 0; i < n; i++) {
      dp[i] = new Array(4).fill(0);
    }
  
    // Initialize the base cases for the first day
    dp[0][0] = Math.max(points[0][1], points[0][2]);
    dp[0][1] = Math.max(points[0][0], points[0][2]);
    dp[0][2] = Math.max(points[0][0], points[0][1]);
    dp[0][3] = Math.max(points[0][0], Math.max(points[0][1], points[0][2]));
  
    // Loop through each day and calculate the maximum points
    for (let day = 1; day < n; day++) {
      for (let last = 0; last < 4; last++) {
        dp[day][last] = 0;
        for (let task = 0; task <= 2; task++) {
          if (task !== last) {
            // Calculate the points for the current activity and update 'dp'
            let activity = points[day][task] + dp[day - 1][task];
            dp[day][last] = Math.max(dp[day][last], activity);
          }
        }
      }
    }
  
    // The maximum points are stored in dp[n-1][3]
    return dp[n - 1][3];
  }
  
  // Define the 'points' array with the ninja training data
  let points3 = [
    [10, 40, 70],
    [20, 50, 80],
    [30, 60, 90]
  ];
  
  // Get the number of days
  let n3 = points.length;
  
  // Call the 'ninjaTraining' function and print the result
  console.log(ninjaTraining(n3, points3));
  
  

