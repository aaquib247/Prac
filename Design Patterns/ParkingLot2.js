// 1. A parking spot — just tracks if it's taken
class Spot {
    constructor(id) {
        this.id = id;
        this.isFree = true;
        this.carNumber = null;
    }
}

// 2. A ticket — proof that a car is parked, with a timestamp
class Ticket {
    constructor(spot, carNumber) {
        this.spot = spot;
        this.carNumber = carNumber;
        this.entryTime = Date.now();
    }
}

// 3. The parking lot — owns all spots, does the two jobs
class ParkingLot {
    constructor(numberOfSpots) {
        this.spots = [];
        for (let i = 1; i <= numberOfSpots; i++) {
            this.spots.push(new Spot(i));
        }
    }

    // ENTRY FLOW
    carArrives(carNumber) {
        const spot = this.spots.find(s => s.isFree);
        if (!spot) throw new Error("Lot full");

        spot.isFree = false;
        spot.carNumber = carNumber;

        return new Ticket(spot, carNumber);
    }

    // EXIT FLOW
    carLeaves(ticket) {
        if (!ticket || ticket.spot.isFree || !ticket.spot.carNumber) {
            throw new Error("Invalid ticket");
        }

        const minutesParked = (Date.now() - ticket.entryTime) / 1000 / 60;
        const fee = Math.ceil(minutesParked) * 2; // ₹2 per minute, just as example

        ticket.spot.isFree = true;
        ticket.spot.carNumber = null;

        return fee;
    }
}

// ---- try it ----
const lot = new ParkingLot(5);

const ticket = lot.carArrives("KA-01-1234");
console.log("Ticket given for spot:", ticket.spot.id);

const fee = lot.carLeaves(ticket);
const fee1 = lot.carLeaves(ticket);
console.log("Pay:", fee);