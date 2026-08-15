// Tasks: ["A","A","A","B","B","B"], n=2

// Rules:
// - Same task needs n=2 cooldown between executions
// - Can do other tasks or stay IDLE in between

// Goal: Minimum time to finish ALL tasks

//TC - O(N) and Sc - O(1) (since we only use a fixed size array of 26 for task frequencies)

var leastInterval = function(tasks, n) {
    // Step 1: Count frequency of each task
    let freq = new Array(26).fill(0);
    for (let task of tasks) {
        freq[task.charCodeAt(0) - 65]++;
    }
    
    // Step 2: Sort to find max frequency
    freq.sort((a, b) => b - a);
    
    // Step 3: Find max frequency
    let maxFreq = freq[0];
    
    // Step 4: Calculate idle slots
    // (maxFreq - 1) rows, each row has n idle slots
    let idleSlots = (maxFreq - 1) * n;
    
    // Step 5: Fill idle slots with other tasks
    for (let i = 1; i < 26; i++) {
        // Can only fill min(freq[i], maxFreq-1) slots
        // because last row doesn't count!
        idleSlots -= Math.min(freq[i], maxFreq - 1);
    }
    
    // Step 6: idle slots can't be negative
    idleSlots = Math.max(0, idleSlots);
    
    // Step 7: Answer = tasks + remaining idle slots
    return tasks.length + idleSlots;
};

// Test cases
console.log(leastInterval(["A","A","A","B","B","B"], 2)); // 8
console.log(leastInterval(["A","A","A","B","B","B"], 0)); // 6
console.log(leastInterval(["A","A","A","A","B","B","B","C","C","D"], 2)); // 10

//Intuition

// Intuition: Think of it as a GRID!
// Most frequent task is A (3 times)
// Cooldown n = 2

// Build slots like this:

// | A | _ | _ |   ← cycle 1 (size n+1 = 3)
// | A | _ | _ |   ← cycle 2
// | A |           ← last cycle (no need to fill)

// Total slots = (maxFreq - 1) * (n + 1) + lastRow


// Fill other tasks into empty slots:

// Tasks: A=3, B=3

// | A | B | _ |   ← fill B into empty slots
// | A | B | _ |
// | A | B |

// Total = (3-1) * 3 + 2 = 8

// But if we have MORE tasks than slots:
// Tasks: A=3, B=3, C=3, D=3

// | A | B | C |   ← all slots filled!
// | A | B | C |
// | A | B | C |
//            D D D  ← extra tasks just append!

// Answer = total number of tasks = 9

// Key Formula
// // Number of idle slots
// let idleSlots = (maxFreq - 1) * n

// // Fill idle slots with other tasks
// for each other task:
//     idleSlots -= min(taskFreq, maxFreq - 1)

// // If idleSlots negative, no idle time needed
// idleSlots = max(0, idleSlots)

// // Answer
// return tasks.length + idleSlots