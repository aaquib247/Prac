// Each state is a class with the same interface
class RedState {
  next(light) {
    console.log('Red → switching to Green');
    light.setState(new GreenState());
  }
  display() { console.log('🔴 STOP'); }
}

class GreenState {
  next(light) {
    console.log('Green → switching to Yellow');
    light.setState(new YellowState());
  }
  display() { console.log('🟢 GO'); }
}

class YellowState {
  next(light) {
    console.log('Yellow → switching to Red');
    light.setState(new RedState());
  }
  display() { console.log('🟡 SLOW'); }
}

// Context — holds the current state
class TrafficLight {
  constructor() {
    this.state = new RedState();  // initial state
  }

  setState(state) {
    this.state = state;
  }

  next() {
    this.state.next(this);
  }

  display() {
    this.state.display();
  }
}

// Usage
const light = new TrafficLight();
light.display();  // 🔴 STOP
light.next();
light.display();  // 🟢 GO
light.next();
light.display();  // 🟡 SLOW
light.next();
light.display();  // 🔴 STOP

//steps to remmeber:
// 1. Create a State interface with methods for each action.
// 2. Implement concrete state classes that implement the State interface.
// 3. Create a Context class that maintains a reference to the current state and delegates actions to it.
// 4. Use the Context class to change states and perform actions based on the current state.