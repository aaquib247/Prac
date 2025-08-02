// ENUM for vehicle types
const VehicleType = {
  TWO_WHEELER: "TWO_WHEELER",
  FOUR_WHEELER: "FOUR_WHEELER",
  SUV: "SUV"
};

// ----------- MODEL CLASSES -----------

// Vehicle Class
class Vehicle {
  constructor(vehicleNo, vehicleType) {
    this.vehicleNo = vehicleNo;
    this.vehicleType = vehicleType;
  }
}
// Vehicle HAS-A vehicleNo, vehicleType

// Base class: ParkingSpot
class ParkingSpot {
  constructor(id, price) {
    this.id = id;
    this.vehicle = null;
    this.isEmpty = true;
    this.price = price;
  }

  parkVehicle(vehicle) {
    if (!this.isEmpty) throw new Error("Already occupied");
    this.vehicle = vehicle;
    this.isEmpty = false;
  }

  removeVehicle() {
    this.vehicle = null;
    this.isEmpty = true;
  }
}
// ParkingSpot HAS-A vehicle, price
// TwoWheelerSpot IS-A ParkingSpot

class TwoWheelerSpot extends ParkingSpot {
  constructor(id) {
    super(id, 10);
  }
}
// TwoWheelerSpot IS-A ParkingSpot

class FourWheelerSpot extends ParkingSpot {
  constructor(id) {
    super(id, 20);
  }
}
// FourWheelerSpot IS-A ParkingSpot

class SUVSpot extends ParkingSpot {
  constructor(id) {
    super(id, 30);
  }
}
// SUVSpot IS-A ParkingSpot

// Ticket class
class Ticket {
  constructor(vehicle, spot) {
    this.entryTime = Date.now();
    this.vehicle = vehicle;
    this.parkingSpot = spot;
  }
}
// Ticket HAS-A vehicle, parkingSpot

// ----------- PRICING STRATEGY PATTERN -----------

class PricingStrategy {
  calculatePrice(ticket) {
    throw new Error("Override this method");
  }
}
// HourlyPricing IS-A PricingStrategy

class HourlyPricing extends PricingStrategy {
  calculatePrice(ticket) {
    const hours = Math.ceil((Date.now() - ticket.entryTime) / (1000 * 60 * 60));
    return ticket.parkingSpot.price * hours;
  }
}
// MinutePricing IS-A PricingStrategy

class MinutePricing extends PricingStrategy {
  calculatePrice(ticket) {
    const minutes = Math.ceil((Date.now() - ticket.entryTime) / (1000 * 60));
    return ticket.parkingSpot.price * minutes;
  }
}

// ----------- MANAGER + FACTORY -----------

class ParkingSpotManager {
  constructor() {
    this.spots = []; // list of ParkingSpot
  }

  addSpot(spot) {
    this.spots.push(spot);
  }

  findAvailableSpot() {
    return this.spots.find(s => s.isEmpty);
  }
}
// ParkingSpotManager HAS-A list of ParkingSpots

class ParkingSpotFactory {
  constructor() {
    this.twoWheelerManager = new ParkingSpotManager();
    this.fourWheelerManager = new ParkingSpotManager();
    this.suvManager = new ParkingSpotManager();
  }

  getManager(vehicleType) {
    if (vehicleType === VehicleType.TWO_WHEELER) {
      return this.twoWheelerManager;
    } else if (vehicleType === VehicleType.FOUR_WHEELER) {
      return this.fourWheelerManager;
    } else if (vehicleType === VehicleType.SUV) {
      return this.suvManager;
    } else {  
      throw new Error("Invalid vehicle type");
    }
  }

  addSpot(vehicleType, spot) {
    const manager = this.getManager(vehicleType);
    manager.addSpot(spot);
  }
}

// ParkingSpotFactory HAS-A map of ParkingSpotManagers

// ----------- ENTRANCE + EXIT FLOW -----------

class EntranceGate {
  constructor(factory) {
    this.factory = factory;
  }

  findSpace(vehicleType) {
    const manager = this.factory.getManager(vehicleType);
    return manager.findAvailableSpot();
  }

  bookSpot(vehicle) {
    const spot = this.findSpace(vehicle.vehicleType);
    if (!spot) throw new Error("No available spot");
    spot.parkVehicle(vehicle);
    return new Ticket(vehicle, spot);
  }
}
// EntranceGate HAS-A factory

class ExitGate {
  constructor(pricingStrategy) {
    this.pricingStrategy = pricingStrategy;
  }

  removeVehicle(ticket) {
    const amount = this.pricingStrategy.calculatePrice(ticket);
    ticket.parkingSpot.removeVehicle();
    return amount;
  }
}
// ExitGate HAS-A PricingStrategy

// ----------- USAGE -----------

const factory = new ParkingSpotFactory();

// Add some spots
factory.addSpot(VehicleType.TWO_WHEELER, new TwoWheelerSpot(1));
factory.addSpot(VehicleType.TWO_WHEELER, new TwoWheelerSpot(2));
factory.addSpot(VehicleType.FOUR_WHEELER, new FourWheelerSpot(3));
factory.addSpot(VehicleType.SUV, new SUVSpot(4));

const entrance = new EntranceGate(factory);
const exit = new ExitGate(new HourlyPricing()); // or MinutePricing

// Vehicle enters
const vehicle1 = new Vehicle("KA01AB1234", VehicleType.TWO_WHEELER);
const ticket1 = entrance.bookSpot(vehicle1);

console.log("Vehicle parked at:", ticket1.parkingSpot.id);

// Simulate time passage
setTimeout(() => {
  const amount = exit.removeVehicle(ticket1);
  console.log("Parking fee:", amount);
}, 2000);



// IS-A Relationships
// TwoWheelerSpot IS-A ParkingSpot

// FourWheelerSpot IS-A ParkingSpot

// SUVSpot IS-A ParkingSpot

// HourlyPricing IS-A PricingStrategy

// MinutePricing IS-A PricingStrategy

// ✅ HAS-A Relationships
// Vehicle HAS-A vehicleNo, vehicleType

// ParkingSpot HAS-A vehicle, price, isEmpty

// Ticket HAS-A vehicle, parkingSpot

// ParkingSpotManager HAS-A list of ParkingSpot

// ParkingSpotFactory HAS-A mapping of vehicleType -> manager

// EntranceGate HAS-A ParkingSpotFactory

// ExitGate HAS-A PricingStrategy