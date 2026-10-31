# Typeahead — follow-ups to layer

Build the base first, then add these one at a time (interview style).

## Base (already in app.js)
- Filter as you type
- Debounce (300ms)
- Dropdown of matches
- "No results" message
- Click a suggestion → fill input, close dropdown
- Keyboard nav: ArrowUp / ArrowDown / Enter

## Likely follow-ups
1. **Real API instead of hardcoded array**
   - Replace `countries` with `fetch`, or a fake promise API:
     ```js
     function fakeApi(q) {
       return new Promise(res => setTimeout(() => res([...matches]), 500));
     }
     ```
   - `getSugesstion` becomes `async`; `await fakeApi(search)`.

2. **Caching (Map)** — don't re-fetch the same query
   - `const cache = new Map()`
   - Before fetch: `if (cache.has(q)) { use cache.get(q); return; }`
   - After fetch: `cache.set(q, data)`

3. **Race conditions** — later-but-stale response overwriting a newer one
   - Request id counter: `const my = ++reqId; ... if (my !== reqId) return;`
   - (Only matters once there's a real async API.)

4. **Highlight matching text** — bold the typed part inside each match
   - Split the name on the query, wrap the match in `<strong>`.

5. **Close dropdown on outside click** — listener on `document`, if click is
   outside input + list → clear suggestions.

6. **Min characters** — don't search until `search.length >= 2`.

## The rule that keeps biting
- Keyboard events fire on the **input**, not the list.
- **Read before you destroy**: grab the selected value, THEN clear state.
- `state.suggestions` holds ONLY what's shown (filter before storing).
