// Priority  «enum»  → HIGH / MEDIUM / LOW
// Status    «enum»  → PENDING / RUNNING / DONE

// Task      → id, name, priority, status
// Scheduler → tasks[], add(), run()


// ── ENUMS ──
const Priority = Object.freeze({ HIGH: 1, MEDIUM: 2, LOW: 3 });  // numbers for sorting
const Status   = Object.freeze({ PENDING: 'PENDING', RUNNING: 'RUNNING', DONE: 'DONE' });

// ── TASK ──
class Task {
  constructor(id, name, priority) {
    this.id = id;
    this.name = name;
    this.priority = priority;
    this.status = Status.PENDING;   // always starts PENDING
  }
}

// ── SCHEDULER (the orchestrator) ──
class Scheduler {
  constructor() {
    this.tasks = [];
  }

  add(task) {
    this.tasks.push(task);
  }

  remove(taskId) {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
  }

  run() {
    // sort by priority — HIGH(1) first, LOW(3) last
    const pending = this.tasks
      .filter(t => t.status === Status.PENDING)
      .sort((a, b) => a.priority - b.priority);

    for (const task of pending) {
      task.status = Status.RUNNING;
      console.log(`Running: [${Object.keys(Priority).find(k => Priority[k] === task.priority)}] ${task.name}`);
      task.status = Status.DONE;
    }
  }

  getStatus() {
    this.tasks.forEach(t => {
      const level = Object.keys(Priority).find(k => Priority[k] === t.priority);
      console.log(`${t.name} → [${level}] ${t.status}`);
    });
  }
}

// ── TEST ──
const scheduler = new Scheduler();

scheduler.add(new Task(1, 'Fix critical bug',   Priority.HIGH));
scheduler.add(new Task(2, 'Write tests',        Priority.LOW));
scheduler.add(new Task(3, 'Code review',        Priority.MEDIUM));
scheduler.add(new Task(4, 'Deploy to staging',  Priority.HIGH));

console.log('--- Before run ---');
scheduler.getStatus();

console.log('\n--- Running ---');
scheduler.run();

console.log('\n--- After run ---');
scheduler.getStatus();


// Why Priority = { HIGH: 1, MEDIUM: 2, LOW: 3 } — numbers not strings
// The trick — sorting becomes trivial:


// .sort((a, b) => a.priority - b.priority)
// // 1(HIGH) comes before 2(MEDIUM) comes before 3(LOW)
// If you used strings ('HIGH', 'MEDIUM') you'd need a lookup table to sort. Numbers = free sorting. Clean interview trick to mention.

// ┌─────────────────┐     ┌─────────────────┐
// │ Priority «enum» │     │  Status «enum»  │
// │  HIGH   = 1     │     │  PENDING        │
// │  MEDIUM = 2     │     │  RUNNING        │
// │  LOW    = 3     │     │  DONE           │
// └─────────────────┘     └─────────────────┘
//         ▲                       ▲
//         │ uses                  │ uses
//         │                       │
//         └──────────┬────────────┘
//                    │
//         ┌──────────────────────┐
//         │         Task         │
//         │──────────────────────│
//         │ id, name             │
//         │ priority : Priority  │
//         │ status   : Status    │
//         └──────────────────────┘
//                    ▲
//                    │ has many
//         ┌──────────────────────┐
//         │       Scheduler      │
//         │──────────────────────│
//         │ tasks[]              │
//         │──────────────────────│
//         │ add(task)            │
//         │ remove(taskId)       │
//         │ run() → sort by      │
//         │   priority → execute │
//         │ getStatus()          │
//         └──────────────────────┘
