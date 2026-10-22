let url = "https://jsonplaceholder.typicode.com/todos";

const state = {
    tasks: [],
    sortCol: null,
    sortDir: "asc",
    search: "",
    page: 0,        // ← add this
    pageSize: 10    // ← add this
};

const tbodyEl = document.querySelector("#tbody");
const searchEl = document.querySelector("#search");
const theadEl = document.querySelector("thead");
const statusEl = document.querySelector("#status")
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const pageInfoEl = document.querySelector("#page-info");


async function init() {
    statusEl.textContent = "Loading...";

    try {
        let res = await fetch(url)
        state.tasks = await res.json()
        statusEl.textContent = "";
        render()
    }
    catch (e) {
        statusEl.textContent = "Error loading tasks.";
    }

}

function render() {
    //1.Filter
    let filteredTask = state.tasks.filter(task => task.title.toLowerCase().includes(state.search.toLowerCase()));


    if (state.sortCol) {
        filteredTask.sort((a, b) => {
            if (a[state.sortCol] < b[state.sortCol]) return state.sortDir === "asc" ? -1 : 1;
            if (a[state.sortCol] > b[state.sortCol]) return state.sortDir === "asc" ? 1 : -1;
            return 0;
        });
    }

    const totalPages = Math.ceil(filteredTask.length / state.pageSize);
    const paginated = filteredTask.slice(state.page * state.pageSize, (state.page + 1) * state.pageSize);
    // update page info
    pageInfoEl.textContent = `Page ${state.page + 1} of ${totalPages}`;

    tbodyEl.innerHTML = "";
    for (let task of paginated) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${task.id}</td>
      <td>${task.title}</td>
      <td>${task.completed ? "✅" : "❌"}</td>
      <td>${task.userId}</td>
    `;

        // const td1 = document.createElement("td");
        // td1.textContent = task.id;

        // const td2 = document.createElement("td");
        // td2.textContent = task.title;

        // const td3 = document.createElement("td");
        // td3.textContent = task.completed ? "✅" : "❌";

        // const td4 = document.createElement("td");
        // td4.textContent = task.userId;

        // tr.append(td1, td2, td3, td4);
        tbodyEl.append(tr);
    }
}

searchEl.addEventListener("input", (e) => {
    state.search = e.target.value;
    state.page = 0; 
    render();
})

theadEl.addEventListener("click", (e) => {
    let col = e.target.dataset.col;
    if (!col) return;

    if (state.sortCol === col) {
        state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
    } else {
        state.sortCol = col;
        state.sortDir = "asc";
    }

    render();
})

prevBtn.addEventListener("click", () => {
    if (state.page > 0) {
        state.page--;
        render();
    }
});

nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(state.tasks.length / state.pageSize);
    if (state.page < totalPages - 1) {
        state.page++;
        render();
    }
});


init();