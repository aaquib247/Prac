# Cookie Consent Banner — follow-ups to layer

## Base (already in app.js)
- Show banner only on FIRST visit (localStorage remembers the choice)
- Accept / Reject → save choice, hide banner
- On reload, if a choice exists → stay hidden

## Core idea
- `localStorage.setItem(key, value)` / `localStorage.getItem(key)` persist
  across reloads. Store the decision; check it on load.
- Toggle visibility with a `.hidden { display: none }` class, not by
  rebuilding DOM.

## Likely follow-ups
1. **Customize categories** — Necessary / Analytics / Marketing checkboxes;
   store an object `{ analytics: true, marketing: false }` as JSON:
   `localStorage.setItem(key, JSON.stringify(prefs))`.

2. **Accessibility / focus management** (often asked)
   - Give the banner `role="dialog"` + `aria-label`.
   - Move focus to the banner when it appears; return focus afterward.
   - Make it keyboard-operable (Tab to buttons, Enter to activate).

3. **What if storage is disabled?** (private mode / blocked)
   - `localStorage` can throw. Wrap in try/catch; fall back to an in-memory
     variable (banner reappears next load, but the page doesn't crash).

4. **Expire the consent** — store a timestamp; re-ask after N months.

## Rules
- Persist decisions in localStorage; read on load to decide UI.
- Hide/show via a CSS class, not by destroying/recreating elements.
- Always guard localStorage with try/catch (it can throw when disabled).
