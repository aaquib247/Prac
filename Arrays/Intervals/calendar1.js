
// My Calendar I
// ✅ Similar to meeting rooms, but only check for double booking
// If overlap found, return false elkse add booking and return true

class MyCalendar {
    constructor() {
        this.bookings = [];
    }
    
    book(start, end) {
        // Check if new event overlaps with ANY existing event
        for (const [s, e] of this.bookings) {
            if (start < e && s < end) {
                return false;  // Overlap found!
            }
        }
        
        // No overlap, add booking
        this.bookings.push([start, end]);
        return true;
    }
}

// Time: O(n) per book call (check all existing)
// Space: O(n)

var MyCalendar = function () {
  
        this.events = [];

};

MyCalendar.prototype.book = function (startTime, endTime) {

    if (this.events.length > 0) {
        for (const [st, en] of this.events) {
            if (startTime < en && endTime > st)
                return false;

        }
    }

    this.events.push([startTime, endTime])
    return true;
};