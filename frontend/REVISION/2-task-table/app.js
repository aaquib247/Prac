// ============================================================
// TASK TABLE — canonical version to memorize
// fetch → filter (search) → sort → paginate, all state-driven
// ============================================================
// KEY DECISION for a table: the FULL dataset lives IN state
// (state.tasks). We need it all for sort + paginate, so we keep
// it untouched and derive a filtered/sorted/sliced VIEW in render.
//
// RENDER ORDER RULE (this bit people 3x): derived values FIRST,
// consumers AFTER →  filter → sort → totalPage → disabled/slice/info
// ============================================================

let url = "https://jsonplaceholder.typicode.com/todos"

// 1. STATE
const state = {
    tasks: [],         // FULL dataset — never overwrite with filtered data
    searchVal: '',     // current search term
    sortDir: 'asc',
    sortCol: null,     // which column we're sorting by (null = none)
    page: 0,
    pageSize: 10,
    totalPage: 0       // DERIVED — recomputed in render every time
}
let debounce;

// 2. CACHE DOM
const tbodyEl = document.querySelector("#tbody")
const statusEl = document.querySelector("#status")
const inputEl = document.querySelector("#input")
const theadEl = document.querySelector("#thead")
const prevEl = document.querySelector("#prev")
const nextEl = document.querySelector("#next")
const infoEl = document.querySelector("#info")

// 3. RENDER — draws a filtered→sorted→sliced view of state.tasks
function render() {
    tbodyEl.innerHTML = "";

    // (a) FILTER — derive a fresh copy; state.tasks stays whole
    let filteredtask = state.tasks.filter(task =>
        task.title.toLowerCase().includes(state.searchVal.toLowerCase()));

    // (b) SORT — bracket notation a[col] lets one comparator sort any column
    if (state.sortCol) {
        filteredtask.sort((a, b) => {
            if (a[state.sortCol] < b[state.sortCol]) return state.sortDir === 'asc' ? -1 : 1;
            if (a[state.sortCol] > b[state.sortCol]) return state.sortDir === 'asc' ? 1 : -1;
            return 0;
        })
    }

    // (c) totalPage FIRST — from the FILTERED length, before anyone reads it
    state.totalPage = Math.ceil(filteredtask.length / state.pageSize);

    // (d) consumers of totalPage: disabled buttons + slice + info text
    prevEl.disabled = state.page === 0;
    nextEl.disabled = state.page >= state.totalPage - 1;  // >= handles totalPage===0

    let filteredPage = filteredtask.slice(state.page * state.pageSize, (state.page + 1) * state.pageSize)
    infoEl.textContent = `Page ${state.page + 1} of ${state.totalPage}`

    // (e) draw the current page's rows
    for (let task of filteredPage) {
        let trEl = document.createElement("tr");
        trEl.innerHTML = `
        <td>${task.id}</td>
        <td>${task.title}</td>
        <td>${task.completed ? "✅" : "❌"}</td>
        <td>${task.userId}</td>
        `
        tbodyEl.append(trEl)
    }
}

// loading/error wrap the FETCH (the only thing that can fail), not render
async function initLoad() {
    statusEl.textContent = "Loading data....."
    try {
        let res = await fetch(url)
        state.tasks = await res.json()
        statusEl.textContent = ""
        render()
    } catch (e) {
        statusEl.textContent = "Failed Loading data....."
    }
}

// search → update state + RESET page to 0 (else you land on a blank page)
function searchTasks(val) {
    state.searchVal = val;
    state.page = 0;
    render()
}

// 4. EVENTS
// sort → DELEGATION on <thead>, closest("th") + null guard
theadEl.addEventListener("click", (e) => {
    let th = e.target.closest("th");
    if (!th) return;                 // guard BEFORE reading .dataset
    let col = th.dataset.col;
    if (!col) return;

    if (state.sortCol === col) {
        state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';  // same col → flip dir
    } else {
        state.sortCol = col;          // new col → start asc
        state.sortDir = 'asc';
    }
    render()
})

// search input → debounced
inputEl.addEventListener("input", (e) => {
    clearTimeout(debounce);
    debounce = setTimeout(() => { searchTasks(e.target.value) }, 300)
})

// prev/next just READ state.totalPage (render owns it)
prevEl.addEventListener("click", () => {
    if (state.page > 0) {
        state.page--;
        render()
    }
})

nextEl.addEventListener("click", () => {
    if (state.page < state.totalPage - 1) {
        state.page++;
        render()
    }
})

initLoad()   // fetch, then first render
