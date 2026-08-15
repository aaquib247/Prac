class State {
    insertCoin(machine) {}
    selectItem(machine) {}
}

class IdleState extends State {
    insertCoin(machine) {
        console.log("Coin inserted");
        machine.setState(machine.hasMoneyState);
    }

    selectItem(machine) {
        console.log("Insert coin first");
    }
}

class HasMoneyState extends State {
    insertCoin(machine) {
        console.log("Already have money");
    }

    selectItem(machine) {
        console.log("Item selected");
        machine.setState(machine.dispenseState);
    }
}

class DispenseState extends State {
    selectItem() {
        console.log("Dispensing already in progress");
    }

    insertCoin() {
        console.log("Wait, dispensing item");
    }
}

class VendingMachine {
    constructor() {
        this.idleState = new IdleState();
        this.hasMoneyState = new HasMoneyState();
        this.dispenseState = new DispenseState();

        this.state = this.idleState;
    }

    setState(state) {
        this.state = state;
    }

    insertCoin() {
        this.state.insertCoin(this);
    }

    selectItem() {
        this.state.selectItem(this);
    }
}

const machine = new VendingMachine();

machine.insertCoin();   // Coin inserted
machine.selectItem();   // Item selected → state changes
machine.insertCoin();   // depends on new state