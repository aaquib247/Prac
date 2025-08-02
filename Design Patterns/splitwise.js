class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class Group {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.users = [];
    this.expenses = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  addExpense(expense) {
    this.expenses.push(expense);
  }
}

class Split {
  constructor(user, amount) {
    this.user = user;
    this.amount = amount;
  }
}

class EqualSplit extends Split {}
class UnequalSplit extends Split {}
class PercentSplit extends Split {}

class SplitFactory {
  static createSplits(type, amount, users, meta) {
    if (type === "EQUAL") {
      const splitAmt = amount / users.length;
      return users.map(user => new EqualSplit(user, splitAmt));
    }

    if (type === "UNEQUAL") {
      return users.map((user, idx) => new UnequalSplit(user, meta[idx]));
    }

    if (type === "PERCENT") {
      return users.map((user, idx) => {
        const percentAmt = (meta[idx] / 100) * amount;
        return new PercentSplit(user, percentAmt);
      });
    }

    throw new Error("Invalid split type");
  }
}

class Expense {
  constructor(paidBy, amount, splits, type) {
    this.paidBy = paidBy;
    this.amount = amount;
    this.splits = splits;
    this.type = type;
  }
}

class BalanceSheet {
  constructor() {
    this.balances = {}; // userId1 -> { userId2: amount }
  }

  addExpense(paidBy, splits) {
    if (!this.balances[paidBy.id]) this.balances[paidBy.id] = {};

    for (let split of splits) {
      if (split.user.id === paidBy.id) continue;

      if (!this.balances[split.user.id]) this.balances[split.user.id] = {};

      this.balances[split.user.id][paidBy.id] = 
        (this.balances[split.user.id][paidBy.id] || 0) + split.amount;

      this.balances[paidBy.id][split.user.id] =
        (this.balances[paidBy.id][split.user.id] || 0) - split.amount;
    }
  }

  showBalances() {
    for (let u1 in this.balances) {
      for (let u2 in this.balances[u1]) {
        const amt = this.balances[u1][u2];
        if (amt > 0) {
          console.log(`${u1} owes ${u2}: ₹${amt}`);
        }
      }
    }
  }
}

// const u1 = new User("u1", "Alice");
// const u2 = new User("u2", "Bob");
// const u3 = new User("u3", "Charlie");

// const group = new Group("g1", "Trip");
// group.addUser(u1);
// group.addUser(u2);
// group.addUser(u3);

// const balanceSheet = new BalanceSheet();

// // EQUAL SPLIT: ₹300 by Alice among 3 people
// const splits = SplitFactory.createSplits("EQUAL", 300, [u1, u2, u3]);
// const expense = new Expense(u1, 300, splits, "EQUAL");
// group.addExpense(expense);
// balanceSheet.addExpense(u1, splits);

// balanceSheet.showBalances();
// Output:
// u2 owes u1: ₹100
// u3 owes u1: ₹100

const alice = new User("u1", "Alice");
const bob = new User("u2", "Bob");

const balanceSheet = new BalanceSheet();

// Equal split between Alice and Bob
const splits = SplitFactory.createSplits("EQUAL", 100, [alice, bob]);
const expense = new Expense(alice, 100, splits, "EQUAL");

balanceSheet.addExpense(alice, splits);
balanceSheet.showBalances();



// +-------------------+
// |      Splitwise    |
// +-------------------+
// | - users: List     |
// | - groups: List    |
// +-------------------+
// | + addUser()       |
// | + addGroup()      |
// +-------------------+

//         |
//         | 1
//         |------+
//                |
//                v
// +-------------------+
// |       User        |
// +-------------------+
// | - id: string      |
// | - name: string    |
// +-------------------+

//         |
//         | 1
//         |------+
//                |
//                v
// +-------------------+
// |     Group         |
// +-------------------+
// | - id: string      |
// | - name: string    |
// | - users: List     |
// | - expenses: List  |
// +-------------------+
// | + addUser()       |
// | + addExpense()    |
// +-------------------+

// +-------------------+              +-------------------------+
// |     Expense       |<>----------->|        Split           |
// +-------------------+    1       * +-------------------------+
// | - paidBy: User    |              | - user: User            |
// | - amount: number  |              | - amount: number        |
// | - type: string    |              +-------------------------+
// +-------------------+              ^       ^         ^
//                                    |       |         |
//                         +----------+   +---+---+   +--------+
//                         |EqualSplit|   |Percent|   |Unequal|
//                         +----------+   +-------+   +--------+

// +---------------------+
// |  BalanceSheet       |
// +---------------------+
// | - balances: Map     |
// +---------------------+
// | + update()          |
// | + print()           |
// +---------------------+

// +------------------------+
// |     SplitFactory       |
// +------------------------+
// | + createSplits()       |
// +------------------------+
