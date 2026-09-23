class Movie {
  constructor(id, name, duration) {
    this.id = id;
    this.name = name;
    this.duration = duration;
  }
}

class Theatre {
  constructor(id, name, city) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.screens = []; // array of Screen
  }

  addScreen(screen) {
    this.screens.push(screen);
  }
}

class Screen {
  constructor(id) {
    this.id = id;
    this.seats = []; // array of Seat
    this.shows = []; // array of Show
  }

  addShow(show) {
    this.shows.push(show);
  }
}

class Show {
  constructor(id, movie, startTime) {
    this.id = id;
    this.movie = movie;
    this.startTime = startTime;
    this.bookedSeats = new Set(); // seatIds
  }

  bookSeat(seatId) {
    if (this.bookedSeats.has(seatId)) return false;
    this.bookedSeats.add(seatId);
    return true;
  }
}

class Seat {
  constructor(id, category) {
    this.id = id;
    this.category = category;
  }
}

class Booking {
  constructor(id, userId, show, seats) {
    this.id = id;
    this.userId = userId;
    this.show = show;
    this.seats = seats;
    this.payment = null;
  }

  makePayment(payment) {
    this.payment = payment;
  }
}

class Payment {
  constructor(id, amount) {
    this.id = id;
    this.amount = amount;
    this.status = 'PENDING';
  }

  complete() {
    this.status = 'SUCCESS';
  }
}

class MovieController {
  constructor() {
    this.cityMovieMap = new Map(); // city -> movies[]
  }

  addMovieToCity(city, movie) {
    if (!this.cityMovieMap.has(city)) {
      this.cityMovieMap.set(city, []);
    }
    this.cityMovieMap.get(city).push(movie);
  }

  getMoviesByCity(city) {
    return this.cityMovieMap.get(city) || [];
  }
}

class TheatreController {
  constructor() {
    this.cityTheatreMap = new Map(); // city -> theatres[]
  }

  addTheatreToCity(city, theatre) {
    if (!this.cityTheatreMap.has(city)) {
      this.cityTheatreMap.set(city, []);
    }
    this.cityTheatreMap.get(city).push(theatre);
  }

  getTheatresByCity(city) {
    return this.cityTheatreMap.get(city) || [];
  }
}

// Setup
const movie1 = new Movie("m1", "Inception", 150);
const mc = new MovieController();
mc.addMovieToCity("Mumbai", movie1);

const theatre = new Theatre("t1", "PVR", "Mumbai");
const screen = new Screen("s1");
screen.seats.push(new Seat("S1", "GOLD"), new Seat("S2", "SILVER"));
const show = new Show("sh1", movie1, "2025-07-28T18:00:00");
screen.addShow(show);
theatre.addScreen(screen);

const tc = new TheatreController();
tc.addTheatreToCity("Mumbai", theatre);

// Booking
const booking = new Booking("b1", "u1", show, ["S1"]);
const seatBooked = show.bookSeat("S1");

if (seatBooked) {
  const payment = new Payment("p1", 300);
  payment.complete();
  booking.makePayment(payment);
  console.log("Booking successful", booking);
} else {
  console.log("Seat already booked.");
}

// | Class             | Has-A                           |
// | ----------------- | ------------------------------- |
// | Theatre           | HAS-A → Screen\[]               |
// | Screen            | HAS-A → Seat\[], Show\[]        |
// | Show              | HAS-A → Movie, Set<seatId>      |
// | Booking           | HAS-A → Show, Seat\[], Payment  |
// | MovieController   | HAS-A → Map\<City, Movies\[]>   |
// | TheatreController | HAS-A → Map\<City, Theatres\[]> |


