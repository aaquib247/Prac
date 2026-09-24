// ── ENUMS ──
// const SplitType = Object.freeze({ EQUAL: 'EQUAL', EXACT: 'EXACT', PERCENTAGE: 'PERCENTAGE' });

// ── USER ──
class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

// ── SPLIT STRATEGIES (Strategy Pattern — same as Parking Lot pricing) ──
class EqualSplit {
  calculate(amount, participants) {
    const share = amount / participants.length;
    const result = {};
    participants.forEach(p => result[p.id] = share);
    return result;                        // { userId → share }
  }
}

class ExactSplit {
  calculate(amount, participants, values) {  // values = [30, 20, 10]
    const result = {};
    participants.forEach((p, i) => result[p.id] = values[i]);
    return result;
  }
}

class PercentageSplit {
  calculate(amount, participants, values) {  // values = [50, 30, 20]
    const result = {};
    participants.forEach((p, i) => result[p.id] = (amount * values[i]) / 100);
    return result;
  }
}

// ── EXPENSE ──
class Expense {
  constructor(paidBy, amount, participants, strategy, values = []) {
    this.paidBy = paidBy;
    this.amount = amount;
    this.participants = participants;
    this.strategy = strategy;
    this.values = values;
  }
}

// ── GROUP (referee — owns users, expenses, balance sheet) ──
class Group {
  constructor(name, users) {
    this.name = name;
    this.users = users;
    this.expenses = [];
    this.balances = {};               // balances[fromId][toId] = amount fromId owes toId
  }

  addExpense(paidBy, amount, participants, strategy, values = []) {
    const expense = new Expense(paidBy, amount, participants, strategy, values);
    this.expenses.push(expense);

    const shares = strategy.calculate(amount, participants, values);

    for (const participant of participants) {
      if (participant.id === paidBy.id) continue;    // payer owes nothing

      const owes = shares[participant.id];

      // ensure row exists
      if (!this.balances[participant.id]) this.balances[participant.id] = {};

      // participant owes paidBy
      this.balances[participant.id][paidBy.id] =
        (this.balances[participant.id][paidBy.id] || 0) + owes;
    }
  }

getBalances() {
  console.log(`\n── ${this.name} Balances ──`);

  for (const fromId in this.balances) {
    for (const toId in this.balances[fromId]) {
      const amount = this.balances[fromId][toId];
      const fromName = this.users.find(u => u.id === fromId).name;
      const toName   = this.users.find(u => u.id === toId).name;
      console.log(`${fromName} owes ${toName}: $${amount.toFixed(2)}`);
    }
  }
}

}

// ── TEST (bottom-up wiring) ──
const alice = new User('alice', 'Alice');
const bob   = new User('bob',   'Bob');
const carol = new User('carol', 'Carol');

const group = new Group('Trip', [alice, bob, carol]);

// Alice pays $60 — split equally
group.addExpense(alice, 60, [alice, bob, carol], new EqualSplit());

// Bob pays $50 — exact split: alice=$20, carol=$30
group.addExpense(bob, 50, [alice, carol], new ExactSplit(), [20, 30]);

// Carol pays $90 — percentage: alice=50%, bob=50%
group.addExpense(carol, 90, [alice, bob], new PercentageSplit(), [50, 50]);

group.getBalances();


// ┌──────────────────────────┐
// │    SplitType  «enum»      │
// │  EQUAL / EXACT / PERCENTAGE│
// └──────────────────────────┘
//             ▲
//             │ uses
//             │
// ┌───────────────────────┐      ┌──────────────────────────────┐
// │     EqualSplit        │      │           User               │
// │     ExactSplit        │      │──────────────────────────────│
// │     PercentageSplit   │      │ id, name                     │
// │───────────────────────│      └──────────────────────────────┘
// │ calculate(amount,     │                   ▲
// │   participants,values)│                   │ has many
// │ → { userId: share }   │      ┌────────────┴─────────────────┐
// └───────────────────────┘      │           Group              │
//             ▲                  │──────────────────────────────│
//             │ strategy         │ name                         │
//             │ injected         │ users[]                      │
// ┌───────────────────────┐      │ expenses[]                   │
// │       Expense         │      │ balances{}  ← object of      │
// │───────────────────────│      │             objects          │
// │ paidBy : User         │      │──────────────────────────────│
// │ amount                │◄─────│ addExpense(...)              │
// │ participants : User[] │      │   → updates balances{}       │
// │ strategy              │      │ getBalances()                │
// │ values[]              │      │   → prints net debts         │
// └───────────────────────┘      └──────────────────────────────┘

// Responsibility split
// Class	Job	One-liner
// User	who's in the group	"just holds id + name"
// Expense	what was spent	"paidBy, amount, who split it, how"
// EqualSplit etc.	how to divide	"Strategy — calculate returns userId→share"
// Group	the referee	"owns balance sheet, updates on each expense"
// Three things to say in the interview
// Split types = Strategy Pattern — "same interface calculate(), swap equal/exact/percentage without touching Group"
// Balance = object of objects — "balances[bob][alice] = 20 means bob owes alice $20 — two keys because two dimensions"
// Debt simplification — "subtract reverse balance to get net — if they owe each other, it cancels out"
