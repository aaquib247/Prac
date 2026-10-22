// TYPEAHEAD
const state = {
    suggestions: [],
    activeIndex: -1 // for keyboard.
}
let debounceTime;
const searchEl = document.querySelector("#search");
const suggestionsEl = document.querySelector("#suggestions");

// function render() {
//     suggestionsEl.innerHTML = "";
//     for (let suggestion of state.suggestions) {
//         let list = document.createElement("li");
//         list.textContent = suggestion;

//         list.addEventListener("click", () => {
//             searchEl.value = suggestion;   // fill input
//             state.suggestions = [];         // clear suggestions
//             render();                       // hide dropdown
//         });

//         suggestionsEl.append(list)
//     }
// }

// forKeyboard
function render() {
    suggestionsEl.innerHTML = "";
    for (let i = 0; i < state.suggestions.length; i++) {
        let li = document.createElement("li");
        li.textContent = state.suggestions[i];
        
        if (i === state.activeIndex) {
            li.style.background = "#d0e8ff";  // highlight active
        }

        li.addEventListener("click", () => {
            searchEl.value = state.suggestions[i];
            state.suggestions = [];
            state.activeIndex = -1;
            render();
        });

        suggestionsEl.append(li);
    }
}


let allTodos = [];

async function loadTodos() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    allTodos = await res.json();
    console.log("loaded", allTodos.length);  // ← add this
}

async function fetchSuggestions(query) {
    console.log("query:", query);  // ← add this
    if (!query) {
        state.suggestions = [];
        render();
        return;
    }

    const filtered = allTodos.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));
    console.log("filtered:", filtered.length);  // ← add this
    state.suggestions = filtered.slice(0, 5).map(item => item.title);
    console.log("suggestions:", state.suggestions);  // ← add this
    render()
}


searchEl.addEventListener("input", (e) => {
    clearTimeout(debounceTime);
    debounceTime = setTimeout(() => { fetchSuggestions(e.target.value) }, 300)

});

searchEl.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
        state.activeIndex = Math.min(state.activeIndex + 1, state.suggestions.length - 1);
        render();
    } else if (e.key === "ArrowUp") {
        state.activeIndex = Math.max(state.activeIndex - 1, -1);
        render();
    } else if (e.key === "Enter" && state.activeIndex >= 0) {
        searchEl.value = state.suggestions[state.activeIndex];
        state.suggestions = [];
        state.activeIndex = -1;
        render();
    }
});



loadTodos();