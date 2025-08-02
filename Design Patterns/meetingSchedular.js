class MeetingRoom {
  constructor(id, name, location, capacity) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.capacity = capacity;
  }
}

class Meeting {
  constructor(id, roomId, title, startTime, endTime, organizer, attendees = []) {
    this.id = id;
    this.roomId = roomId;
    this.title = title;
    this.startTime = startTime;
    this.endTime = endTime;
    this.organizer = organizer;
    this.attendees = attendees;
  }
}

class Calendar {
  constructor() {
    this.bookings = new Map(); // meetingId => Meeting
  }

  isAvailable(roomId, startTime, endTime) {
    for (const meeting of this.bookings.values()) {
      if (
        meeting.roomId === roomId &&
        !(endTime <= meeting.startTime || startTime >= meeting.endTime)
      ) {
        return false;
      }
    }
    return true;
  }

  addMeeting(meeting) {
    this.bookings.set(meeting.id, meeting);
  }

  updateMeeting(meetingId, updatedMeeting) {
    if (!this.bookings.has(meetingId)) return false;
    this.bookings.set(meetingId, updatedMeeting);
    return true;
  }

  cancelMeeting(meetingId) {
    return this.bookings.delete(meetingId);
  }
}

class MeetingScheduler {
  constructor() {
    this.rooms = [];
    this.calendar = new Calendar();
    this.idCounter = 1;
  }

  addRoom(name, location, capacity) {
    const room = new MeetingRoom(this.idCounter++, name, location, capacity);
    this.rooms.push(room);
    return room;
  }

  getAvailableRooms(startTime, endTime) {
    return this.rooms.filter(room => this.calendar.isAvailable(room.id, startTime, endTime));
  }

  createMeeting(roomId, title, startTime, endTime, organizer, attendees) {
    if (!this.calendar.isAvailable(roomId, startTime, endTime)) {
      console.log("Room is not available");
      return null;
    }
    const meeting = new Meeting(this.idCounter++, roomId, title, startTime, endTime, organizer, attendees);
    this.calendar.addMeeting(meeting);
    return meeting;
  }

  updateMeeting(id, newStart, newEnd) {
    const meeting = this.calendar.bookings.get(id);
    if (!meeting) return false;

    if (!this.calendar.isAvailable(meeting.roomId, newStart, newEnd)) {
      console.log("Time slot not available.");
      return false;
    }

    const updated = new Meeting(id, meeting.roomId, meeting.title, newStart, newEnd, meeting.organizer, meeting.attendees);
    return this.calendar.updateMeeting(id, updated);
  }

  cancelMeeting(id) {
    return this.calendar.cancelMeeting(id);
  }
}

const scheduler = new MeetingScheduler();
const room1 = scheduler.addRoom("Conf A", "1st Floor", 10);
const availableRooms = scheduler.getAvailableRooms(10, 11);

const meeting = scheduler.createMeeting(room1.id, "Team Sync", 10, 11, "Alice", ["Bob"]);
scheduler.updateMeeting(meeting.id, 11, 12);
scheduler.cancelMeeting(meeting.id);
