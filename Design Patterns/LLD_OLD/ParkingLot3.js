// ============================================
// PARKING LOT - base version (start here in interview)
// f floors, n rows per floor, c spots per row
// ============================================

// ---------- SPOT ----------
class Spot {
  constructor(id) {
    this.id = id;
    this.isFree = true;
    this.carNumber = null;
  }
}

// ---------- ROW ----------
class Row {
  constructor(rowNumber, spotsPerRow) {
    this.spots = [];
    for (let i = 1; i <= spotsPerRow; i++) {
      this.spots.push(new Spot(`R${rowNumber}-S${i}`));
    }
  }

  findFreeSpot() {
    return this.spots.find(s => s.isFree);
  }
}

// ---------- FLOOR ----------
class Floor {
  constructor(floorNumber, rowsPerFloor, spotsPerRow) {
    this.rows = [];
    for (let i = 1; i <= rowsPerFloor; i++) {
      this.rows.push(new Row(i, spotsPerRow));
    }
  }

  findFreeSpot() {
    for (const row of this.rows) {
      const spot = row.findFreeSpot();
      if (spot) return spot;
    }
    return null;
  }
}

// ---------- TICKET ----------
class Ticket {
  constructor(spot, carNumber) {
    this.id = Date.now();
    this.spot = spot;
    this.carNumber = carNumber;
    this.entryTime = Date.now();
  }
}

// ---------- PARKING LOT ----------
class ParkingLot {
  constructor(floors, rowsPerFloor, spotsPerRow) {
    this.floors = [];
    for (let i = 1; i <= floors; i++) {
      this.floors.push(new Floor(i, rowsPerFloor, spotsPerRow));
    }
    this.activeTickets = new Map();
  }

  carArrives(carNumber) {
    for (const floor of this.floors) {
      const spot = floor.findFreeSpot();
      if (spot) {
        spot.isFree = false;
        spot.carNumber = carNumber;
        const ticket = new Ticket(spot, carNumber);
        this.activeTickets.set(ticket.id, ticket);
        return ticket;
      }
    }
    throw new Error("No free spot");
  }

  carLeaves(ticketId) {
    const ticket = this.activeTickets.get(ticketId);
    if (!ticket) throw new Error("Invalid ticket");

    const minutes = (Date.now() - ticket.entryTime) / 1000 / 60;
    const fee = Math.ceil(minutes) * 2; // flat rate for now

    ticket.spot.isFree = true;
    ticket.spot.carNumber = null;
    this.activeTickets.delete(ticketId);

    return fee;
  }
}

// ---------- DEMO ----------
const lot = new ParkingLot(2, 2, 5); // 2 floors, 2 rows/floor, 5 spots/row = 20 spots

const t1 = lot.carArrives("KA-01-1234");
console.log("Parked at:", t1.spot.id);

const fee = lot.carLeaves(t1.id);
console.log("Fee:", fee);