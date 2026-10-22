// =============================================================
// STOP 2 — BUILDING THE DOM (making new boxes)
// =============================================================
// Three new steps. Think of it like putting a box on a shelf:
//   1. CREATE the box          document.createElement("p")
//   2. FILL it                 p.textContent = "hello"
//   3. ATTACH it to the page   container.append(p)
// A created box is invisible until you ATTACH it with append().
// =============================================================

const input = document.querySelector("#text-input");
const addBtn = document.querySelector("#add-btn");
const container = document.querySelector("#container");


// ---- DEMO (already working — read it, then click Add) -------
addBtn.addEventListener("click", () => {
  // 1. CREATE a new <p> box (exists in memory, not on page yet)
  const text = input.value;
  if(text === "") return;
  const p = document.createElement("p");
  // 2. FILL it with text
  p.textContent = text;
  
  const delBtn = document.createElement("button");
  delBtn.textContent = "x";
  delBtn.addEventListener("click", () => {
  p.remove();        // deletes this specific <p> from the page
  });

  p.append(delBtn);    // put the button inside the <p>


  // 3. ATTACH it inside the container (NOW it shows on the page)
  container.append(p);
  input.value = ''
});


// =============================================================
// YOUR TURN
// =============================================================
// Right now every click adds the SAME hardcoded "New line!".
// Change the handler so each new <p> shows whatever the user
// typed in the input box instead.
//
// Hints (all things you already know):
//   - read what was typed:  input.value
//   - ignore empty input:   if (text === "") return;
//   - optional nicety:      clear the box after:  input.value = "";
//
// Edit the handler above, save, refresh, and test. Paste it back.
// =============================================================
