// ============================================================
// TODO LIST (CRUD) — canonical version to memorize
// ============================================================
// Tests CRUD on an array in state:
//   Create = add,  Read = render,  Update = toggle done,  Delete = remove
//
// TWO BIG LESSONS this problem teaches:
//  1. For a button action, READ inputEl.value in the click handler.
//     You only need an "input" listener for live search / typeahead.
//  2. NEVER build DOM inside a handler. Handlers update STATE, then
//     call render(). render() is the only place that builds DOM.
//
// Each todo has a unique `id`. We store id on the row and act by id
// (not by text) — because two todos can share the same text, but ids
// are always unique. (set one name, read the SAME name.)
// ============================================================

// 1. STATE
const state = {
    todos: []   // array of { id, text, done }
}

const inputEl = document.querySelector("#input")
const addEl = document.querySelector("#add")
const listEl = document.querySelector("#list")

// 3. RENDER — draw every todo from state
function render() {
    listEl.innerHTML = "";
    for (let i = 0; i < state.todos.length; i++) {
        let todo = state.todos[i];

        let liEl = document.createElement("li");   // CREATE (not querySelector)
        liEl.className = todo.done ? "row done" : "row";
        liEl.dataset.id = todo.id;                 // store id — read the SAME name later

        let textEl = document.createElement("span");
        textEl.className = "text";
        textEl.textContent = todo.text;            // .text property (dot notation)

        let delEl = document.createElement("button");
        delEl.textContent = "Delete";

        liEl.append(textEl, delEl);
        listEl.append(liEl);
    }
}

// CREATE — read the input ONCE on click (no input listener needed)
addEl.addEventListener("click", () => {
    const text = inputEl.value.trim();
    if (!text) return;                                       // ignore empty
    state.todos.push({ id: Date.now(), text: text, done: false });  // unique id
    inputEl.value = "";                                      // clear input
    render();
})

// one DELEGATED listener handles BOTH delete and toggle
listEl.addEventListener("click", (e) => {
    let row = e.target.closest("li");
    if (!row) return;
    let id = Number(row.dataset.id);   // dataset is a STRING → convert to number

    if (e.target.tagName === "BUTTON") {
        // DELETE — keep every todo EXCEPT this id
        state.todos = state.todos.filter(t => t.id !== id);
    } else {
        // UPDATE — find this todo and flip done
        let todo = state.todos.find(t => t.id === id);
        todo.done = !todo.done;
    }
    render();
})

render()   // first paint (empty list)
