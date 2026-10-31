// ============================================================
// FILE EXPLORER (tree) — canonical version to memorize
// ============================================================
// NEW CONCEPT: RECURSION. A folder holds folders holds files, to
// any depth. renderNode() handles ONE node; if that node is an
// open folder, it calls itself on each child.
//
// TREE STRUCTURE in the DOM:  ul > li > ul > li > ...
//   li  = one item (file OR folder) — shows the name
//   ul  = the "drawer" of children, placed INSIDE a folder's li
//         (ul auto-indents, so hierarchy is free)
// ============================================================

// nested data. folders have children[]; files don't.
const data = {
    name: "root",
    type: "folder",
    children: [
        {
            name: "src",
            type: "folder",
            children: [
                { name: "index.js", type: "file" },
                { name: "app.js", type: "file" }
            ]
        },
        { name: "readme.md", type: "file" }
    ]
};

// STATE — a Set of folder names that are currently OPEN.
// (a Set lets each folder be open/closed independently)
const state = {
    isExpanded: new Set()
}

const listEl = document.querySelector("#list")
const explandEl = document.querySelector("#expand")
const collapseEl = document.querySelector("#collapse")

// top-level render: pass the root node to renderNode, attach result
function render() {
    listEl.innerHTML = ""
    listEl.append(renderNode(data));
}

// handles ONE node; recurses on children if it's an open folder
function renderNode(node) {
    let liEl = document.createElement("li")

    if (node.type === 'file') {
        liEl.textContent = '🗂️' + node.name;
        liEl.dataset.name = node.name;
        liEl.dataset.type = node.type   // store type so click can tell file vs folder
    } else if (node.type === 'folder') {
        let isOpen = state.isExpanded.has(node.name);
        liEl.textContent = (isOpen ? '📂' : '📁') + node.name;
        liEl.dataset.name = node.name;
        liEl.dataset.type = node.type

        // only draw children when the folder is OPEN
        if (isOpen && node.children) {
            let ulEl = document.createElement("ul");   // the drawer
            for (let child of node.children) {
                ulEl.append(renderNode(child));         // RECURSION: each child
            }
            liEl.append(ulEl);                          // drawer goes inside this folder's li
        }
    }

    return liEl;   // caller attaches it
}

// click → DELEGATION, only folders toggle (guard on dataset.type)
listEl.addEventListener("click", (e) => {
    let li = e.target.closest("li");
    if (!li || li.dataset.type !== "folder") return;
    let name = li.dataset.name;

    // TOGGLE: open if closed, close if open
    if (state.isExpanded.has(name)) {
        state.isExpanded.delete(name);
    } else {
        state.isExpanded.add(name);
    }
    render();
})

// collapse all → just empty the Set
collapseEl.addEventListener("click", () => {
    state.isExpanded.clear()
    render()
})

// expand all → walk the WHOLE tree (recursion again), add every folder name
function expand(node) {
    if (node.type === 'folder') {
        state.isExpanded.add(node.name)
        for (let child of node.children)
            expand(child)
    }
}

explandEl.addEventListener("click", () => {
    expand(data)
    render()
})

render()   // first paint
