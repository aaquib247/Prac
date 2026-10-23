const state = {
    columns: {
        todo: ['Task 1', 'Task 2', 'Task 3'],
        inProgress: ['Task 4'],
        done: []
    },
    search: ""
}

const boardEl = document.querySelector("#board");
const inputEl = document.querySelector("#input");
const searchEl = document.querySelector("#search");

// ADDON: localStorage
function saveState() {
    localStorage.setItem("kanban", JSON.stringify(state.columns));
}

function loadState() {
    const saved = localStorage.getItem("kanban");
    if (saved) state.columns = JSON.parse(saved);
}

// BASIC — render all cards in each column
function render() {
    for (let col in state.columns) {
        const cardList = document.querySelector(`[data-col="${col}"] .card-list`);
        cardList.innerHTML = "";

        for (let task of state.columns[col]) {
            // ADDON: filter by text
            if (state.search && !task.toLowerCase().includes(state.search.toLowerCase())) continue;

            const card = document.createElement("div");
            card.className = "card";
            card.draggable = true;
            card.dataset.col = col;
            card.dataset.task = task;

            const span = document.createElement("span");
            span.textContent = task;

            // ADDON: delete button
            const btn = document.createElement("button");
            btn.textContent = "x";
            btn.dataset.col = col;
            btn.dataset.task = task;

            card.append(span, btn);
            cardList.append(card);
        }
    }
}

// BASIC — drag start: store task and source column
boardEl.addEventListener("dragstart", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    e.dataTransfer.setData("task", card.dataset.task);
    e.dataTransfer.setData("col", card.dataset.col);
});

// ADDON: delete — click x button to remove task
boardEl.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const col = btn.dataset.col;
    const task = btn.dataset.task;
    state.columns[col] = state.columns[col].filter(t => t !== task);
    saveState();
    render();
});

// BASIC — dragover + drop: move task between columns
document.querySelectorAll(".column").forEach(col => {
    col.addEventListener("dragover", (e) => e.preventDefault());

    col.addEventListener("drop", (e) => {
        const task = e.dataTransfer.getData("task");
        const fromCol = e.dataTransfer.getData("col");
        const toCol = col.dataset.col;
        if (fromCol === toCol) return;
        state.columns[fromCol] = state.columns[fromCol].filter(t => t !== task);
        state.columns[toCol].push(task);
        saveState();
        render();
    });
});

// ADDON: add task — press Enter to add to todo
inputEl.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const value = inputEl.value.trim();
    if (!value) return;
    state.columns['todo'].push(value);
    inputEl.value = "";
    saveState();
    render();
});

// ADDON: filter by text
searchEl.addEventListener("input", (e) => {
    state.search = e.target.value;
    render();
});

loadState();
render();
