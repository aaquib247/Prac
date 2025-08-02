// Vehicle interface
// The Vehicle interface will define the common properties or methods that every vehicle should have.
interface Vehicle {
    start(): void;
    stop(): void;
}

//Concrete Class.
//Each type of vehicle (Car, Bike) will implement the Vehicle interface.
class Car implements Vehicle {
    start(): void {
        console.log("Car is starting...");
    }

    stop(): void {
        console.log("Car is stopping...");
    }
}

class Bike implements Vehicle {
    start(): void {
        console.log("Bike is starting...");
    }

    stop(): void {
        console.log("Bike is stopping...");
    }
}

//Factory Class - creation logic is here.
//The factory class will have a method createVehicle() that returns different types of vehicles based on some input, 
// but the client will not be concerned with the actual creation logic.
class VehicleFactory {
    static createVehicle(type: string): Vehicle {
        if (type === "car") {
            return new Car();  // Create and return a Car instance
        } else if (type === "bike") {
            return new Bike(); // Create and return a Bike instance
        } else {
            throw new Error("Unknown vehicle type");
        }
    }
   // can also add more methods to it.
    static createVehicleWithColor(type: string, color: string): Vehicle {
        const vehicle = VehicleFactory.createVehicle(type);
        console.log(`Created a ${color} ${type}`);
        return vehicle;
    }
}

// Client Code  - No creation logic
//The client code uses the factory to create the vehicles, 
// but doesn't need to know the details of how the vehicle is created.
function main1() {
    // The client doesn't directly create vehicles; it uses the factory
    const car: Vehicle = VehicleFactory.createVehicle("car"); //Can be accessed as the static is present else would needed object creation
    car.start(); // Car is starting...
    car.stop();  // Car is stopping...

    const bike: Vehicle = VehicleFactory.createVehicle("bike");
    bike.start(); // Bike is starting...
    bike.stop();  // Bike is stopping...

    const redCar: Vehicle = VehicleFactory.createVehicleWithColor("car", "red");

}

main1();  // Call the main function to run the program
