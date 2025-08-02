class Singleton {
    // Step 1: Private static variable to hold the single instance
    private static instance: Singleton;

    // Step 2: Private constructor to prevent external instantiation
    private constructor() {
        console.log("Singleton instance created!");
    }

    // Step 3: Public static method to get the instance
    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            // If no instance exists, create one
            Singleton.instance = new Singleton();
        }
        // Return the existing instance
        return Singleton.instance;
    }

    // Some method to demonstrate functionality
    public doWork(): void {
        console.log("Singleton is doing some work!");
    }
}

// Usage:

const singleton1 = Singleton.getInstance();
singleton1.doWork();  // Output: Singleton is doing some work!

const singleton2 = Singleton.getInstance();
singleton2.doWork();  // Output: Singleton is doing some work!

// Check if both references point to the same instance
console.log(singleton1 === singleton2);  // Output: true
