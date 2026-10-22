// =============================================================
// STOP 3 — UI = PICTURE OF YOUR DATA  (the big idea)
// =============================================================
// In Stop 2, every time something changed you poked the DOM
// directly — add a node here, remove a node there.
// That works for tiny things but breaks down fast. Why?
// Because your DATA (what exists) and your UI (what shows) can
// drift out of sync and you get bugs.
//
// THE SHIFT:
//   1. Keep ONE source of truth — a plain JS array (your "database")
//   2. Write ONE render() function — draws the WHOLE UI from that array
//   3. To change the UI: change the ARRAY, then call render()
//      You NEVER touch the DOM directly anymore.
//
// Backend analogy:
//   items array  =  database rows
//   render()     =  the template that turns rows into HTML response
//   You never hand-edit the response — you change the data, re-render.
//
// This is EXACTLY how React and Angular think.
// =============================================================


// ---- THE DATA (single source of truth) ----------------------
let items = [];   // e.g. ["Milk", "Eggs", "Bread"]


// ---- CACHE DOM references (find them once, reuse) -----------
const input = document.querySelector("#text-input");
const addBtn = document.querySelector("#add-btn");
const list = document.querySelector("#list");
const count = document.querySelector("#count");


// ---- render() : draws the WHOLE UI from items[] -------------
function render() {
  list.innerHTML = "";  // wipe the list clean

  for (let i = 0; i < items.length; i++) {

    let item = items[i];
    const li = document.createElement("li");
    li.textContent = item;

    const btn = document.createElement("button");
    btn.textContent = 'Delete';

     btn.addEventListener("click", () => {  // ← inside the loop
     items.splice(i, 1);   // remove item at index i from array
     render();             // redraw
     });

    li.append(btn)
    list.append(li);
  }

  count.textContent = `Total: ${items.length}`;
}


// ---- EVENTS: change data, then render() ---------------------
addBtn.addEventListener("click", () => {
  const text = input.value;
  if (text === "") return;

  items.push(text);   // change the DATA
  input.value = "";
  render();           // redraw the UI
});


// First paint (list is empty so nothing shows, but count shows 0)
render();


// =============================================================
// YOUR TURN
// =============================================================
// Add a delete button to each <li> so clicking it removes that
// item from the items[] array, then calls render().
//
// HINT: inside the for loop, you know the item's text. But to
// remove it from the array you need its INDEX (position number).
// Change the for loop to:
//   for (let i = 0; i < items.length; i++) {
//     const item = items[i];   // the text
//     // i is the index
//   }
//
// To remove item at index i from an array:
//   items.splice(i, 1);   // remove 1 element at position i
//
// Then call render(). That's it — no DOM manipulation needed.
// The UI will update automatically because render() redraws everything.
// =============================================================
