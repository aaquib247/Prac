class NoMoney {
  insert(machine) {
    console.log("Money inserted");
    machine.setState(new HasMoney());
  }

  selectItem(machine) {
    console.log("Please insert money");
  }

  cancel(machine) {
    console.log("Nothing to cancel");
  }
}

class HasMoney {
  insert(machine) {
    console.log("Money already inserted");
  }

  selectItem(machine) {
    console.log("Item selected");
    machine.setState(new Dispense());
  }

  cancel(machine) {
    console.log("Transaction cancelled");
    machine.setState(new NoMoney());
  }
}

class Dispense {
  insert(machine) {
    console.log("Please wait...");
  }

  selectItem(machine) {
    console.log("Already dispensing");
  }

  cancel(machine) {
    console.log("Cannot cancel while dispensing");
  }
}

class VendingMachine {
  constructor() {
    this.state = new NoMoney();
  }

  setState(state) {
    this.state = state;
  }

  insert() {
    this.state.insert(this);
  }

  selectItem() {
    this.state.selectItem(this);
  }

  cancel() {
    this.state.cancel(this);
  }
}
