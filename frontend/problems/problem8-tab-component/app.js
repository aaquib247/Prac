const tabs = [
    { label: "Home", content: "Welcome to the Home tab." },
    { label: "Profile", content: "This is your Profile." },
    { label: "Settings", content: "Manage your Settings here." }
]

const state = { activeTab: 0 }

const tabButtonsEl = document.querySelector("#tab-buttons");
const tabContentEl = document.querySelector("#tab-content");

// BASIC — render tab buttons and active content
function render() {
    tabButtonsEl.innerHTML = "";

    for (let i = 0; i < tabs.length; i++) {
        const btn = document.createElement("button");
        btn.textContent = tabs[i].label;
        btn.dataset.index = i;
        if (i === state.activeTab) btn.className = "active"; // highlight active tab
        tabButtonsEl.append(btn);
    }

    // show only the active tab's content
    tabContentEl.textContent = tabs[state.activeTab].content;
}

// BASIC — click tab to switch
tabButtonsEl.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    state.activeTab = Number(btn.dataset.index);
    render();
});

render();
