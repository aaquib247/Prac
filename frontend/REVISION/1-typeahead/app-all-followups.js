// ============================================================
// TYPEAHEAD — reference with follow-ups (kept simple)
// ============================================================
// Build the BASE first. Add a follow-up ONLY when asked.
// Follow-ups here: debounce, keyboard, fake API, caching,
// race-guard, min-chars, close-on-outside-click.
// ============================================================

const countries = [
    "Afghanistan", "Argentina", "Australia", "Brazil", "Canada",
    "China", "Denmark", "Egypt", "France", "Germany",
    "India", "Japan", "Mexico", "Nigeria", "Norway"
]

const state = {
    suggestions: [],   // only the matches shown
    search: '',        // what we're searching for
    index: -1          // highlighted row (-1 = none)
}

let debounce;          // pending debounce timer
let reqId = 0;         // request counter (race guard)
const cache = new Map();   // query -> results

const inputEl = document.querySelector("#input")
const sgtnsEl = document.querySelector("#sgtns")
const matchEl = document.querySelector("#match")

// ---------- RENDER ----------
function render() {
    sgtnsEl.innerHTML = "";

    if (state.suggestions.length === 0 && state.search) {
        matchEl.textContent = "No Matches Found";
        return;
    }

    matchEl.textContent = "";
    for (let i = 0; i < state.suggestions.length; i++) {
        let liEl = document.createElement("li");
        liEl.textContent = state.suggestions[i];
        liEl.dataset.val = state.suggestions[i];
        if (i === state.index) liEl.style.background = "#d0e8ff";
        sgtnsEl.append(liEl);
    }
}

// ---------- FAKE API (per-query search) ----------
function fakeAPI(value) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(countries.filter(c => c.toLowerCase().includes(value.toLowerCase())));
        }, 500);
    });
}

// ---------- FETCH + CACHE + RACE GUARD + MIN CHARS ----------
async function getSuggestions(value) {
    // min 2 chars (also handles empty)
    if (!value || value.length < 2) {
        state.suggestions = [];
        state.search = '';
        state.index = -1;
        render();
        return;
    }

    state.search = value;
    state.index = -1;

    // cache hit → use stored result, skip the API
    if (cache.has(value)) {
        state.suggestions = cache.get(value);
        render();
        return;
    }

    // cache miss → fetch (tag the request for the race guard)
    const my = ++reqId;
    const res = await fakeAPI(value);
    if (my !== reqId) return;         // a newer request started → drop this stale one

    cache.set(value, res);            // save for next time
    state.suggestions = res;
    render();
}

// ---------- EVENTS ----------

// input → debounce → fetch
inputEl.addEventListener("input", (e) => {
    clearTimeout(debounce);
    debounce = setTimeout(() => getSuggestions(e.target.value), 300);
});

// click a suggestion → delegation + null guard
sgtnsEl.addEventListener("click", (e) => {
    let select = e.target.closest("li");
    if (!select) return;
    inputEl.value = select.dataset.val;
    state.suggestions = [];
    state.search = '';
    state.index = -1;
    render();
});

// keyboard → on the input
inputEl.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
        state.index = Math.min(state.index + 1, state.suggestions.length - 1);
        render();
    } else if (e.key === "ArrowUp") {
        state.index = Math.max(state.index - 1, -1);
        render();
    } else if (e.key === "Enter" && state.index >= 0) {
        inputEl.value = state.suggestions[state.index];
        state.suggestions = [];
        state.search = '';
        state.index = -1;
        render();
    }
});

// close dropdown when clicking outside input + list
document.addEventListener("click", (e) => {
    if (e.target !== inputEl && !sgtnsEl.contains(e.target)) {
        state.suggestions = [];
        state.search = '';
        state.index = -1;
        render();
    }
});

render();   // first paint
