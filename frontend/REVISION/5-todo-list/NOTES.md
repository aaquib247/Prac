# Todo List (CRUD) — follow-ups to layer

## Base (already in app.js)
- Add (Create), render (Read), toggle done (Update), delete (Delete)
- Unique `id` per todo; act by id, not text
- One delegated listener handles delete (button) vs toggle (text)

## Core lessons
- Button action → read `inputEl.value` in the handler (no input listener).
  Input listener is only for live search / typeahead.
- NEVER build DOM in a handler. Handler updates STATE → render() draws it.
- `createElement` = make new; `querySelector` = find existing.
- `todo.text` (dot) = the text property; `todo[text]` = property named by a
  variable (usually a bug).
- Act by unique `id`, not text — duplicate texts would both match.

## Likely follow-ups
1. **Enter key to add** — `inputEl.addEventListener("keydown", e => { if (e.key === "Enter") addTodo() })`.

2. **Edit a todo** — double-click text → turn into an input → save on blur/Enter.

3. **Filter: All / Active / Completed** — add `state.filter`, filter in render
   (full list stays in state). Watch the filtered-index trap → that's why we
   use `id`, not loop index.

4. **Clear completed** — one button: `state.todos = state.todos.filter(t => !t.done)`.

5. **Count remaining** — "3 items left" = `state.todos.filter(t => !t.done).length`.

6. **Persist (localStorage)** — save on every change, load on start:
   ```js
   localStorage.setItem("todos", JSON.stringify(state.todos));
   state.todos = JSON.parse(localStorage.getItem("todos") || "[]");
   ```

7. **Reorder (drag and drop)** — harder; shares the Kanban DnD pattern.

## Security note (interviewers ask)
- Use `textContent`, NOT `innerHTML`, for user-typed text — else a todo like
  `<img onerror=...>` could run as HTML (XSS). We use textContent here.
