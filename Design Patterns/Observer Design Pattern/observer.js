
class EmailService {
    update(orderId) {
        console.log(`Email sent for order ${orderId}`);
    }
}

class InventoryService {
    update(orderId) {
        console.log(`Inventory updated for order ${orderId}`);
    }
}

class InvoiceService {
    update(orderId) {
        console.log(`Invoice generated for order ${orderId}`);
    }
}

class Order {
    constructor() {
        this.observers = []; // list of subscribers (observers)
    }

    // subscribe (add observer)
    subscribe(observer) {
        this.observers.push(observer);
    }

    // unsubscribe (optional)
    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    // notify all observers
    notify(orderId) {
        this.observers.forEach(observer => observer.update(orderId));

        // for (let i = 0; i < this.observers.length; i++) {
        //     this.observers[i].update(orderId);
        // }

        // for (const observer of this.observers) {
        //     observer.update(orderId);
        // }
    }

    // main action
    placeOrder(orderId) {
        console.log("Order placed:", orderId);

        // notify all observers
        this.notify(orderId);
    }
}

const order = new Order();

// create observers
const email = new EmailService();
const inventory = new InventoryService();
const invoice = new InvoiceService();

// subscribe observers
order.subscribe(email);
order.subscribe(inventory);
order.subscribe(invoice);

// trigger event
order.placeOrder(101);