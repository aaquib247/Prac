// ============================================================
// TABS — canonical version to memorize
// ============================================================
// Simplest state-driven component. state = which tab is active
// (just an index). render() draws the buttons + the active
// tab's content. Click → change the index → render.
// ============================================================

// data: each tab has a label (button text) + content (what shows)
const tabs = [
    { label: "Home", content: "Welcome to the Home tab." },
    { label: "Profile", content: "This is your Profile." },
    { label: "Settings", content: "Adjust your Settings here." }
]

// 1. STATE — only the active tab index
const state = { active: 0 }

const tabButtonsEl = document.querySelector("#tab-buttons")
const tabContentEl = document.querySelector("#tab-content")

// 3. RENDER — draw buttons (highlight active) + the active content
function render() {
    tabButtonsEl.innerHTML = "";
    for (let i = 0; i < tabs.length; i++) {
        let btn = document.createElement("button");
        btn.textContent = tabs[i].label;
        btn.dataset.index = i;                          // store index for the click
        if (i === state.active) btn.className = "active"; // highlight the active one
        tabButtonsEl.append(btn);
    }
    // show ONLY the active tab's content
    tabContentEl.textContent = tabs[state.active].content;
}

// 4. CLICK — DELEGATION on the button row
tabButtonsEl.addEventListener("click", (e) => {
    let btn = e.target.closest("button");
    if (!btn) return;                           // clicked the gap, ignore
    state.active = Number(btn.dataset.index);   // dataset is a STRING → number
    render();
})

render()   // first paint
