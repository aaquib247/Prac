# File Explorer — follow-ups to layer

## Base (already in app.js)
- Render nested tree (recursion)
- Expand / collapse a folder (toggle via Set)
- Click only folders (guard on dataset.type)
- Expand All / Collapse All

## Core concept
```
renderNode(node):
  - make an <li> for this node (name + icon)
  - if folder AND open AND has children:
      make a <ul>, recurse each child into it, append <ul> into the <li>
  - return the <li>
```
DOM shape: `ul > li > ul > li > ...`
- `li` = one item (file or folder)
- `ul` = the drawer of children, placed INSIDE a folder's li (auto-indents)

## Likely follow-ups
1. **Indentation by depth** — pass a `depth` param through recursion:
   ```js
   renderNode(node, depth) { liEl.style.paddingLeft = depth*20 + "px"; ...
       renderNode(child, depth + 1) }
   ```
   Start: `renderNode(data, 0)`.

2. **Add / delete a node** — mutate the nested tree
   - Needs a recursive "find node by name/id" then push/splice its children.
   - Hardest follow-up; tests tree mutation.

3. **File vs folder icons / click behavior** — clicking a file could show its
   name somewhere; clicking a folder toggles.

4. **Stop propagation** — if nested clicks bubble to parent folders, use
   `e.stopPropagation()` (with delegation you usually avoid this).

5. **Show counts** — "src (2)" showing number of children.

## Rules that keep biting
- Container in HTML must be `<ul>`, not `<li>` (li-inside-li is invalid).
- CREATE and ATTACH — every `renderNode(child)` must be appended somewhere.
- Variable naming: the created element is `liEl` everywhere (not `li`).
  (`li` only exists in the click handler — different function.)
- A Set tracks which folders are open (independent open/close per folder).
