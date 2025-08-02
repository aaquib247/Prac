var PlainPizza = /** @class */ (function () {
    function PlainPizza() {
    }
    PlainPizza.prototype.getCost = function () {
        return 5;
    };
    PlainPizza.prototype.getDescription = function () {
        return "Plain Pizza";
    };
    return PlainPizza;
}());
var CheeseDecorator = /** @class */ (function () {
    function CheeseDecorator(pizza) {
        this.pizza = pizza;
    }
    CheeseDecorator.prototype.getCost = function () {
        return this.pizza.getCost() + 2;
    };
    CheeseDecorator.prototype.getDescription = function () {
        return this.pizza.getDescription() + ", Cheese";
    };
    return CheeseDecorator;
}());
var PepperoniDecorator = /** @class */ (function () {
    function PepperoniDecorator(pizza) {
        this.pizza = pizza;
    }
    PepperoniDecorator.prototype.getCost = function () {
        return this.pizza.getCost() + 3;
    };
    PepperoniDecorator.prototype.getDescription = function () {
        return this.pizza.getDescription() + ", Pepperoni";
    };
    return PepperoniDecorator;
}());
var OlivesDecorator = /** @class */ (function () {
    function OlivesDecorator(pizza) {
        this.pizza = pizza;
    }
    OlivesDecorator.prototype.getCost = function () {
        return this.pizza.getCost() + 1.5;
    };
    OlivesDecorator.prototype.getDescription = function () {
        return this.pizza.getDescription() + ", Olives";
    };
    return OlivesDecorator;
}());
var myPizza = new PlainPizza(); // $5
var myPizza1 = new CheeseDecorator(myPizza); // $5 + $2 = $7
var myPizza2 = new PepperoniDecorator(myPizza1); // $7 + $3 = $10
// let myPizza3 = new OlivesDecorator(myPizza2);      // Would make it $11.5
console.log(myPizza2.getDescription()); // Should be: Plain Pizza, Cheese, Pepperoni
console.log("Total Cost: $" + myPizza2.getCost()); // Should be: $10
