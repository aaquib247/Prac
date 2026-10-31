# Feature Toggle — follow-ups to layer

## Base (already in app.js)
- Render features with ON/OFF buttons
- Click toggle → flip `enabled` → re-render (green when on)

## Likely follow-ups
1. **Fetch flags from an API** (loading / error / default)
   - `initLoad()`: set "Loading...", try `fetch`, store flags, render;
     catch → error message. Wrap the FETCH, not render.
   - If the API fails, fall back to sensible defaults (all off).

2. **Search / filter features** — add `state.search`, filter IN render.
   - TRAP: once filtered, the loop index ≠ the real index. Store the REAL
     index instead:  `row.dataset.index = state.features.indexOf(f)`
     — or give each feature a unique `id` and act by id.

3. **Persist (localStorage)** — save on every toggle, load on start:
   ```js
   localStorage.setItem("features", JSON.stringify(state.features));
   const saved = localStorage.getItem("features");
   if (saved) state.features = JSON.parse(saved);
   ```

4. **Add a new feature** — input + button → push `{ name, enabled: false }`.

5. **Refresh flags without page reload** — re-fetch and re-render.

6. **Percentage rollout / per-user flags** — flag has a `rollout` %, decide
   enabled based on a user bucket (talk through, rarely coded).

## Rules
- The features array IS the source — flip booleans in place, don't rebuild it.
- Filter in render (full list stays in state), and mind the index trap.
- `dataset.index` is a STRING → `Number(...)`.
