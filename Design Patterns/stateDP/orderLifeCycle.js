// ─── State Interface (in JS we just document the contract) ───
// Every state must implement: confirm, ship, deliver, cancel

class PlacedState {
  confirm(order) {
    console.log('Order confirmed ✅');
    order.setState(new ConfirmedState());
  }

  ship(order) {
    throw new Error('Cannot ship — order not confirmed yet');
  }

  deliver(order) {
    throw new Error('Cannot deliver — order not shipped yet');
  }

  cancel(order) {
    console.log('Order cancelled ❌');
    order.setState(new CancelledState());
  }

  toString() { return 'PLACED'; }
}

class ConfirmedState {
  confirm(order) {
    throw new Error('Already confirmed');
  }

  ship(order) {
    console.log('Order shipped 🚚');
    order.setState(new ShippedState());
  }

  deliver(order) {
    throw new Error('Cannot deliver — not shipped yet');
  }

  cancel(order) {
    console.log('Order cancelled ❌');
    order.setState(new CancelledState());
  }

  toString() { return 'CONFIRMED'; }
}

class ShippedState {
  confirm(order) {
    throw new Error('Already confirmed and shipped');
  }

  ship(order) {
    throw new Error('Already shipped');
  }

  deliver(order) {
    console.log('Order delivered 📦');
    order.setState(new DeliveredState());
  }

  cancel(order) {
    throw new Error('Cannot cancel — already shipped');
  }

  toString() { return 'SHIPPED'; }
}

class DeliveredState {
  confirm(order) { throw new Error('Order already delivered'); }
  ship(order)    { throw new Error('Order already delivered'); }
  deliver(order) { throw new Error('Already delivered'); }

  cancel(order) {
    throw new Error('Cannot cancel — already delivered');
  }

  toString() { return 'DELIVERED'; }
}

class CancelledState {
  confirm(order) { throw new Error('Order is cancelled'); }
  ship(order)    { throw new Error('Order is cancelled'); }
  deliver(order) { throw new Error('Order is cancelled'); }
  cancel(order)  { throw new Error('Already cancelled'); }

  toString() { return 'CANCELLED'; }
}

// ─── Context ───
class Order {
  constructor(id) {
    this.id = id;
    this.state = new PlacedState();  // always start here
  }

  setState(state) {
    console.log(`  [State: ${this.state} → ${state}]`);
    this.state = state;
  }

  // These just delegate to current state
  confirm()  { this.state.confirm(this); }
  ship()     { this.state.ship(this); }
  deliver()  { this.state.deliver(this); }
  cancel()   { this.state.cancel(this); }

  getStatus() { return this.state.toString(); }
}

// ─── Usage ───
const order = new Order('ORD-001');
console.log('Status:', order.getStatus());  // PLACED

order.confirm();   // ✅  [State: PLACED → CONFIRMED]
order.ship();      // 🚚  [State: CONFIRMED → SHIPPED]
order.deliver();   // 📦  [State: SHIPPED → DELIVERED]

// Try invalid transition
try {
  order.cancel();
} catch (e) {
  console.log(e.message);  // Cannot cancel — already delivered
}
