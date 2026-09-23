// Enums as plain objects
const VehicleType = {
  Car: "Car",
  Bike: "Bike",
};

const VehicleStatus = {
  Active: "Active",
  Inactive: "Inactive",
};

// Vehicle base class
class Vehicle {
  constructor(id, vehicleNumber, type, status) {
    this.id = id;
    this.vehicleNumber = vehicleNumber;
    this.type = type;
    this.status = status;
  }
}

// Car and Bike subclasses
class Car extends Vehicle {
  constructor(id, vehicleNumber, status) {
    super(id, vehicleNumber, VehicleType.Car, status);
  }
}

class Bike extends Vehicle {
  constructor(id, vehicleNumber, status) {
    super(id, vehicleNumber, VehicleType.Bike, status);
  }
}

// Inventory
class VehicleInventoryManagement {
  constructor() {
    this.vehicles = [];
  }

  addVehicle(vehicle) {
    this.vehicles.push(vehicle);
  }

  removeVehicle(vehicleId) {
    this.vehicles = this.vehicles.filter(v => v.id !== vehicleId);
  }

  getVehicles() {
    return this.vehicles;
  }
}

// Location class
class Loc {
  constructor(address, city, pinCode) {
    this.address = address;
    this.city = city;
    this.pinCode = pinCode;
  }
}

// Store
class Store {
  constructor(storeId, location, inventory) {
    this.storeId = storeId;
    this.location = location;
    this.inventory = inventory;
    this.reservationList = [];
  }

  addReservation(reservation) {
    this.reservationList.push(reservation);
  }
}

// User
class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

// Reservation
class Reservation {
  constructor(reservationId, vehicle, user, bookingDate, fromDate, tillDate) {
    this.reservationId = reservationId;
    this.vehicle = vehicle;
    this.user = user;
    this.bookingDate = bookingDate;
    this.fromDate = fromDate;
    this.tillDate = tillDate;
  }
}

// Bill
class Bill {
  constructor(reservation, amount) {
    this.reservation = reservation;
    this.amount = amount;
  }
}

// Payment
class Payment {
  constructor(bill, paymentDate) {
    this.bill = bill;
    this.paymentDate = paymentDate;
  }
}

// System
class VehicleRentalSystem {
  constructor() {
    this.users = [];
    this.stores = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  addStore(store) {
    this.stores.push(store);
  }

  getStores() {
    return this.stores;
  }

  getUsers() {
    return this.users;
  }
}

// 1. Setup Users
const user1 = new User("U1", "Sabah");

// 2. Create Vehicles
const car1 = new Car("V1", "WB01A1111", VehicleStatus.Active);
const bike1 = new Bike("V2", "WB01B2222", VehicleStatus.Active);

// 3. Vehicle Inventory Manager
const inventory = new VehicleInventoryManagement();
inventory.addVehicle(car1);
inventory.addVehicle(bike1);

// 4. Store Setup
const loc1 = new Loc("1st Street", "Kolkata", "700001");
const store1 = new Store("S1", loc1, inventory);

// 5. Create System and Register Users/Stores
const rentalSystem = new VehicleRentalSystem();
rentalSystem.addUser(user1);
rentalSystem.addStore(store1);

// 6. Make a Reservation
const fromDate = new Date("2025-04-25");
const tillDate = new Date("2025-04-27");
const bookingDate = new Date("2025-04-24");

const reservation1 = new Reservation("R1", car1, user1, bookingDate, fromDate, tillDate);
store1.addReservation(reservation1);

// 7. Generate Bill
const bill1 = new Bill(reservation1, 3000); // ₹3000

// 8. Make Payment
const payment1 = new Payment(bill1, new Date("2025-04-24"));

// ✅ Output
console.log("Reservation made for:", user1.name);
console.log("Vehicle reserved:", car1.vehicleNumber);
console.log("Bill amount:", bill1.amount);
console.log("Payment done on:", payment1.paymentDate.toDateString());
