// Enums
const DriverStatus = Object.freeze({ AVAILABLE: 'AVAILABLE', ON_RIDE: 'ON_RIDE', OFFLINE: 'OFFLINE' });
const CarType = Object.freeze({ SEDAN: 'SEDAN', SUV: 'SUV', MINI: 'MINI' });
const RideStatus = Object.freeze({ REQUESTED: 'REQUESTED', ONGOING: 'ONGOING', COMPLETED: 'COMPLETED', CANCELLED: 'CANCELLED' });

class User {
    constructor(id, name, paymentInfo) {
        this.id = id;
        this.name = name;
        this.paymentInfo = paymentInfo;
    }
    requestRide(source, destination, carType, rideService) {
        return rideService.requestRide(this, source, destination, carType);
    }
    cancelRide(ride) {
        return ride.cancelRide(this);
    }
    pay(ride, amount) {
        if (ride.status === RideStatus.COMPLETED) {
            ride.payment = { paidBy: this, amount };
            console.log(`Payment of ${amount} done by ${this.name}`);
        }
    }
}

class Driver {
    constructor(id, name, carType, location) {
        this.id = id;
        this.name = name;
        this.carType = carType;
        this.location = location;
        this.status = DriverStatus.AVAILABLE;
    }
    acceptRide(ride) {
        if (this.status === DriverStatus.AVAILABLE) {
            this.status = DriverStatus.ON_RIDE;
            ride.assignDriver(this);
        }
    }
    completeRide() {
        this.status = DriverStatus.AVAILABLE;
    }
    cancelRide(ride) {
        return ride.cancelRide(this);
    }
}

class Ride {
    constructor(id, user, source, destination, carType) {
        this.id = id;
        this.user = user;
        this.source = source;
        this.destination = destination;
        this.carType = carType;
        this.driver = null;
        this.status = RideStatus.REQUESTED;
        this.payment = null;
    }
    assignDriver(driver) {
        this.driver = driver;
        this.status = RideStatus.ONGOING;
    }
    startRide() {
        if (this.status === RideStatus.REQUESTED && this.driver) {
            this.status = RideStatus.ONGOING;
        }
    }
    endRide() {
        if (this.status === RideStatus.ONGOING) {
            this.status = RideStatus.COMPLETED;
            if (this.driver) this.driver.completeRide();
        }
    }
    cancelRide(by) {
        if (this.status === RideStatus.REQUESTED) {
            this.status = RideStatus.CANCELLED;
            if (this.driver) this.driver.status = DriverStatus.AVAILABLE;
            console.log(`Ride cancelled by ${by.name}`);
            return true;
        }
        return false;
    }
}

class DriverController {
    constructor() {
        this.drivers = [];
    }
    addDriver(driver) {
        this.drivers.push(driver);
    }
    removeDriver(driverId) {
        this.drivers = this.drivers.filter(d => d.id !== driverId);
    }
    getAvailable(carType) {
        return this.drivers.find(d => d.status === DriverStatus.AVAILABLE && d.carType === carType);
    }
}

class RideService {
    constructor() {
        this.users = [];
        this.rides = [];
        this.rideId = 1;
        this.driverController = new DriverController();
    }
    registerUser(name, paymentInfo) {
        const user = new User(this.users.length + 1, name, paymentInfo);
        this.users.push(user);
        return user;
    }
    registerDriver(name, carType, location) {
        const driver = new Driver(this.driverController.drivers.length + 1, name, carType, location);
        this.driverController.addDriver(driver);
        return driver;
    }
    requestRide(user, source, destination, carType) {
        const ride = new Ride(this.rideId++, user, source, destination, carType);
        const driver = this.driverController.getAvailable(carType);
        if (driver) {
            driver.acceptRide(ride);
        }
        this.rides.push(ride);
        return ride;
    }
}

// Example usage:
const rideService = new RideService();
const user1 = rideService.registerUser('Alice', 'Card123');
const driver1 = rideService.registerDriver('Bob', CarType.SEDAN, 'Loc1');
const driver2 = rideService.registerDriver('Charlie', CarType.SUV, 'Loc2');

const ride = user1.requestRide('A', 'B', CarType.SEDAN, rideService);
console.log(ride);

user1.cancelRide(ride); // or driver1.cancelRide(ride);

const ride2 = user1.requestRide('A', 'B', CarType.SEDAN, rideService);
ride2.startRide();
ride2.endRide();
user1.pay(ride2, 100);
console.log(ride2);


// +----------------+        +----------------+        +----------------+        +-------------------+
// |     User       |        |    Driver      |        |     Ride       |        |  DriverController |
// +----------------+        +----------------+        +----------------+        +-------------------+
// | - id           |        | - id           |        | - id           |        | - drivers         |
// | - name         |        | - name         |        | - user         |        +-------------------+
// | - paymentInfo  |        | - carType      |        | - driver       |        | +addDriver()      |
// +----------------+        | - location     |        | - source       |        | +removeDriver()   |
// | +requestRide() |        | - status       |        | - destination  |        | +getAvailable()   |
// | +cancelRide()  |        +----------------+        | - status       |        +-------------------+
// | +pay()         |        | +acceptRide()  |        | - payment      |
// +----------------+        | +cancelRide()  |        +----------------+
//                           +----------------+        | +assignDriver()|
//                                                     | +startRide()   |
// Enums:                                             | +endRide()     |
// +-------------------+                              | +cancelRide()  |
// | DriverStatus      |                              +----------------+
// | - AVAILABLE       |
// | - ON_RIDE         |         ^ 1
// | - OFFLINE         |         |
// +-------------------+         | 1
//                               |
// +-------------------+         |
// | CarType           |         |
// | - SEDAN           |---------+
// | - SUV             |
// | - MINI            |
// +-------------------+

// +-------------------+
// | RideStatus        |
// | - REQUESTED       |
// | - ONGOING         |
// | - COMPLETED       |
// | - CANCELLED       |
// +-------------------+