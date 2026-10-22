// =============================================================
// DAY 1 — DOM & EVENTS  (vanilla JS, no framework)
// =============================================================
// The DOM is a live object tree representing the page. JS can:
//   - SELECT elements (find a node)
//   - READ / WRITE their content & attributes
//   - CREATE / REMOVE nodes
//   - LISTEN for events (clicks, typing, etc.)
// That's 90% of the browser round. Master these four verbs.
// =============================================================


// -------------------------------------------------------------
// CONCEPT 1: Select an element + listen for an event
// -------------------------------------------------------------
// document.querySelector(cssSelector) returns the FIRST match (or null).
// Here "#counter-btn" means "the element with id='counter-btn'".
const counterBtn = document.querySelector("#counter-btn");
counterBtn.textContent = 'UpdatedBTN'
// State lives in a plain JS variable — same as backend. No magic.
let count = 0;

// addEventListener(eventName, callbackFn) wires a function to an event.
// The browser calls your function every time the event fires.
counterBtn.addEventListener("click", () => {
  count = count + 1;
  // .textContent sets the text INSIDE the element. (Safe — no HTML parsing.)
  counterBtn.textContent = `Clicked ${count} times`;
});


// -------------------------------------------------------------
// CONCEPT 2: Create + remove elements (the interactive list)
// -------------------------------------------------------------
const form = document.querySelector("#add-form");
const input = document.querySelector("#item-input");
const list = document.querySelector("#list");

// A form fires a "submit" event when you press Enter or click Add.
form.addEventListener("submit", (event) => {
  // By default a form submit RELOADS the page. preventDefault() stops that.
  // This single line trips up almost every beginner — remember it.
  event.preventDefault();

  const text = input.value.trim();
  if (text === "") return; // edge case: ignore empty input

  addItem(text);
  input.value = ""; // clear the box for the next entry
});

function addItem(text) {
  // Build a <li> node in memory...
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    li.remove(); // removes this <li> from the DOM tree
  });

  // ...then attach children, then attach the li to the list.
  li.append(span, deleteBtn);
  list.append(li);
}


// =============================================================
// YOUR TURN  (do this before we move on — it's how you learn)
// =============================================================
// Open index.html in your browser (double-click it, or see the run
// command I gave you). Confirm the counter and list work. Then:
//
//   TASK A: When you click the text of a list item (the <span>),
//           toggle a line-through style on it (mark as "done").
//           Hint: span.addEventListener("click", ...) and
//           span.style.textDecoration = "line-through" (or "none").
//
//   TASK B: Show a live count "Total items: N" above the list that
//           updates whenever you add OR delete an item.
//
// Write the code yourself in this file. Paste it back to me and I'll
// review it like an interviewer would. Struggling is the point.
// =============================================================
