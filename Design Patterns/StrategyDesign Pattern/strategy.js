var PaymentStrategy = /** @class */ (function () {
    function PaymentStrategy() {
    }
    PaymentStrategy.prototype.pay = function (amount) {
        throw new Error("Method not implemented");
    };
    return PaymentStrategy;
}());
var CreditCardPayment = /** @class */ (function () {
    function CreditCardPayment() {
    }
    CreditCardPayment.prototype.pay = function (amount) {
        console.log("Paid $".concat(amount, " using Credit Card"));
    };
    return CreditCardPayment;
}());
var PayPalPayment = /** @class */ (function () {
    function PayPalPayment() {
    }
    PayPalPayment.prototype.pay = function (amount) {
        console.log("Paid $".concat(amount, " using PayPal"));
    };
    return PayPalPayment;
}());
var CryptoPayment = /** @class */ (function () {
    function CryptoPayment() {
    }
    CryptoPayment.prototype.pay = function (amount) {
        console.log("Paid $".concat(amount, " using Crypto"));
    };
    return CryptoPayment;
}());
var PaymentContext = /** @class */ (function () {
    function PaymentContext(strategy) {
        this.strategy = strategy;
    }
    PaymentContext.prototype.setStrategy = function (strategy) {
        this.strategy = strategy;
    };
    PaymentContext.prototype.pay = function (amount) {
        this.strategy.pay(amount);
    };
    return PaymentContext;
}());
var payment1 = new PaymentContext(new CreditCardPayment());
payment1.pay(100); // Output: Paid $100 using Credit Card
payment1.setStrategy(new PayPalPayment());
payment1.pay(200); // Output: Paid $200 using PayPal
payment1.setStrategy(new CryptoPayment());
payment1.pay(300); // Output: Paid $300 using Crypto
