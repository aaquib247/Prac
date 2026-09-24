
const State     = Object.freeze({ IDLE: 'IDLE', UP: 'UP', DOWN: 'DOWN' });
const Direction = Object.freeze({ UP: 'UP', DOWN: 'DOWN' });

// ── ELEVATOR (+ its inner panel) ──
class Elevator {
  constructor(id) {
    this.id = id;
    this.currentFloor = 0;
    this.state = State.IDLE;
    this.targets = new Set();
  }

  // INNER panel: passenger inside presses a destination
  pressFloor(floor) { this.targets.add(floor); }

  step() {
    if (this.targets.size === 0) { this.state = State.IDLE; return; }
    const t = [...this.targets];
    const hasAbove = t.some(f => f > this.currentFloor);
    const hasBelow = t.some(f => f < this.currentFloor);

    if (this.state === State.IDLE)                   this.state = hasAbove ? State.UP : State.DOWN;
    else if (this.state === State.UP && !hasAbove)   this.state = State.DOWN;
    else if (this.state === State.DOWN && !hasBelow) this.state = State.UP;

    this.currentFloor += this.state === State.UP ? 1 : -1;

    if (this.targets.has(this.currentFloor)) {
      this.targets.delete(this.currentFloor);
      console.log(`Elevator ${this.id} → floor ${this.currentFloor}`);
      if (this.targets.size === 0) this.state = State.IDLE;
    }
  }
}

// ── FLOOR (+ its outer panel) ──
class Floor {
  constructor(floorNumber, orchestrator) {
    this.floorNumber = floorNumber;
    this.orchestrator = orchestrator;
  }
  // OUTER panel: person on this floor calls a lift
  pressButton(direction) {
    this.orchestrator.request(this.floorNumber, direction);
  }
}

// ── ORCHESTRATOR (picks closest elevator for hall calls) ──
class Orchestrator {
  constructor(elevators) { this.elevators = elevators; }

  request(floor, direction) {
    const best = this.elevators.reduce((a, b) =>
      Math.abs(a.currentFloor - floor) <= Math.abs(b.currentFloor - floor) ? a : b
    );
    best.pressFloor(floor);
    console.log(`Hall call floor ${floor} (${direction}) → Elevator ${best.id}`);
  }

  step() { this.elevators.forEach(e => e.step()); }
  isBusy() { return this.elevators.some(e => e.targets.size > 0); }
}

// ── TEST ──
const elevators = [new Elevator(1), new Elevator(2)];
const orch = new Orchestrator(elevators);

const floors = [];
for (let i = 0; i < 10; i++) floors.push(new Floor(i, orch));

floors[5].pressButton(Direction.UP);   // OUTER: someone on floor 5 wants up
floors[2].pressButton(Direction.DOWN); // OUTER: someone on floor 2 wants down
elevators[0].pressFloor(8);            // INNER: passenger in lift 1 presses 8

while (orch.isBusy()) orch.step();


// ┌─────────────────────────┐          ┌─────────────────────────┐
// │      State  «enum»       │          │    Direction  «enum»    │
// │  IDLE / UP / DOWN        │          │  UP / DOWN              │
// └─────────────────────────┘          └─────────────────────────┘
//             ▲                                     ▲
//             │ uses                                │ uses
//             │                                     │
// ┌───────────────────────────────┐   ┌────────────────────────────────┐
// │         Elevator              │   │            Floor               │
// │  (+ INNER panel)              │   │  (+ OUTER panel)               │
// │───────────────────────────────│   │────────────────────────────────│
// │ id                            │   │ floorNumber                    │
// │ currentFloor                  │   │ orchestrator                   │
// │ state : State                 │   │────────────────────────────────│
// │ targets : Set                 │   │ pressButton(direction)         │
// │───────────────────────────────│   │   └─ OUTER: hall call          │
// │ pressFloor(floor)             │   │      → orchestrator.request()  │
// │   └─ INNER: car call          │   └────────────────────────────────┘
// │ step()  ← SCAN                │                   │
// └───────────────────────────────┘                  │ calls
//             ▲                                       ▼
//             │ has many          ┌────────────────────────────────────┐
//             └───────────────────│           Orchestrator             │
//                                 │────────────────────────────────────│
//                                 │ elevators : Elevator[]             │
//                                 │────────────────────────────────────│
//                                 │ request(floor, direction)          │
//                                 │   └─ picks CLOSEST elevator         │
//                                 │ step()   → tick all elevators       │
//                                 │ isBusy()                            │
//                                 └────────────────────────────────────┘

//                                 The two call paths (the key insight)

// INNER button (inside lift):   elevator.pressFloor(8)
//                               → adds straight to ITS OWN targets
//                               → "I'm already in this lift, take me to 8"

// OUTER button (on a floor):    floor.pressButton(UP)
//                               → orchestrator.request(floor, UP)
//                               → orchestrator PICKS which elevator comes
//                               → "which lift should respond?"
// Responsibility split
// Class	Job	One-liner
// Elevator	moves itself	"owns floor + state, runs SCAN, inner panel adds to own targets"
// Floor	hall call source	"outer panel forwards to orchestrator"
// Orchestrator	picks the lift	"closest elevator wins the hall call"
// The one line to say: "Inner call goes straight to its own elevator; outer call goes through the orchestrator because the system must choose which lift responds."