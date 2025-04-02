
//O(N) and O(1)
function celebrity(m, n) {
    let t = 0;
    let d = n - 1;

    while (t < d) {
        if (m[t][d] === 1)
            t++;
        else if (m[d][t] === 1)
            d--;
        else {
            t++;
            d--;
        }
    }

    if (t > d) return -1;

    for (let i = 0; i < n; i++) {

        if (m[t][i] === 1)
            return -1
    }
    return t;
}

const knowsMatrix = [
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [1, 1, 0, 0]
];
const n = 4;

console.log(celebrity(knowsMatrix, n)); // Output: 2 (the celebrity)