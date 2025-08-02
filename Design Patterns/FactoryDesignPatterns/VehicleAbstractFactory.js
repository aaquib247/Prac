// 2. Implement Luxury Vehicles
var LuxuryCar = /** @class */ (function () {
    function LuxuryCar() {
    }
    LuxuryCar.prototype.info = function () { return "Luxury Car: Premium sedan with all features"; };
    return LuxuryCar;
}());
var LuxurySUV = /** @class */ (function () {
    function LuxurySUV() {
    }
    LuxurySUV.prototype.info = function () { return "Luxury SUV: Big and comfortable with high-tech"; };
    return LuxurySUV;
}());
var LuxuryMotorcycle = /** @class */ (function () {
    function LuxuryMotorcycle() {
    }
    LuxuryMotorcycle.prototype.info = function () { return "Luxury Motorcycle: Fast and shiny"; };
    return LuxuryMotorcycle;
}());
// 3. Implement Ordinary Vehicles
var OrdinaryCar = /** @class */ (function () {
    function OrdinaryCar() {
    }
    OrdinaryCar.prototype.info = function () { return "Ordinary Car: Basic transportation"; };
    return OrdinaryCar;
}());
var OrdinarySUV = /** @class */ (function () {
    function OrdinarySUV() {
    }
    OrdinarySUV.prototype.info = function () { return "Ordinary SUV: Family car"; };
    return OrdinarySUV;
}());
var OrdinaryMotorcycle = /** @class */ (function () {
    function OrdinaryMotorcycle() {
    }
    OrdinaryMotorcycle.prototype.info = function () { return "Ordinary Motorcycle: Simple bike"; };
    return OrdinaryMotorcycle;
}());
// 5. Concrete Factories
var LuxuryVehicleFactory = /** @class */ (function () {
    function LuxuryVehicleFactory() {
    }
    LuxuryVehicleFactory.prototype.createCar = function () { return new LuxuryCar(); };
    LuxuryVehicleFactory.prototype.createSUV = function () { return new LuxurySUV(); };
    LuxuryVehicleFactory.prototype.createMotorcycle = function () { return new LuxuryMotorcycle(); };
    return LuxuryVehicleFactory;
}());
var OrdinaryVehicleFactory = /** @class */ (function () {
    function OrdinaryVehicleFactory() {
    }
    OrdinaryVehicleFactory.prototype.createCar = function () { return new OrdinaryCar(); };
    OrdinaryVehicleFactory.prototype.createSUV = function () { return new OrdinarySUV(); };
    OrdinaryVehicleFactory.prototype.createMotorcycle = function () { return new OrdinaryMotorcycle(); };
    return OrdinaryVehicleFactory;
}());
// 6. Client Code
function showVehicles(factory) {
    var vehicles = [
        factory.createCar(),
        factory.createSUV(),
        factory.createMotorcycle()
    ];
    vehicles.forEach(function (vehicle) { return console.log(vehicle.info()); });
}
// 7. Usage
console.log("=== Luxury Vehicles ===");
showVehicles(new LuxuryVehicleFactory());
console.log("\n=== Ordinary Vehicles ===");
showVehicles(new OrdinaryVehicleFactory());
