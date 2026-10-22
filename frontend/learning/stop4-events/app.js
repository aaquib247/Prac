// =============================================================
// STOP 4 — EVENTS DEEPER  (3 things, all interview-critical)
// =============================================================


// -------------------------------------------------------------
// THING 1: The event object
// -------------------------------------------------------------
// Every listener receives an `event` object automatically.
// It contains info about what just happened.
// The most useful properties:
//   event.target      → the element that was clicked/typed in
//   event.key         → which key was pressed (keyboard events)
//   event.preventDefault() → stop default browser behaviour

const search = document.querySelector("#search");
const output = document.querySelector("#output");
const count = document.querySelector("#counter")

// listener 1 — keydown for Enter
search.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    output.textContent = `You searched for: ${search.value}`;
    search.value = "";
  }
});

// listener 2 — input for live counter (separate, not nested)
search.addEventListener("input", (event) => {
  count.textContent = `${event.target.value.length} characters`;
});



// -------------------------------------------------------------
// THING 2: Event delegation
// -------------------------------------------------------------
// Problem: if you have 100 list items, adding 100 listeners is
// slow and breaks when you add/remove items dynamically.
//
// Solution: add ONE listener on the PARENT.
// When you click a child, the event BUBBLES UP to the parent.
// Check event.target to see what was actually clicked.
//
// This is a top interview question — know it cold.

const menu = document.querySelector("#menu");

menu.addEventListener("click", (event) => {
  // event.target = the exact element that was clicked
  // (could be an <li>, or anything inside it)
  const item = event.target.closest("li");  // find the <li> ancestor
  if (!item) return;                         // clicked outside an <li>

  const action = item.dataset.action;        // read the data-action attribute
  output.textContent = `You clicked: ${action}`;
});


// =============================================================
// YOUR TURN
// =============================================================
// TASK: Add a live character counter below the search input.
// As the user types, show "X characters" updating in real time.
//
// Hint: use the "input" event (fires on every keystroke):
//   search.addEventListener("input", (event) => {
//     // event.target.value has the current text
//   });
//
// Add a <p id="counter"></p> in the HTML and update it live.
// =============================================================
