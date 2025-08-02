//Concrete Class.
//Each type of vehicle (Car, Bike) will implement the Vehicle interface.
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.start = function () {
        console.log("Car is starting...");
    };
    Car.prototype.stop = function () {
        console.log("Car is stopping...");
    };
    return Car;
}());
var Bike = /** @class */ (function () {
    function Bike() {
    }
    Bike.prototype.start = function () {
        console.log("Bike is starting...");
    };
    Bike.prototype.stop = function () {
        console.log("Bike is stopping...");
    };
    return Bike;
}());
//Factory Class - creation logic is here.
//The factory class will have a method createVehicle() that returns different types of vehicles based on some input, 
// but the client will not be concerned with the actual creation logic.
var VehicleFactory = /** @class */ (function () {
    function VehicleFactory() {
    }
    VehicleFactory.createVehicle = function (type) {
        if (type === "car") {
            return new Car(); // Create and return a Car instance
        }
        else if (type === "bike") {
            return new Bike(); // Create and return a Bike instance
        }
        else {
            throw new Error("Unknown vehicle type");
        }
    };
    // can also add more methods to it.
    VehicleFactory.createVehicleWithColor = function (type, color) {
        var vehicle = VehicleFactory.createVehicle(type);
        console.log("Created a ".concat(color, " ").concat(type));
        return vehicle;
    };
    return VehicleFactory;
}());
// Client Code  - No creation logic
//The client code uses the factory to create the vehicles, 
// but doesn't need to know the details of how the vehicle is created.
function main1() {
    // The client doesn't directly create vehicles; it uses the factory
    var car = VehicleFactory.createVehicle("car"); //Can be accessed as the static is present else would needed object creation
    car.start(); // Car is starting...
    car.stop(); // Car is stopping...
    var bike = VehicleFactory.createVehicle("bike");
    bike.start(); // Bike is starting...
    bike.stop(); // Bike is stopping...
    var redCar = VehicleFactory.createVehicleWithColor("car", "red");
}
main1(); // Call the main function to run the program
