// // TEMPLATE 1: Merge Overlapping Intervals
// function mergeIntervals(intervals) {
//     if (intervals.length === 0) return [];
    
//     // Step 1: Sort by start time
//     intervals.sort((a, b) => a[0] - b[0]);
    
//     const result = [intervals[0]];
    
//     // Step 2: Iterate and merge
//     for (let i = 1; i < intervals.length; i++) {
//         const last = result[result.length - 1];
//         const curr = intervals[i];
        
//         if (curr[0] <= last[1]) {
//             // Overlapping - merge
//             last[1] = Math.max(last[1], curr[1]);
//         } else {
//             // Non-overlapping - add new
//             result.push(curr);
//         }
//     }
    
//     return result;
// }

// // TEMPLATE 2: Check Overlap/Conflict
// function hasOverlap(intervals) {
//     // Sort by start time
//     intervals.sort((a, b) => a[0] - b[0]);
    
//     for (let i = 1; i < intervals.length; i++) {
//         if (intervals[i][0] < intervals[i-1][1]) {
//             return true; // Overlap found
//         }
//     }
    
//     return false;
// }

// // TEMPLATE 3: Count Active Intervals (Sweep Line)
// function maxConcurrent(intervals) {
//     const events = [];
    
//     // Create events: +1 for start, -1 for end
//     for (let [start, end] of intervals) {
//         events.push([start, 1]);
//         events.push([end, -1]);
//     }
    
//     // Sort by time, then by type (start before end)
//     events.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
    
//     let maxActive = 0;
//     let currentActive = 0;
    
//     for (let [time, delta] of events) {
//         currentActive += delta;
//         maxActive = Math.max(maxActive, currentActive);
//     }
    
//     return maxActive;
// }

// 1. Merge Intervals (LC 56) - CRITICAL
// Pattern: Sort + Merge
var merge = function(intervals) {
    if (intervals.length === 0) return [];
    
    intervals.sort((a, b) => a[0] - b[0]);
    const result = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const last = result[result.length - 1];
        
        if (intervals[i][0] <= last[1]) {
            // Overlap - merge
            last[1] = Math.max(last[1], intervals[i][1]);
        } else {
            // No overlap
            result.push(intervals[i]);
        }
    }
    
    return result;
};
// TC: O(n log n), SC: O(n)
// Key: Always use Math.max for end time!

// Example:
console.log(merge([[1,3],[2,6],[8,10],[15,18]]));
// Output: [[1,6],[8,10],[15,18]]


// 2. Insert Interval (LC 57) - VERY COMMON
// Pattern: Three-step process
var insert = function(intervals, newInterval) {
    const result = [];
    let i = 0;
    
    // Step 1: Add all intervals before newInterval
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }
    
    // Step 2: Merge overlapping intervals
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push(newInterval);
    
    // Step 3: Add remaining intervals
    while (i < intervals.length) {
        result.push(intervals[i]);
        i++;
    }
    
    return result;
};
// TC: O(n), SC: O(n)
// Key: No sorting needed - already sorted!

console.log(insert([[1,3],[6,9]], [2,5]));
// Output: [[1,5],[6,9]]


// 3. Meeting Rooms (LC 252) - EASY but IMPORTANT
// Pattern: Sort + Check overlap
var canAttendMeetings = function(intervals) {
    if (intervals.length === 0) return true;
    
    intervals.sort((a, b) => a[0] - b[0]);
    
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i-1][1]) {
            return false; // Overlap
        }
    }
    
    return true;
};
// TC: O(n log n), SC: O(1)

console.log(canAttendMeetings([[0,30],[5,10],[15,20]])); // false
console.log(canAttendMeetings([[7,10],[2,4]])); // true


// 4. Meeting Rooms II (LC 253) - GOOGLE FAVORITE ⭐⭐⭐⭐⭐
// Pattern: Sweep Line (Best approach)
var minMeetingRooms = function(intervals) {
    if (intervals.length === 0) return 0;
    
    const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
    const ends = intervals.map(i => i[1]).sort((a, b) => a - b);
    
    let rooms = 0;
    let maxRooms = 0;
    let startPtr = 0, endPtr = 0;
    
    while (startPtr < intervals.length) {
        if (starts[startPtr] < ends[endPtr]) {
            // Meeting starts, need a room
            rooms++;
            startPtr++;
        } else {
            // Meeting ends, free a room
            rooms--;
            endPtr++;
        }
        maxRooms = Math.max(maxRooms, rooms);
    }
    
    return maxRooms;
};
// TC: O(n log n), SC: O(n)
// Key: Two pointers approach - NO HEAP NEEDED!

console.log(minMeetingRooms([[0,30],[5,10],[15,20]])); // 2


// 5. Non-Overlapping Intervals (LC 435) - GREEDY PATTERN
// Pattern: Sort by end time (Greedy)
var eraseOverlapIntervals = function(intervals) {
    if (intervals.length === 0) return 0;
    
    // CRITICAL: Sort by END time!
    intervals.sort((a, b) => a[1] - b[1]);
    
    let count = 0;
    let prevEnd = intervals[0][1];
    
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < prevEnd) {
            // Overlapping - remove this one
            count++;
        } else {
            // No overlap - update end
            prevEnd = intervals[i][1];
        }
    }
    
    return count;
};
// TC: O(n log n), SC: O(1)
// Key: Sort by END time, not start!

console.log(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])); // 1


// 6. Minimum Interval to Include Each Query (LC 1851) - HARD
// Pattern: Sort + Priority Queue (can use array for simplicity)
var minInterval = function(intervals, queries) {
    // Sort intervals by size
    intervals.sort((a, b) => (a[1] - a[0]) - (b[1] - b[0]));
    
    const result = new Array(queries.length);
    
    for (let i = 0; i < queries.length; i++) {
        const q = queries[i];
        let minSize = Infinity;
        
        for (let [left, right] of intervals) {
            if (left <= q && q <= right) {
                minSize = right - left + 1;
                break; // Found smallest
            }
        }
        
        result[i] = minSize === Infinity ? -1 : minSize;
    }
    
    return result;
};
// TC: O(n*m) - can optimize with heap
// Better approach needed for large inputs

console.log(minInterval([[1,4],[2,4],[3,6],[4,4]], [2,3,4,5]));
// Output: [3,3,1,4]




// 7. Employee Free Time (LC 759) - GOOGLE CLASSIC
// Pattern: Merge + Find gaps
var employeeFreeTime = function(schedule) {
    // Flatten all intervals
    const intervals = [];
    for (let employee of schedule) {
        for (let interval of employee) {
            intervals.push(interval);
        }
    }
    
    // Sort by start time
    intervals.sort((a, b) => a[0] - b[0]);
    
    // Merge intervals
    const merged = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        const last = merged[merged.length - 1];
        if (intervals[i][0] <= last[1]) {
            last[1] = Math.max(last[1], intervals[i][1]);
        } else {
            merged.push(intervals[i]);
        }
    }
    
    // Find gaps
    const freeTime = [];
    for (let i = 1; i < merged.length; i++) {
        freeTime.push([merged[i-1][1], merged[i][0]]);
    }
    
    return freeTime;
};
// TC: O(n log n), SC: O(n)

console.log(employeeFreeTime([[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]));
// Output: [[5,6],[7,9]]



// 8. My Calendar I (LC 729) - DESIGN PROBLEM
class MyCalendar {
    constructor() {
        this.events = [];
    }
    
    book(start, end) {
        // Check for overlap with existing events
        for (let [s, e] of this.events) {
            if (start < e && end > s) {
                return false; // Overlap
            }
        }
        
        this.events.push([start, end]);
        return true;
    }
}
// TC: O(n) per booking, SC: O(n)
// Can optimize with BST/TreeMap

const calendar = new MyCalendar();
console.log(calendar.book(10, 20)); // true
console.log(calendar.book(15, 25)); // false
console.log(calendar.book(20, 30)); // true



// 9. Interval List Intersections (LC 986) - TWO POINTERS
var intervalIntersection = function(firstList, secondList) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < firstList.length && j < secondList.length) {
        const [start1, end1] = firstList[i];
        const [start2, end2] = secondList[j];
        
        // Find intersection
        const start = Math.max(start1, start2);
        const end = Math.min(end1, end2);
        
        if (start <= end) {
            result.push([start, end]);
        }
        
        // Move pointer with smaller end
        if (end1 < end2) {
            i++;
        } else {
            j++;
        }
    }
    
    return result;
};
// TC: O(m + n), SC: O(1)
// Key: Two pointers, move the one with smaller end

console.log(intervalIntersection(
    [[0,2],[5,10],[13,23],[24,25]],
    [[1,5],[8,12],[15,24],[25,26]]
));
// Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]



// 10. Maximum CPU Load (Similar to Meeting Rooms II)
var maxCPULoad = function(jobs) {
    if (jobs.length === 0) return 0;
    
    // jobs[i] = [start, end, load]
    jobs.sort((a, b) => a[0] - b[0]);
    
    const events = [];
    for (let [start, end, load] of jobs) {
        events.push([start, load]);
        events.push([end, -load]);
    }
    
    events.sort((a, b) => a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]);
    
    let maxLoad = 0;
    let currentLoad = 0;
    
    for (let [time, load] of events) {
        currentLoad += load;
        maxLoad = Math.max(maxLoad, currentLoad);
    }
    
    return maxLoad;
};
// TC: O(n log n), SC: O(n)

console.log(maxCPULoad([[1,4,3],[2,5,4],[7,9,6]])); // 7