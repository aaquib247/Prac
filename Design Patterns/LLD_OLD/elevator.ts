enum Direction {
    UP = "UP",
    DOWN = "DOWN",
}

enum Status {
    IDLE = "IDLE",
    MOVING = "MOVING",
    STOPPED = "STOPPED",
}

class Display {
    floor: number = 0;
    update(floor: number) {
        this.floor = floor;
        console.log("Display updated to floor:", floor);
    }
}

class ElevatorCar {
    id: number;
    display: Display;
    direction: Direction = Direction.UP;
    status: Status = Status.IDLE;
    internalButton: InternalButton;

    constructor(id: number, dispatcher: InternalButtonDispatcher) {
        this.id = id;
        this.display = new Display();
        this.internalButton = new InternalButton(dispatcher);
    }

    move(floor: number, dir: Direction) {
        this.status = Status.MOVING;
        this.direction = dir;
        console.log(`Elevator ${this.id} moving ${dir} to floor ${floor}`);
        this.display.update(floor);
        this.status = Status.STOPPED;
    }
}

class InternalButton {
    constructor(private dispatcher: InternalButtonDispatcher) { }
    pressButton(floor: number, dir: Direction) {
        this.dispatcher.subReq(floor, dir);
    }
}

class InternalButtonDispatcher {
    controllers: ElevatorController[] = [];
    addController(controller: ElevatorController) {
        this.controllers.push(controller);
    }

    subReq(floor: number, dir: Direction) {
        this.controllers[0]?.submitReq(floor, dir); // Simple logic: first controller
    }
}

class ExternalButtonDispatcher {
    controllers: ElevatorController[] = [];
    addController(controller: ElevatorController) {
        this.controllers.push(controller);
    }

    pressButton(floor: number, dir: Direction) {
        console.log("External button pressed on floor", floor, dir);
        this.subReq(floor, dir);
    }

    subReq(floor: number, dir: Direction) {
        this.controllers[0]?.submitReq(floor, dir);
    }
}

class ElevatorController {
    constructor(private elevator: ElevatorCar) { }

    submitReq(floor: number, dir: Direction) {
        console.log(`Controller assigned: Floor ${floor}, Dir ${dir}`);
        this.controlElevator(floor, dir);
    }

    controlElevator(floor: number, dir: Direction) {
        this.elevator.move(floor, dir);
    }
}

const ibDispatcher = new InternalButtonDispatcher();
const elevator = new ElevatorCar(1, ibDispatcher);
const controller = new ElevatorController(elevator);
ibDispatcher.addController(controller);

const externalDispatcher = new ExternalButtonDispatcher();
externalDispatcher.addController(controller);

// External button press (floor 2, UP)
externalDispatcher.pressButton(2, Direction.UP);

// Once inside, internal button press to go to floor 5
elevator.internalButton.pressButton(5, Direction.UP);
