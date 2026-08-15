class Rupay {
    pay() {
        console.log("Pay Using Rupay");
    }
}

class Visa {
    pay() {
        console.log("Pay Using Visa");
    }
}

class MasterCard {
    pay() {
        console.log("Pay Using MasterCard");
    }
}


class Strategy {

    constructor(obj) {
        this.strategy = obj;
    }

    setStrategy(obj) {
        this.strategy = obj;
    }

    getPay() {
        this.strategy.pay();
    }
}


const behavior = new Strategy(new Rupay());

behavior.getPay();

behavior.setStrategy(new Visa());

behavior.getPay();


class Rupay {

    pay() {
        console.log("Pay Using Rupay");
    }

}


class Visa {

    pay() {
        console.log("Pay Using Visa");
    }

}


class MasterCard {

    pay() {
        console.log("Pay Using MasterCard");
    }

}


class Card {

    constructor(type) {
        this.type = type;
    }


    createPayment() {

        if(this.type === "Rupay") {
            return new Rupay();
        }
        else if(this.type === "Visa") {
            return new Visa();
        }
        else {
            return new MasterCard();
        }

    }

}


const card = new Card("Visa");

const payment = card.createPayment();

payment.pay();


class SMS {

    print(value) {
        console.log(`SMS: Weather is ${value}`);
    }

}


class Mail {

    print(value) {
        console.log(`Email: Weather is ${value}`);
    }

}


class Observer {

    constructor() {
        this.list = [];
    }


    add(observer) {
        this.list.push(observer);
    }


    remove(observer) {

        this.list =
        this.list.filter(x => x !== observer);

    }


    update(value) {

        for(let channel of this.list) {
            channel.print(value);
        }

    }

}



const weather = new Observer();


weather.add(new SMS());
weather.add(new Mail());


weather.update("Very Hot");

class Logger {

    constructor() {

        if(Logger.instance) {
            return Logger.instance;
        }

        Logger.instance = this;

    }


    print() {
        console.log("One Logger Instance");
    }

}



const logger1 = new Logger();

const logger2 = new Logger();


console.log(logger1 === logger2);

logger1.print();
  

//Strategy and Factory Pattern are implemented in this code.
class Rupay {

    pay(amount) {
        console.log(`Pay ₹${amount} using Rupay`);
    }

}


class Visa {

    pay(amount) {
        console.log(`Pay ₹${amount} using Visa`);
    }

}


class MasterCard {

    pay(amount) {
        console.log(`Pay ₹${amount} using MasterCard`);
    }

}


// FACTORY PATTERN
class PaymentFactory {

    constructor(type) {
        this.type = type;
    }


    createPayment() {

        if(this.type === "Rupay") {
            return new Rupay();
        }

        else if(this.type === "Visa") {
            return new Visa();
        }

        else if(this.type === "MasterCard") {
            return new MasterCard();
        }

        else {
            throw new Error("Invalid payment type");
        }

    }

}


// STRATEGY PATTERN
class PaymentStrategy {

    constructor(paymentMethod) {
        this.paymentMethod = paymentMethod;
    }


    setStrategy(paymentMethod) {
        this.paymentMethod = paymentMethod;
    }


    pay(amount) {
        this.paymentMethod.pay(amount);
    }

}



// USER SELECTS PAYMENT METHOD

const selectedPayment = "Visa";


// FACTORY CREATES OBJECT

const factory = new PaymentFactory(selectedPayment);

const paymentObject = factory.createPayment();


// STRATEGY USES THAT BEHAVIOR

const payment = new PaymentStrategy(paymentObject);


// EXECUTE PAYMENT

payment.pay(1000);
