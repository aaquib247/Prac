interface Pizza {
    getCost(): number;
    getDescription(): string;
  }

  class PlainPizza implements Pizza {
    getCost(): number {
      return 5;
    }
  
    getDescription(): string {
      return "Plain Pizza";
    }
  }

  class CheeseDecorator implements Pizza {
    constructor(private pizza: Pizza) {}
  
    getCost(): number {
      return this.pizza.getCost() + 2;
    }
  
    getDescription(): string {
      return this.pizza.getDescription() + ", Cheese";
    }
  }
  
  class PepperoniDecorator implements Pizza {
    constructor(private pizza: Pizza) {}
  
    getCost(): number {
      return this.pizza.getCost() + 3;
    }
  
    getDescription(): string {
      return this.pizza.getDescription() + ", Pepperoni";
    }
  }
  
  class OlivesDecorator implements Pizza {
    constructor(private pizza: Pizza) {}
  
    getCost(): number {
      return this.pizza.getCost() + 1.5;
    }
  
    getDescription(): string {
      return this.pizza.getDescription() + ", Olives";
    }
  }

  let myPizza: Pizza = new PlainPizza();                // $5
  let myPizza1 = new CheeseDecorator(myPizza);         // $5 + $2 = $7
  let myPizza2 = new PepperoniDecorator(myPizza1);     // $7 + $3 = $10
  
  // let myPizza3 = new OlivesDecorator(myPizza2);      // Would make it $11.5
  
  console.log(myPizza2.getDescription());              // Should be: Plain Pizza, Cheese, Pepperoni
  console.log("Total Cost: $" + myPizza2.getCost());   // Should be: $10
  
