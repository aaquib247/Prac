interface payment{
    pay(amt:number):void
}

class PaymentStrategy implements payment{
    pay(amount:number){
        throw new Error("Method not implemented");
    }
}

class CreditCardPayment implements payment{
    pay(amount:number){
        console.log(`Paid $${amount} using Credit Card`);
    }
}

class PayPalPayment implements payment{
    pay(amount:number) {
        console.log(`Paid $${amount} using PayPal`);
    }
}

class CryptoPayment implements payment{
    pay(amount:number) {
        console.log(`Paid $${amount} using Crypto`);
    }
}

class PaymentContext {

    public strategy:payment;

    constructor(strategy:payment) {
        this.strategy = strategy;
    }

    setStrategy(strategy:payment) {
        this.strategy = strategy;
    }

    pay(amount:number) {
        this.strategy.pay(amount);
    }
}

const payment1 = new PaymentContext(new CreditCardPayment());
payment1.pay(100);  // Output: Paid $100 using Credit Card

payment1.setStrategy(new PayPalPayment());
payment1.pay(200);  // Output: Paid $200 using PayPal

payment1.setStrategy(new CryptoPayment());
payment1.pay(300);  // Output: Paid $300 using Crypto

