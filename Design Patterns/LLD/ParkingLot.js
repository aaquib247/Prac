// ── ENUM ──
const VehicleType = Object.freeze({
  Two_Wheeler: 'Two_Wheeler',
  Four_Wheeler: 'Four_Wheeler',
});

// ── VEHICLE ──
class Vehicle {
  constructor(type, vehicleNumber) {
    this.type = type;
    this.vehicleNumber = vehicleNumber;
  }
}

// ── SPOT (base) ──
class Spot {
  #id;
  #type;
  #isOccupied;

  constructor(id, type) {
    this.#id = id;
    this.#type = type;
    this.#isOccupied = false;
  }

  getId()        { return this.#id; }
  getType()      { return this.#type; }
  isAvailable()  { return !this.#isOccupied; }
  occupy()       { this.#isOccupied = true; }
  free()         { this.#isOccupied = false; }
}

// ── SPOT TYPES ──
class TwoWheelerSpot extends Spot {
  constructor(id) {
    super(id, VehicleType.Two_Wheeler);
  }
}

class FourWheelerSpot extends Spot {
  constructor(id) {
    super(id, VehicleType.Four_Wheeler);
  }
}

// ── FLOOR ──
class Floor {
  constructor(floorNumber) {
    this.floorNumber = floorNumber;
    this.spots = [];
  }

  addSpot(spot) {
    this.spots.push(spot);
  }

  findAvailableSpot(vehicleType) {
    return this.spots.find(
      spot => spot.getType() === vehicleType && spot.isAvailable()
    );
  }

  getAvailableCount(vehicleType) {
    return this.spots.filter(
      spot => spot.getType() === vehicleType && spot.isAvailable()
    ).length;
  }
}

// ── TICKET ──
class Ticket {
  constructor(vehicle, spot, floor) {
    this.ticketId = Date.now();
    this.vehicle = vehicle;
    this.spot = spot;
    this.floor = floor;
    this.entryTime = new Date();
  }
}

// ── PARKING LOT (Singleton) ──
class ParkingLot {
  constructor() {
    this.floors = [];
    this.tickets = new Map();
  }

  static getInstance() {
    if (!ParkingLot.instance) {
      ParkingLot.instance = new ParkingLot();
    }
    return ParkingLot.instance;
  }

  addFloor(floor) {
    this.floors.push(floor);
  }

  parkVehicle(vehicle) {
    for (const floor of this.floors) {
      const spot = floor.findAvailableSpot(vehicle.type);
      if (spot) {
        spot.occupy();
        const ticket = new Ticket(vehicle, spot, floor);
        this.tickets.set(ticket.ticketId, ticket);
        return ticket;
      }
    }
    throw new Error('No available spot for vehicle type: ' + vehicle.type);
  }

  unparkVehicle(ticketId) {
    if (!this.tickets.has(ticketId)) {
      throw new Error('Invalid ticket ID');
    }

    const ticket = this.tickets.get(ticketId);
    ticket.spot.free();

    const durationMs = Date.now() - ticket.entryTime;
    const hours = Math.ceil(durationMs / (1000 * 60 * 60));
    const rate = ticket.vehicle.type === VehicleType.Two_Wheeler ? 20 : 50;
    const fee = hours * rate;

    this.tickets.delete(ticketId);

    return {
      vehicleNumber: ticket.vehicle.vehicleNumber,
      spotId: ticket.spot.getId(),
      floor: ticket.floor.floorNumber,
      hours,
      fee,
    };
  }

  getAvailability() {
    return this.floors.map(floor => ({
      floor: floor.floorNumber,
      twoWheeler: floor.getAvailableCount(VehicleType.Two_Wheeler),
      fourWheeler: floor.getAvailableCount(VehicleType.Four_Wheeler),
    }));
  }
}

// ── TEST ──
const lot = ParkingLot.getInstance();

const floor1 = new Floor(1);
floor1.addSpot(new TwoWheelerSpot('S1'));
floor1.addSpot(new TwoWheelerSpot('S2'));
floor1.addSpot(new FourWheelerSpot('S3'));

const floor2 = new Floor(2);
floor2.addSpot(new TwoWheelerSpot('S4'));
floor2.addSpot(new FourWheelerSpot('S5'));
floor2.addSpot(new FourWheelerSpot('S6'));

lot.addFloor(floor1);
lot.addFloor(floor2);

console.log('Availability before parking:');
console.log(lot.getAvailability());

const bike = new Vehicle(VehicleType.Two_Wheeler, 'KA01AB1234');
const car = new Vehicle(VehicleType.Four_Wheeler, 'KA02CD5678');

const bikeTicket = lot.parkVehicle(bike);
console.log('\nBike parked → Ticket:', bikeTicket.ticketId, '| Spot:', bikeTicket.spot.getId());

const carTicket = lot.parkVehicle(car);
console.log('Car parked  → Ticket:', carTicket.ticketId, '| Spot:', carTicket.spot.getId());

console.log('\nAvailability after parking:');
console.log(lot.getAvailability());

const bikeReceipt = lot.unparkVehicle(bikeTicket.ticketId);
console.log('\nBike Receipt:', bikeReceipt);

const carReceipt = lot.unparkVehicle(carTicket.ticketId);
console.log('Car Receipt:', carReceipt);

console.log('\nAvailability after unparking:');
console.log(lot.getAvailability());



// ┌─────────────────┐
// │   VehicleType   │  ← enum/constant
// │─────────────────│
// │ Two_Wheeler     │
// │ Four_Wheeler    │
// └─────────────────┘
//         │ uses
//         ▼
// ┌─────────────────┐
// │    Vehicle      │
// │─────────────────│
// │ type            │
// │ VehicleNumber   │
// └─────────────────┘
//         │
//         ▼
// ┌─────────────────┐
// │     Ticket      │
// │─────────────────│
// │ ticketId        │
// │ vehicle         │ ◄── HAS-A Vehicle
// │ spot            │ ◄── HAS-A Spot
// │ floor           │ ◄── HAS-A Floor
// │ entryTime       │
// └─────────────────┘

// ┌─────────────────┐
// │      Spot       │ ← base class
// │─────────────────│
// │ #id             │
// │ #type           │
// │ #isOccupied     │
// │─────────────────│
// │ isAvailable()   │
// │ occupy()        │
// │ free()          │
// │ getId()         │
// │ getType()       │
// └────────┬────────┘
//          │ extends
//     ┌────┴──────────┐
//     ▼               ▼
// ┌──────────┐  ┌────────────┐
// │TwoWheeler│  │FourWheeler │
// │  Spot    │  │   Spot     │
// └──────────┘  └────────────┘

// ┌─────────────────┐
// │     Floor       │
// │─────────────────│
// │ floorNumber     │
// │ spots[]         │ ◄── HAS-A Spots
// │─────────────────│
// │ addSpot()       │
// │ findAvailable() │
// └─────────────────┘
//         │
//         ▼
// ┌─────────────────────┐
// │     ParkingLot      │ ← Singleton
// │─────────────────────│
// │ floors[]            │ ◄── HAS-A Floors
// │ tickets Map         │ ◄── HAS-A Tickets
// │─────────────────────│
// │ getInstance()       │
// │ addFloor()          │
// │ parkVehicle()       │
// │ unparkVehicle()     │
// └─────────────────────┘


// Adding Strategy:

//Change 1 — Add Pricing Strategy Classes

// class HourlyPricing {
//   calculate(hours, vehicleType) {
//     const rate = vehicleType === VehicleType.Two_Wheeler ? 20 : 50;
//     return Math.ceil(hours) * rate;
//   }
// }

// class DailyPricing {
//   calculate(hours, vehicleType) {
//     const days = Math.ceil(hours / 24);
//     const rate = vehicleType === VehicleType.Two_Wheeler ? 100 : 200;
//     return days * rate;
//   }
// }

//Change 2 — ParkingLot accepts strategy in constructor
// Before
// static getInstance() {
//   if (!ParkingLot.instance) {
//     ParkingLot.instance = new ParkingLot();
//   }
//   return ParkingLot.instance;
// }

// // After — pass strategy
// static getInstance(pricingStrategy) {
//   if (!ParkingLot.instance) {
//     ParkingLot.instance = new ParkingLot(pricingStrategy);
//   }
//   return ParkingLot.instance;
// }

// constructor(pricingStrategy) {
//   this.floors = [];
//   this.tickets = new Map();
//   this.pricingStrategy = pricingStrategy;  // store it
// }

// Change 3 — unparkVehicle uses strategy
// Before — hardcoded
// const rate = ticket.vehicle.type === VehicleType.Two_Wheeler ? 20 : 50;
// const fee = Math.ceil(duration) * rate;

// // After — delegated to strategy
// const fee = this.pricingStrategy.calculate(duration, ticket.vehicle.type);

// Hourly pricing
// const lot = ParkingLot.getInstance(new HourlyPricing());

// // Daily pricing — just swap here, nothing else changes
// const lot = ParkingLot.getInstance(new DailyPricing());


//***************************************************************************************************/

// ParkingLot ──has many──> Floor ──has many──> Spot
//      │
//      ├──has one──> PricingStrategy
//      │
//      └──has many──> Ticket ──has──> Vehicle, Spot, Floor

// Read that top to bottom and it tells you exactly who creates whom:

// ParkingLot owns floors → so ParkingLot holds the list
// Floor owns spots → so Floor holds the list
// Ticket needs a Vehicle, Spot, Floor to exist → so they get passed in
