// =============================================================
// DAY 2 — RENDER FROM STATE  (the most important frontend idea)
// =============================================================
// On Day 1 we poked the DOM directly: create a node here, remove a
// node there. That works for tiny things but gets buggy fast — the
// UI and your data drift out of sync.
//
// THE SHIFT: keep ONE source of truth (a data structure), and write
// ONE render() function that draws the whole UI from that data.
// To change the UI, you change the DATA, then call render().
//
// Backend analogy: your `todos` array is the database row. render()
// is the template that turns a row into an HTTP response. You never
// hand-edit the response — you change the data and re-render.
//
// This is EXACTLY how React/Angular think under the hood. Learn it
// in vanilla and frameworks become easy.
// =============================================================


// ---- 1. STATE: the single source of truth -------------------
// Each todo is an object. `id` lets us find/update/delete reliably.
let todos = []; // e.g. [{ id: 1, text: "buy milk", done: false }]
let nextId = 1;


// ---- 2. Cache the elements we render into -------------------
const form = document.querySelector("#add-form");
const input = document.querySelector("#item-input");
const list = document.querySelector("#list");
const count = document.querySelector("#count");


// ---- 3. RENDER: draw the whole UI from `todos` --------------
// Called after EVERY state change. It rebuilds the list to match.
function render() {
  list.innerHTML = ""; // clear, then redraw from state

  for (const todo of todos) {
    const li = document.createElement("li");
    li.dataset.id = todo.id; // stash the id on the DOM node

    if (todo.done) li.classList.add("done");

    const span = document.createElement("span");
    span.textContent = todo.text;

    const del = document.createElement("button");
    del.textContent = "Delete";

    li.append(span, del);
    list.append(li);
  }

  count.textContent = `Total: ${todos.length} · Done: ${todos.filter(t => t.done).length}`;
}


// ---- 4. EVENTS change STATE, then call render() -------------
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  todos.push({ id: nextId++, text, done: false }); // change DATA
  input.value = "";
  render();                                          // redraw
});

// EVENT DELEGATION: one listener on the <ul>, not one per <li>.
// When you click anything inside the list, the event BUBBLES up to
// <ul>. We check what was actually clicked via e.target.
// This is a top interview concept — it scales and survives re-renders.
list.addEventListener("click", (e) => {
  const li = e.target.closest("li");   // which row?
  if (!li) return;
  const id = Number(li.dataset.id);

  if (e.target.tagName === "BUTTON") {
    // delete: filter it out of state
    todos = todos.filter(t => t.id !== id);
  } else {
    // toggle done: flip the flag in state
    const todo = todos.find(t => t.id === id);
    todo.done = !todo.done;
  }
  render(); // one redraw path for every change
});


// First paint
render();


// =============================================================
// YOUR TURN
// =============================================================
// TASK: Add a "Clear completed" button that removes every todo whose
//       done === true.
//   1. Add <button id="clear">Clear completed</button> in index.html.
//   2. In app.js, grab it, add a click listener.
//   3. Inside: set `todos = todos.filter(...)` to drop done ones,
//      then call render(). Notice you NEVER touch the DOM directly —
//      you change state and re-render. That's the whole pattern.
//
// Bonus follow-up an interviewer WOULD ask: "What happens to the
// text in the input if render() runs — does it clear?" Try it and
// tell me what you observe and why.
// =============================================================
