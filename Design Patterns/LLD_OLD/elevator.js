// ===== Direction Enum (optional)
const Direction = {
  UP: "UP",
  DOWN: "DOWN",
};

// ===== Display Class
class Display {
  show(floor, direction = null) {
    console.log(`Display: Floor ${floor} ${direction ? "Direction: " + direction : ""}`);
  }
}

// ===== ElevatorCar
class ElevatorCar {
  constructor(id) {
    this.id = id;
    this.currentFloor = 0;
    this.destinations = new Set();
    this.display = new Display();
  }

  isIdle() {
    return this.destinations.size === 0;
  }

  addDestination(floor) {
    if (floor === this.currentFloor) return; // Already there
    this.destinations.add(floor);
    this.move();
  }

  move() {
    if (this.destinations.size === 0) return;

    const nextFloor = [...this.destinations][0];
    this.destinations.delete(nextFloor);

    const direction = nextFloor > this.currentFloor ? Direction.UP : Direction.DOWN;
    console.log(`Elevator ${this.id} moving ${direction} to Floor ${nextFloor}`);

    this.currentFloor = nextFloor;
    this.display.show(this.currentFloor, direction);
    this.openDoor();
  }

  openDoor() {
    console.log(`Elevator ${this.id} door opens at Floor ${this.currentFloor}`);
    setTimeout(() => {
      console.log(`Elevator ${this.id} door closes`);
      this.move(); // Continue if more destinations
    }, 1000);
  }
}

class ElevatorController {
  constructor(elevatorCount) {
    this.elevators = [];
    for (let i = 0; i < elevatorCount; i++) {
      this.elevators.push(new ElevatorCar(i));
    }
  }

  function handleExternalRequest(floor) {
    const elevator = this.findBestElevator(floor);
    console.log(`Controller assigns Elevator ${elevator.id} to Floor ${floor}`);
    elevator.addDestination(floor);
  }

  handleInternalRequest(elevatorId, floor) {
    const elevator = this.elevators.find(e => e.id === elevatorId);
    if (elevator) elevator.addDestination(floor);
  }

  findBestElevator(floor) {
    // Simple: pick first idle or closest
    return this.elevators.find(e => e.isIdle()) ||
           this.elevators.reduce((a, b) =>
             Math.abs(a.currentFloor - floor) < Math.abs(b.currentFloor - floor) ? a : b
           );
  }

  getElevators() {
    return this.elevators;
  }
}

class ExternalButton {
  constructor(floor, controller) {
    this.floor = floor;
    this.controller = controller;
  }

  press() {
    console.log(`External button pressed at Floor ${this.floor}`);
    this.controller.handleExternalRequest(this.floor);
  }
}

class InternalButton {
  constructor(elevatorId, floor, controller) {
    this.elevatorId = elevatorId;
    this.floor = floor;
    this.controller = controller;
  }

  press() {
    console.log(`Internal button pressed in Elevator ${this.elevatorId} for Floor ${this.floor}`);
    this.controller.handleInternalRequest(this.elevatorId, this.floor);
  }
}

class Floor {
  constructor(floorNumber, controller) {
    this.floorNumber = floorNumber;
    this.callButton = new ExternalButton(floorNumber, controller);
  }
}

class Building {
  constructor(numFloors, numElevators) {
    this.controller = new ElevatorController(numElevators);
    this.floors = [];

    for (let i = 0; i < numFloors; i++) {
      this.floors.push(new Floor(i, this.controller));
    }
  }

  getElevators() {
    return this.controller.getElevators();
  }

  getController() {
    return this.controller;
  }
}

const building = new Building(5, 2);

// User presses elevator call at floor 0 and floor 3
building.floors[0].callButton.press();   // External call from floor 0
building.floors[3].callButton.press();   // External call from floor 3

// Inside elevator 0, user presses button to go to floor 4
const elevator0 = building.getElevators()[0];
const button = new InternalButton(elevator0.id, 4, building.getController());
button.press();  // Internal request
