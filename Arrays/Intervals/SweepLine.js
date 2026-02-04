// ❌ Simple approach doesn't work easily
// You need to know max concurrent meetings
//Meeting Rooms II
// ✅ Line sweep is natural
function minMeetingRooms(intervals) {
    const events = [];
    for (const [start, end] of intervals) {
        events.push([start, +1]);
        events.push([end, -1]);
    }
    
    events.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
    
    let active = 0, max = 0;
    for (const [time, delta] of events) {
        active += delta;
        max = Math.max(max, active);
    }
    
    return max;
}
console.log("Meeting Rooms II Test");
console.log(minMeetingRooms([[0, 30], [5, 10], [15, 20]])); // 2
console.log(minMeetingRooms([[7, 10], [2, 4]])); // 1
console.log(minMeetingRooms([[1,10],[10,20],[5,15]])); // 3
console.log("-----");
//TC = O(N log N) for sorting events
//SC = O(N) for events array
//-------------------------------------------------------------------
// Car Pooling
// ✅ Similar to meeting rooms
// Question: Given trips = [[2,1,5],[3,3,7]], capacity = 4
function carPooling(trips, capacity) {
    const events = [];
    
    for (const [passengers, from, to] of trips) {
        events.push([from, +passengers]);   // Pick up
        events.push([to, -passengers]);      // Drop off
    }
    
    events.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
    
    let current = 0;
    
    for (const [location, delta] of events) {
        current += delta;
        if (current > capacity) return false;
    }
    
    return true;
}
//Tc = O(N log N) for sorting events
//Sc = O(N) for events array    

// Test
console.log("Car Pooling Test");
console.log(carPooling([[2,1,5], [3,3,7]], 4));  // false (needs 5 at location 3)
console.log(carPooling([[2,1,5], [3,3,7]], 5));  // true

//-------------------------------------------------------------------
// Maximum Population Year
function maximumPopulation(logs) {
    const events = [];
    
    for (const [birth, death] of logs) {
        events.push([birth, +1]);   // Born
        events.push([death, -1]);   // Died
    }
    
    events.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
    
    let current = 0, max = 0, maxYear = 0;
    
    for (const [year, delta] of events) {
        current += delta;
        if (current > max) {
            max = current;
            maxYear = year;
        }
    }
    
    return maxYear;
}

// Test
console.log("Maximum Population Year Test");
console.log(maximumPopulation([[1993,1999], [2000,2010]]));  // 1993
console.log(maximumPopulation([[1950,1961], [1960,1971], [1970,1981]]));  // 1960
// reason for 1960: In year 1960, there are 2 people alive (first and second logs). 

//-------------------------------------------------------------------
// My Calendar II
// ✅ Similar to meeting rooms, but check for triple booking
class MyCalendarTwo {
    constructor() {
        this.events = [];
    }
    
    book(start, end) {
        // Create events list including new booking
        const allEvents = [];
        
        for (const [s, e] of this.events) {
            allEvents.push([s, +1]);
            allEvents.push([e, -1]);
        }
        
        allEvents.push([start, +1]);
        allEvents.push([end, -1]);
        
        allEvents.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
        
        let active = 0;
        
        for (const [time, delta] of allEvents) {
            active += delta;
            if (active >= 3) {
                return false;  // Triple booking!
            }
        }
        
        this.events.push([start, end]);
        return true;
    }
}
console.log("MyCalendarTwo Test");
const myCalendar = new MyCalendarTwo();
console.log(myCalendar.book(10, 20)); // true
console.log(myCalendar.book(50, 60)); // true
console.log(myCalendar.book(10, 40)); // true
console.log(myCalendar.book(5, 15));  // false
console.log(myCalendar.book(5, 10));  // true
console.log(myCalendar.book(25, 55)); // true
//-------------------------------------------------------------------
// My Calendar III
// ✅ Similar to meeting rooms, but return max concurrent bookings
class MyCalendarThree {
    constructor() {
        this.events = [];
        // No need for this.maxK!
    }
    
    book(start, end) {
        this.events.push([start, +1]);
        this.events.push([end, -1]);
        
        this.events.sort((a, b) => {
            if (a[0] === b[0]) {
                return a[1] - b[1];
            }
            return a[0] - b[0];
        });
        
        let active = 0;
        let maxBooking = 0;
        
        for (const [time, delta] of this.events) {
            active += delta;
            maxBooking = Math.max(maxBooking, active);
        }
        
        return maxBooking;  // ✅ Directly return!
    }
}
//-------------------------------------------------------------------
// The Skyline Problem
// ✅ Similar to meeting rooms, but track heights
//-------------------------------------------------------------------
function getSkyline(buildings) {
    const events = [];
    
    for (const [left, right, height] of buildings) {
        events.push([left, -height]);   // Start (negative to prioritize taller)
        events.push([right, height]);   // End
    }
    
    events.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
    
    const result = [];
    const heights = [0];
    let prevMax = 0;
    
    for (const [pos, h] of events) {
        if (h < 0) {
            heights.push(-h);  // Add building
        } else {
            heights.splice(heights.indexOf(h), 1);  // Remove building
        }
        
        const currentMax = Math.max(...heights);
        
        if (currentMax !== prevMax) {
            result.push([pos, currentMax]);
            prevMax = currentMax;
        }
    }
    
    return result;
}
console.log("Skyline Problem Test");
console.log(getSkyline([[2,9,10], [3,7,15], [5,12,12], [15,20,10], [19,24,8]]));
//output: [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]

//-------------------------------------------------------------------
function load(jobs) {
   let events = [];
   for (let [start, end, load] of jobs) {
       events.push([start, load]);
       events.push([end, -load]);
   }

   events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
   
   let currentLoad = 0;
   let maxLoad = 0; 

   for(let [time, load] of events) {
       currentLoad += load;
       maxLoad = Math.max(maxLoad, currentLoad);
   }

   return maxLoad;
}

// jobs = [[1, 4, 3], [2, 5, 4], [7, 9, 6]]; 
jobs = [[6,7,10], [2,4,11], [8,12,15]]; 
console.log(load(jobs));


// VVIP:
// The Rule: What Should Delta Be?
// Ask Yourself:

// "What am I COUNTING?"
// Meeting Rooms II:
// Question:

// "How many ROOMS are needed?"

// What are we counting?

// Number of meetings happening concurrentl
// events.push([start, +1]);  // One MORE meeting
// events.push([end, -1]);    // One LESS meeting

// Car Pooling:
// Question:

// "Do we exceed CAPACITY?"

// What are we counting?

// Number of passengers in the car

// Delta:
// events.push([from, +passengers]);   // Add THESE MANY passengers
// events.push([to, -passengers]);     // Remove THESE MANY passengers