var isMatch = function (s, p) {

    function f(i, j) {

        if (i < 0 && j < 0) return true
        if (i < 0 && j >= 0) return false

        if (j < 0 && i >= 0) {

            for (let x = 0; x <= i; x++) {
                if (p[x] !== '*') return false;
            }
            return true;
        }


        if (p[i] === s[j] || p[i] === '?')
            return f(i - 1, j - 1)
        else if (p[i] === '*')
            return f(i - 1, j) || f(i, j - 1)
        else
            return false;

    }

    return f(p.length - 1, s.length - 1)

};
//Memoization
var isMatch = function (s, p) {

    const dp = Array.from({ length: p.length }, () => Array(s.length).fill(-1));

    function f(i, j) {

        if (i < 0 && j < 0) return true
        if (i < 0 && j >= 0) return false

        if (j < 0 && i >= 0) {

            for (let x = 0; x <= i; x++) {
                if (p[x] !== '*') return false;
            }
            return true;
        }


        if (p[i] === s[j] || p[i] === '?')
            return dp[i][j] = f(i - 1, j - 1)
        else if (p[i] === '*')
            return dp[i][j] = f(i - 1, j) || f(i, j - 1)
        else
            return dp[i][j] = false;

    }

    return f(p.length - 1, s.length - 1)

};