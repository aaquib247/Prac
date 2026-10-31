# Task Table — follow-ups to layer

Build in this order (how a real interview adds requirements).

## Layers (already in app.js)
1. Fetch + render table + loading/error
2. Search (filter by title) + debounce
3. Sort (click header, toggle asc/desc) via delegation
4. Pagination (Prev/Next, page info, disabled at edges)

## The render() order — MEMORIZE
```
filter → sort → totalPage → (disabled buttons, slice, info) → draw rows
```
Derived values FIRST, consumers AFTER. (This bug bit 3x.)

## Likely follow-ups
1. **Multi-column sort indicator** — show ▲ / ▼ on the active column header.

2. **Rows per page selector** — a dropdown that sets `state.pageSize`
   (remember to reset `state.page = 0` when it changes).

3. **"No results" row** — when filtered length is 0, show a single row
   "No tasks found" instead of an empty tbody.

4. **Infinite scroll instead of pagination** (lazy loading)
   - `IntersectionObserver` on the last row → append next batch.

5. **Highlight / clear search** — a clear (✕) button that resets search.

6. **Debounce util** — extract a reusable `debounce(fn, delay)` helper.

## Rules that keep biting
- Never overwrite `state.tasks` with filtered data — keep the source whole,
  derive a fresh filtered copy each render.
- Reset `state.page = 0` whenever search changes (else blank page).
- `render` OWNS totalPage. Handlers only READ it.
- `>=` not `===` for `nextEl.disabled` (handles totalPage === 0).
