//TC- O(2^m+n) and SC- O(m+n)
var uniquePathsWithObstacles = function (obstacleGrid) {
    let m = obstacleGrid.length;
    let n = obstacleGrid[0].length;

    function findObs(i,j) {
        if(i === 0 && j === 0 && obstacleGrid[i][j] === 0)
            return 1;

        if(i < 0 || j < 0 || obstacleGrid[i][j])
            return 0;

        let up = findObs(i - 1, j)
        let left = findObs(i, j - 1)
        return up + left
    }
    return findObs(m - 1, n - 1)
};

//Memoization
//TC- O(m*n) and SC- O(m+n)+O(m*n)
var uniquePathsWithObstacles = function (obstacleGrid) {
    let m = obstacleGrid.length;
    let n = obstacleGrid[0].length;
    let dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(-1));

    function findObs(i,j) {
        if(i === 0 && j === 0 && obstacleGrid[i][j] === 0)
            return 1;

        if(i < 0 || j < 0 || obstacleGrid[i][j])
            return 0;

        if(dp[i][j] !== -1)
            return dp[i][j]

        let up = findObs(i - 1, j)
        let left = findObs(i, j - 1)

        return dp[i][j] = up + left
    }
    return findObs(m - 1, n - 1)
};