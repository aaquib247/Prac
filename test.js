const { Heap } = require("heap-js");

function frequencySort(nums) {
    const freq = new Map();
    let maxHeap = new Heap((a,b) => b[1] - a[1]);

    // Count frequencies
    for (const num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }

    // Put each unique number into heap
    for (const [num, count] of freq) {
        maxHeap.add([num, count]);
    }

    const result = [];

    // Extract from heap
    while (maxHeap.size() > 0) {
        const [num, count] = maxHeap.pop();

        for (let i = 0; i < count; i++) {
            result.push(num);
        }
    }

    return result;
}

console.log(frequencySort([1, 1, 2, 2, 2, 3]));
