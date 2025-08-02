// 1. Define Vehicle Interfaces (only what we need)
interface Car {
    info(): string;  // Only contains the method we actually want
}

interface SUV {
    info(): string;
}

interface Motorcycle {
    info(): string;
}

// 2. Implement Luxury Vehicles
class LuxuryCar implements Car {
    info() { return "Luxury Car: Premium sedan with all features"; }
}

class LuxurySUV implements SUV {
    info() { return "Luxury SUV: Big and comfortable with high-tech"; }
}

class LuxuryMotorcycle implements Motorcycle {
    info() { return "Luxury Motorcycle: Fast and shiny"; }
}

// 3. Implement Ordinary Vehicles
class OrdinaryCar implements Car {
    info() { return "Ordinary Car: Basic transportation"; }
}

class OrdinarySUV implements SUV {
    info() { return "Ordinary SUV: Family car"; }
}

class OrdinaryMotorcycle implements Motorcycle {
    info() { return "Ordinary Motorcycle: Simple bike"; }
}

// 4. Factory Interface
interface VehicleFactory {
    createCar(): Car;
    createSUV(): SUV;
    createMotorcycle(): Motorcycle;
}

// 5. Concrete Factories
class LuxuryVehicleFactory implements VehicleFactory {
    createCar(): Car { return new LuxuryCar(); }
    createSUV(): SUV { return new LuxurySUV(); }
    createMotorcycle(): Motorcycle { return new LuxuryMotorcycle(); }
}

class OrdinaryVehicleFactory implements VehicleFactory {
    createCar(): Car { return new OrdinaryCar(); }
    createSUV(): SUV { return new OrdinarySUV(); }
    createMotorcycle(): Motorcycle { return new OrdinaryMotorcycle(); }
}

// 6. Client Code
function showVehicles(factory: VehicleFactory) {
    const vehicles = [
        factory.createCar(),
        factory.createSUV(),
        factory.createMotorcycle()
    ];

    vehicles.forEach(vehicle => console.log(vehicle.info()));
}

// 7. Usage
console.log("=== Luxury Vehicles ===");
showVehicles(new LuxuryVehicleFactory());

console.log("\n=== Ordinary Vehicles ===");
showVehicles(new OrdinaryVehicleFactory());