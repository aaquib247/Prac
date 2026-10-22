const files = [
    {
        id: "src", name: "src", type: "folder",
        children: [
            { id: "app", name: "App.js", type: "file" },
            {
                id: "components", name: "components", type: "folder",
                children: [
                    { id: "button", name: "Button.js", type: "file" },
                    { id: "input", name: "Input.js", type: "file" }
                ]
            }
        ]
    },
    {
        id: "public", name: "public", type: "folder",
        children: [
            { id: "index", name: "index.html", type: "file" }
        ]
    },
    { id: "pkg", name: "package.json", type: "file" }
];

const state = {
    extendedSet: new Set(),
    search: ""
}
let debounceTimer;

const treeEl = document.querySelector("#tree")
const expandEl = document.querySelector("#expand-all")
const collapseEl = document.querySelector("#collapse-all")
const search = document.querySelector("#search")

function render() {
    if (state.search) {
        expandAll(files);
    }
    treeEl.innerHTML = "";
    for (let node of files) {
        const el = renderNode(node)
        if (el) treeEl.append(el)
    }
}

function renderNode(node) {
    if (state.search && node.type === "file" && !node.name.toLowerCase().includes(state.search.toLowerCase())) {
        return null;
    }


    const wrapper = document.createElement("div");
    wrapper.style.marginLeft = "20px";


    if (node.type === "file") {
        wrapper.textContent = node.name;
    } else if (node.type === "folder") {
        let isOpen = state.extendedSet.has(node.id)
        const button = document.createElement("button");
        button.textContent = (isOpen ? "📂" : "📁") + node.name
        button.style.background = "none";
        button.style.cursor = "pointer"
        button.style.fontSize = "20px";
        button.style.margin = "4px"

        button.addEventListener("click", () => {
            if (state.extendedSet.has(node.id)) {
                state.extendedSet.delete(node.id)
            } else {
                state.extendedSet.add(node.id)
            }
            render()
        });

        wrapper.append(button)

        if (isOpen) {
            for (let child of node.children) {
                const el = renderNode(child);
                if (el) wrapper.append(el);  // ← only append if not null
            }
        }

    }

    return wrapper;
}

function expandAll(nodes) {
    for (let node of nodes) {
        if (node.type === "folder") {
            state.extendedSet.add(node.id)
            expandAll(node.children)
        }
    }
}

function collapseAll() {
    state.extendedSet.clear()
}

expandEl.addEventListener("click", () => {
    expandAll(files);
    render()
});

collapseEl.addEventListener("click", () => {
    collapseAll();
    render()
});

search.addEventListener("input", (e) => {
    state.search = e.target.value;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        render();
    }, 3000);
});


render()