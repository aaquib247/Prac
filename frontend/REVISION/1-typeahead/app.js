// ============================================================
// TYPEAHEAD / AUTOCOMPLETE  — canonical version to memorize
// ============================================================
// SKELETON (same for every problem):
//   1. STATE  — what drives the UI
//   2. CACHE DOM
//   3. render() — draws UI from state, called after every change
//   4. EVENTS — update state, then render()
//
// KEY DECISION for typeahead: full data (countries) lives OUTSIDE
// state. We filter FIRST, then store only the matches in state.
// So state.suggestions always = exactly what's on screen.
// ============================================================

// full dataset — stays outside state (we never show all of it)
const countries = [
    "Afghanistan", "Argentina", "Australia", "Brazil", "Canada",
    "China", "Denmark", "Egypt", "France", "Germany",
    "India", "Japan", "Mexico", "Nigeria", "Norway"
]

const inputEl = document.querySelector("#input")
const listEl = document.querySelector("#list")
const noMatchEl = document.querySelector("#noMatch")
let debounce;   // holds the pending timer so we can cancel it

// 1. STATE — only what is shown + what's highlighted + current search
const state = {
    sugesstions: [],   // ONLY the matches to display (never the full list)
    index: -1,         // which suggestion is highlighted (-1 = none)
    search: ''         // what the user is searching for (NOT input.value)
}

// 3. RENDER — dumb. Just draws whatever state says.
function render() {
    listEl.innerHTML = "";

    // show "no results" ONLY while actively searching (search non-empty).
    // after a selection we clear state.search, so this won't fire then.
    if (state.sugesstions.length === 0 && state.search) {
        noMatchEl.textContent = "No Matches Found";
        return;
    }

    noMatchEl.textContent = "";
    for (let i = 0; i < state.sugesstions.length; i++) {
        let liEl = document.createElement("li");
        liEl.textContent = state.sugesstions[i];
        liEl.dataset.val = state.sugesstions[i];   // store value for click to read

        if (state.index === i) {
            liEl.style.background = "#d0e8ff";       // highlight the active row
        }

        listEl.append(liEl)   // CREATE and ATTACH — never forget the append
    }
}

// filter FIRST, then store only matches. called by the debounced input.
function getSugesstion(search) {
    if (!search) {
        state.sugesstions = [];
        state.search = '';
        render()
        return;
    }

    state.sugesstions = countries
        .filter(c => c.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 5);        // cap the dropdown at 5
    state.index = -1;        // reset highlight whenever the search changes
    state.search = search;
    render()
}

// 4. EVENTS
// input → debounce 300ms → getSugesstion. (protects a real API from firing per keystroke)
inputEl.addEventListener("input", (e) => {
    clearTimeout(debounce)
    debounce = setTimeout(() => { getSugesstion(e.target.value) }, 300)
})

// click → DELEGATION on the parent <ul>, closest("li") + null guard
listEl.addEventListener("click", (e) => {
    let select = e.target.closest("li");
    if (!select) return;                 // clicked the gap, not an li
    inputEl.value = select.dataset.val;  // READ the value first...
    state.sugesstions = [];              // ...THEN clear state
    state.search = ''
    render()
})

// keyboard → always on the INPUT (that's where focus is), never on the list
inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        // state.sugesstions holds ONLY the visible matches, so its length
        // IS the visible count — read from state, no need to query the DOM
        state.index = Math.min(state.index + 1, state.sugesstions.length - 1)
        render()
    } else if (e.key === 'ArrowUp') {
        state.index = Math.max(state.index - 1, -1)
        render()
    } else if (e.key === 'Enter' && state.index >= 0) {
        // READ the highlighted item before clearing (read-before-destroy).
        // state.sugesstions == what's on screen, so read straight from state.
        inputEl.value = state.sugesstions[state.index];
        state.sugesstions = [];
        state.index = -1;
        state.search = ''
        render()
    }
})

render()   // first paint
