# Tabs — follow-ups to layer

## Base (already in app.js)
- Render tab buttons + active tab content
- Click a tab → it becomes active, content switches, button highlights
- State = one index (`state.active`)

## Core pattern
state (active index) → render (buttons + content) → delegated click
updates index → render. Same skeleton as everything else.

## Likely follow-ups
1. **Keyboard navigation** (reuse the typeahead skill)
   - ArrowRight / ArrowLeft move the active tab; clamp with Math.min/Math.max.
   - Listen on the button container; move `state.active` and render.

2. **Tabs with URL state** — active tab synced to the URL hash
   - On click: `location.hash = tabs[i].label` (or an id).
   - On load + on `hashchange`: read `location.hash`, set `state.active`.
   - Deep link (open with #profile) and the Back button both work.
   - Invalid hash → fall back to tab 0.

3. **Lazy content** — only build/fetch a tab's content the first time it's
   opened; cache it after (a Set of "already loaded" indices).

4. **ARIA roles** (accessibility — often asked)
   - `role="tablist"` on the container, `role="tab"` + `aria-selected` on each
     button, `role="tabpanel"` on the content.

## Rule
- Click events → delegation on the parent + `closest("button")` + null guard.
- `dataset.index` is a STRING → `Number(...)` before using as the active index.
