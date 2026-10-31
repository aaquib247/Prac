# Bar / Velocity Chart — follow-ups to layer

## Base (already in app.js)
- Render bars from a data array
- Each bar height = (value / max) * chartHeight  ← the one key idea
- Value label on top, category label below, hover tooltip (title attr)

## Core idea
- Find `max = Math.max(...values)`.
- Scale every bar relative to max → tallest fills the chart, rest are
  proportional. Height is a %/px of the chart height.
- Empty data → guard (show "No data", avoid divide-by-zero).

## Likely follow-ups
1. **Hover tooltip (custom)** — instead of the `title` attr, show a styled
   div following the mouse on `mouseover` / `mouseout`.

2. **Responsive resize** — recompute on `window.resize`, or use % heights so
   bars scale with the container.

3. **Y-axis gridlines / ticks** — draw a few horizontal lines at 0/25/50/…%
   of max; label them.

4. **Horizontal bars** — same idea, scale WIDTH instead of height.

5. **SVG instead of divs** — `<rect>` per bar; same height math. Mention you
   could use SVG/Canvas for many bars or crisp axes.

6. **Zero / negative / huge values** — handle gracefully (clamp, baseline).

## Rules
- The one formula: `height = (value / max) * chartHeight`.
- Guard empty data and `max === 0` before dividing.
- Bars sit on a baseline → container `display:flex; align-items:flex-end`.
