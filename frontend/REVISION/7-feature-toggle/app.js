// ============================================================
// FEATURE TOGGLE — canonical version to memorize
// ============================================================
// A list of features, each with an ON/OFF switch. Clicking a
// toggle flips that feature's `enabled` boolean and re-renders.
// The features array itself IS the state (we flip items in it).
// ============================================================

// 1. STATE — the features array is the state
const state = {
    features: [
        { name: "Dark Mode", enabled: false },
        { name: "Beta Dashboard", enabled: true },
        { name: "New Navigation", enabled: false },
        { name: "Analytics", enabled: true }
    ]
}

const listEl = document.querySelector("#list")

// 3. RENDER — one row per feature: name + ON/OFF button
function render() {
    listEl.innerHTML = "";
    for (let i = 0; i < state.features.length; i++) {
        let f = state.features[i];

        let row = document.createElement("div");
        row.className = "row";
        row.dataset.index = i;   // no filter in the base → loop index == real index

        let name = document.createElement("span");
        name.textContent = f.name;

        let toggle = document.createElement("button");
        toggle.textContent = f.enabled ? "ON" : "OFF";
        toggle.className = f.enabled ? "on" : "off";   // green when on

        row.append(name, toggle);
        listEl.append(row);
    }
}

// 4. CLICK — DELEGATION; flip the clicked feature's boolean
listEl.addEventListener("click", (e) => {
    let row = e.target.closest(".row");
    if (!row) return;
    let i = Number(row.dataset.index);            // STRING → number
    state.features[i].enabled = !state.features[i].enabled;   // flip
    render();
})

render()   // first paint
