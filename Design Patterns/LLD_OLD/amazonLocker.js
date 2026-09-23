// ENUMS
const CompartmentSize = {
  SMALL: 'SMALL',
  MEDIUM: 'MEDIUM',
  LARGE: 'LARGE',
};

const CompartmentStatus = {
  AVAILABLE: 'AVAILABLE',
  OCCUPIED: 'OCCUPIED',
  MAINTENANCE: 'MAINTENANCE',
};

// ENTITY CLASSES

class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class Admin extends User {
  constructor(id, name) {
    super(id, name);
  }

  putLockerInMaintenance(locker) {
    locker.status = 'MAINTENANCE';
  }
}

class DeliveryAgent extends User {
  constructor(id, name) {
    super(id, name);
  }

  deliverPackage(package, lockerManager) {
    lockerManager.assignPackageToLocker(package);
  }
}

class Package {
  constructor(id, size) {
    this.id = id;
    this.size = size;
    this.assignedCompartment = null;
    this.otp = null;
  }
}

class LockerCompartment {
  constructor(id, size) {
    this.id = id;
    this.size = size;
    this.status = CompartmentStatus.AVAILABLE;
    this.package = null;
  }

  assignPackage(pkg) {
    this.package = pkg;
    this.status = CompartmentStatus.OCCUPIED;
    pkg.assignedCompartment = this;
    pkg.otp = Math.floor(1000 + Math.random() * 9000).toString(); // simple OTP
  }

  retrievePackage(otp) {
    if (this.package && this.package.otp === otp) {
      const pkg = this.package;
      this.package = null;
      this.status = CompartmentStatus.AVAILABLE;
      return pkg;
    }
    throw new Error('Invalid OTP or compartment empty');
  }
}

class Locker {
  constructor(id, location) {
    this.id = id;
    this.location = location;
    this.compartments = [];
  }

  addCompartment(compartment) {
    this.compartments.push(compartment);
  }

  getAvailableCompartment(size) {
    return this.compartments.find(
      (c) => c.size === size && c.status === CompartmentStatus.AVAILABLE
    );
  }
}

class LockerManager {
  constructor() {
    this.lockers = [];
  }

  addLocker(locker) {
    this.lockers.push(locker);
  }

  assignPackageToLocker(pkg) {
    for (let locker of this.lockers) {
      const compartment = locker.getAvailableCompartment(pkg.size);
      if (compartment) {
        compartment.assignPackage(pkg);
        NotificationService.sendOTP(pkg); // Notify user
        return;
      }
    }
    throw new Error('No available locker for package size');
  }
}

class NotificationService {
  static sendOTP(pkg) {
    console.log(
      `Sending OTP ${pkg.otp} to user for package ${pkg.id}`
    );
  }
}

// EXAMPLE USAGE

const lockerManager = new LockerManager();
const locker1 = new Locker('L1', 'Downtown');
locker1.addCompartment(new LockerCompartment('C1', CompartmentSize.SMALL));
locker1.addCompartment(new LockerCompartment('C2', CompartmentSize.MEDIUM));
lockerManager.addLocker(locker1);

const agent = new DeliveryAgent(1, 'John');
const pkg = new Package('P123', CompartmentSize.SMALL);

agent.deliverPackage(pkg, lockerManager);

// Later, user retrieves package
const compartment = pkg.assignedCompartment;
try {
  const retrievedPkg = compartment.retrievePackage(pkg.otp);
  console.log(`Package ${retrievedPkg.id} retrieved successfully`);
} catch (e) {
  console.error(e.message);
}

//            User
//           /    \
//  Admin           DeliveryAgent

// LockerManager --------> Locker --------> LockerCompartment
//        |                     |
//        |                     --> Location
//        |
// Package ---------> LockerCompartment

// NotificationService --> User
