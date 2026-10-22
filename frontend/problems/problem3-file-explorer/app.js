// FILE EXPLORER — simplest acceptable version
// =============================================

// DATA
const files = [
  {
    id: "src", name: "src", type: "folder",
    children: [
      { id: "app", name: "App.js", type: "file" },
      {
        id: "components", name: "components", type: "folder",
        children: [
          { id: "button", name: "Button.js", type: "file" },
          { id: "input",  name: "Input.js",  type: "file" }
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

// STATE — which folders are open
const state = {
  expandedIds: new Set()
};

// DOM
const treeEl = document.querySelector("#tree");

// RENDER
function render() {
  treeEl.innerHTML = "";
  for (const node of files) {
    treeEl.append(renderNode(node));
  }
}

function renderNode(node) {
  const wrapper = document.createElement("div");
  wrapper.style.marginLeft = "20px";


  if (node.type === "file") {
    // base case
    wrapper.textContent = "📄 " + node.name;
    
 
  } else if (node.type === "folder") {
    // folder
    const isOpen = state.expandedIds.has(node.id);

    const btn = document.createElement("button");
    btn.textContent = (isOpen ? "📂 " : "📁 ") + node.name;
    btn.style.background = "none";
    btn.style.border = "none";
    btn.style.cursor = "pointer";
    btn.style.fontSize = "1rem";
    

    btn.addEventListener("click", () => {
      if (state.expandedIds.has(node.id)) {
        state.expandedIds.delete(node.id);
      } else {
        state.expandedIds.add(node.id);
      }
      render();
    });

    wrapper.append(btn);

    // render children only if open
    if (isOpen) {
      for (const child of node.children) {
        wrapper.append(renderNode(child)); // recursion
      }
    }
  }

  return wrapper;
}
// INIT
render();
