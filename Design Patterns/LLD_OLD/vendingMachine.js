// 🍫 Product
class Product {
  constructor(id, name, price, qty) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.qty = qty;
  }
}

// 💡 Base State
class State {
  insertMoney(_) {}
  selectProduct(_) {}
  dispense() {}
  cancel() {}
}

// 🔵 Idle State
class IdleState extends State {
  constructor(machine) {
    super();
    this.machine = machine;
  }

  insertMoney(amount) {
    this.machine.balance += amount;
    console.log(`💰 Inserted ₹${amount}`);
    this.machine.setState(this.machine.hasMoneyState);
  }

  selectProduct() {
    console.log("❌ Insert money first.");
  }
}

// 🟢 HasMoney State
class HasMoneyState extends State {
  constructor(machine) {
    super();
    this.machine = machine;
  }

  insertMoney(amount) {
    this.machine.balance += amount;
    console.log(`💰 Inserted ₹${amount}`);
  }

  selectProduct(productId) {
    const product = this.machine.products[productId];

    if (!product || product.qty === 0) {
      console.log("❌ Product unavailable.");
      return;
    }

    if (this.machine.balance < product.price) {
      console.log("❌ Not enough money.");
      return;
    }

    this.machine.selected = product;
    this.machine.setState(this.machine.dispenseState);
    this.machine.dispense(); // auto dispense for simplicity
  }

  cancel() {
    console.log(`🔁 Returning ₹${this.machine.balance}`);
    this.machine.balance = 0;
    this.machine.setState(this.machine.idleState);
  }
}

// 🟠 Dispense State
class DispenseState extends State {
  constructor(machine) {
    super();
    this.machine = machine;
  }

  dispense() {
    const product = this.machine.selected;

    product.qty--;
    this.machine.balance -= product.price;

    console.log(`✅ Dispensed: ${product.name}`);

    if (this.machine.balance > 0) {
      console.log(`💸 Returned change: ₹${this.machine.balance}`);
    }

    // Reset
    this.machine.balance = 0;
    this.machine.selected = null;
    this.machine.setState(this.machine.idleState);
  }
}

// 🏪 Vending Machine
class VendingMachine {
  constructor() {
    this.balance = 0;
    this.products = {};
    this.selected = null;

    // States
    this.idleState = new IdleState(this);
    this.hasMoneyState = new HasMoneyState(this);
    this.dispenseState = new DispenseState(this);
    this.currentState = this.idleState;
  }

  setState(state) {
    this.currentState = state;
  }

  addProduct(product) {
    this.products[product.id] = product;
  }

  insertMoney(amount) {
    this.currentState.insertMoney(amount);
  }

  selectProduct(productId) {
    this.currentState.selectProduct(productId);
  }

  cancel() {
    this.currentState.cancel();
  }

  dispense() {
    this.currentState.dispense();
  }
}


const vm = new VendingMachine();

vm.addProduct(new Product("p1", "Coke", 25, 2));
vm.addProduct(new Product("p2", "Chips", 30, 1));

vm.selectProduct("p1");   // ❌ Insert money first.
vm.insertMoney(20);       // 💰 Inserted ₹20
vm.selectProduct("p1");   // ❌ Not enough money.
vm.insertMoney(10);       // 💰 Inserted ₹10
vm.selectProduct("p1");   // ✅ Dispensed Coke + 💸 Change
