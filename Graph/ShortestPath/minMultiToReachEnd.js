//https://www.geeksforgeeks.org/problems/minimum-multiplications-to-reach-end/0

function minimumMultiplications(arr, start, end) {
    // Edge case: if start is already end
    if (start === end) return 0;
    
    const MOD = 100000;
    const queue = [[start, 0]]; // [current value, steps]
    const visited = new Set();
    visited.add(start);
    
    while (queue.length > 0) {
        const [current, steps] = queue.shift();
        
        for (const num of arr) {
            const next = (current * num) % MOD;
            
            if (next === end) {
                return steps + 1;
            }
            
            if (!visited.has(next)) {
                visited.add(next);
                queue.push([next, steps + 1]);
            }
        }
    }
    
    return -1; // if we exhaust the queue without finding the end
}
//TC: O(N * M) where N is the size of arr and M is the range of numbers (100000 here)
//SC: O(M) for the visited set and queue
// Example usage:
console.log(minimumMultiplications([2, 5, 7], 3, 30)); // Output: 2
console.log(minimumMultiplications([3, 4, 65], 7, 66175)); // Output: 4

// Using Distance
class Solution {
    minimumMultiplications(arr, start, end) {
        // Create a queue for storing the numbers and their corresponding steps
        let queue = [];
        queue.push([start, 0]); // [current value, steps]

        // Create a dist array to store the number of multiplications needed to reach a particular number
        const MOD = 100000;
        const dist = new Array(MOD).fill(Infinity);
        dist[start] = 0;

        // BFS loop
        while (queue.length > 0) {
            const [node, steps] = queue.shift();

            // Check all possible multiplications
            for (let num of arr) {
                const next = (node * num) % MOD;

                // If we find a shorter path to 'next'
                if (steps + 1 < dist[next]) {
                    dist[next] = steps + 1;

                    // If we reach the end number, return the number of steps
                    if (next === end) {
                        return steps + 1;
                    }

                    queue.push([next, steps + 1]);
                }
            }
        }

        // If we exhaust the queue without finding the end number
        return -1;
    }
}
//TC: O(N * M) where N is the size of arr and M is the range of numbers (100000 here)
//SC: O(M) for the dist array and queue

// Example usage:
const start = 3;
const end = 30;
const arr = [2, 5, 7];

const obj = new Solution();
const ans = obj.minimumMultiplications(arr, start, end);

console.log(ans); // Output: 2

// Test another example
const start2 = 7;
const end2 = 66175;
const arr2 = [3, 4, 65];

const obj2 = new Solution();
const ans2 = obj2.minimumMultiplications(arr2, start2, end2);

console.log(ans2); // Output: 4

