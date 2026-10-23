const state = {
    features: [
        { name: "Dark Mode", enabled: false },
        { name: "Beta Dashboard", enabled: true },
        { name: "New Navigation", enabled: false },
        { name: "Analytics", enabled: true }
    ],
    filter: "all"  // ADDON: "all" | "enabled" | "disabled"
}

const listEl = document.querySelector("#list");
const filterEl = document.querySelector("#filter");
const inputEl = document.querySelector("#input");
const addBtn = document.querySelector("#add-btn");

// ADDON: localStorage — save state
function saveState() {
    localStorage.setItem("features", JSON.stringify(state.features));
}

// ADDON: localStorage — load state on page start
function loadState() {
    const saved = localStorage.getItem("features");
    if (saved) state.features = JSON.parse(saved);
}

// BASIC — render all feature rows
function render() {
    listEl.innerHTML = "";

    // ADDON: filter features before rendering
    let filtered = state.features;
    if (state.filter === "enabled") filtered = state.features.filter(f => f.enabled);
    if (state.filter === "disabled") filtered = state.features.filter(f => !f.enabled);

    for (let i = 0; i < filtered.length; i++) {
        const feature = filtered[i];

        const row = document.createElement("div");
        row.className = "row";
        row.dataset.index = state.features.indexOf(feature); // store real index for toggle

        const name = document.createElement("span");
        name.textContent = feature.name;

        // BASIC — toggle button shows ON/OFF and changes color
        const toggle = document.createElement("button");
        toggle.textContent = feature.enabled ? "ON" : "OFF";
        toggle.className = feature.enabled ? "on" : "off";

        row.append(name, toggle);
        listEl.append(row);
    }
}

// BASIC — toggle on click using event delegation on listEl
listEl.addEventListener("click", (e) => {
    const row = e.target.closest(".row");
    if (!row) return;
    const i = Number(row.dataset.index); // get real index from state
    state.features[i].enabled = !state.features[i].enabled; // flip boolean
    saveState(); // ADDON: persist
    render();
});

// ADDON: filter — show all / enabled / disabled
filterEl.addEventListener("change", (e) => {
    state.filter = e.target.value;
    render();
});

// ADDON: add new feature — press button or Enter
function addFeature() {
    const value = inputEl.value.trim();
    if (!value) return;
    state.features.push({ name: value, enabled: false }); // new features start disabled
    inputEl.value = "";
    saveState();
    render();
}

addBtn.addEventListener("click", addFeature);

inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addFeature();
});

loadState();
render();
