// Product Interface
interface Product {
    doWork(): void;
}

// ProductC Interface (extends Product)
interface ProductC extends Product {
    doSpecialWork(): void;
}

// Concrete Products
class ProductA implements Product {
    doWork(): void {
        console.log("Product A is working");
    }
}

class ProductB implements Product {
    doWork(): void {
        console.log("Product B is working");
    }
}

class ProductC implements ProductC {
    doWork(): void {
        console.log("Product C is working");
    }

    doSpecialWork(): void {
        console.log("Product C is doing special work");
    }
}

// Abstract Factory Interface
interface Factory {
    createProduct(): Product;
    createSpecialProduct?(): ProductC; // Optional for factories that create ProductC
}

// Concrete Factories
class FactoryA implements Factory {
    createProduct(): Product {
        return new ProductA();
    }
}

class FactoryB implements Factory {
    createProduct(): Product {
        return new ProductB();
    }
}

class FactoryC implements Factory {
    createProduct(): Product {
        return new ProductC();
    }

    createSpecialProduct(): ProductC {
        return new ProductC();
    }
}

// Client Code
function clientCode(factory: Factory) {
    const product = factory.createProduct();
    product.doWork();

    // If the factory creates ProductC, you can call the special method
    if ('createSpecialProduct' in factory) {
        const specialProduct = factory.createSpecialProduct();
        specialProduct.doSpecialWork();
    }
}

// Create different factories
const factoryA = new FactoryA();
const factoryB = new FactoryB();
const factoryC = new FactoryC();

// Client code interacts with the factories
console.log("Client interacting with FactoryA:");
clientCode(factoryA);  // Output: Product A is working

console.log("\nClient interacting with FactoryB:");
clientCode(factoryB);  // Output: Product B is working

console.log("\nClient interacting with FactoryC:");
clientCode(factoryC);  // Output: Product C is working, Product C is doing special work
