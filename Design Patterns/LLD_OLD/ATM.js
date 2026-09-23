class BankAccount {
  constructor(balance) {
    this.balance = balance;
  }

  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      return true;
    }
    return false;
  }

  getBalance() {
    return this.balance;
  }
}

class Card {
  constructor(pin, account) {
    this.pin = pin;
    this.account = account;
  }

  validate(pinInput) {
    return this.pin === pinInput;
  }
}

class User {
  constructor(card) {
    this.card = card;
  }
}


class ATMState {
  insertCard(card) {}
  authenticate(pin) {}
  selectOperation(op) {}
  withdraw(amount) {}
  checkBalance() {}
  ejectCard() {}
}

class IdleState extends ATMState {
  constructor(atm) {
    super();
    this.atm = atm;
  }

  insertCard(card) {
    this.atm.card = card;
    console.log("Card inserted.");
    this.atm.setState(this.atm.hasCardState);
  }
}

class HasCardState extends ATMState {
  constructor(atm) {
    super();
    this.atm = atm;
  }

  authenticate(pin) {
    if (this.atm.card.validate(pin)) {
      console.log("PIN correct.");
      this.atm.setState(this.atm.authenticatedState);
    } else {
      console.log("Invalid PIN.");
      this.atm.card = null;
      this.atm.setState(this.atm.idleState);
    }
  }

  ejectCard() {
    console.log("Card ejected.");
    this.atm.card = null;
    this.atm.setState(this.atm.idleState);
  }
}

class AuthenticatedState extends ATMState {
  constructor(atm) {
    super();
    this.atm = atm;
  }

  selectOperation(op) {
    if (op === "withdraw") {
      this.atm.setState(this.atm.withdrawState);
    } else if (op === "balance") {
      this.atm.setState(this.atm.balanceState);
    } else {
      console.log("Invalid operation.");
    }
  }

  ejectCard() {
    console.log("Card ejected.");
    this.atm.card = null;
    this.atm.setState(this.atm.idleState);
  }
}

class WithdrawState extends ATMState {
  constructor(atm) {
    super();
    this.atm = atm;
  }

  withdraw(amount) {
    const success = this.atm.card.account.withdraw(amount);
    if (success) {
      console.log(`Withdrawn ₹${amount}`);
    } else {
      console.log("Insufficient balance.");
    }
    this.ejectCard();
  }

  ejectCard() {
    console.log("Card ejected.");
    this.atm.card = null;
    this.atm.setState(this.atm.idleState);
  }
}

class BalanceState extends ATMState {
  constructor(atm) {
    super();
    this.atm = atm;
  }

  checkBalance() {
    console.log(`Balance: ₹${this.atm.card.account.getBalance()}`);
    this.ejectCard();
  }

  ejectCard() {
    console.log("Card ejected.");
    this.atm.card = null;
    this.atm.setState(this.atm.idleState);
  }
}

class ATM {
  constructor() {
    this.card = null;

    this.idleState = new IdleState(this);
    this.hasCardState = new HasCardState(this);
    this.authenticatedState = new AuthenticatedState(this);
    this.withdrawState = new WithdrawState(this);
    this.balanceState = new BalanceState(this);

    this.currentState = this.idleState;
  }

  setState(state) {
    this.currentState = state;
  }

  insertCard(card) {
    this.currentState.insertCard(card);
  }

  authenticate(pin) {
    this.currentState.authenticate(pin);
  }

  selectOperation(op) {
    this.currentState.selectOperation(op);
  }

  withdraw(amount) {
    this.currentState.withdraw(amount);
  }

  checkBalance() {
    this.currentState.checkBalance();
  }

  ejectCard() {
    this.currentState.ejectCard();
  }
}

const acc = new BankAccount(1000);
const card = new Card("1234", acc);
const atm = new ATM();

atm.insertCard(card);
atm.authenticate("1234");
atm.selectOperation("withdraw");
atm.withdraw(500); // Withdrawn ₹500

atm.insertCard(card);
atm.authenticate("1234");
atm.selectOperation("balance");
atm.checkBalance(); // Balance: ₹500
