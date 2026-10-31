# Tic-Tac-Toe — follow-ups to layer

## Base (already in app.js)
- 3x3 board, two players alternate
- Click empty cell → place mark; filled cell / game over → ignored
- Win detection (row / col / both diagonals)
- Draw detection
- Reset

## Win check — the smart bit
After a move at (row, col), only check the lines THROUGH that cell:
- its row, its column
- main diagonal only if `row === col`
- anti-diagonal only if `row + col === 2`
(No need to scan all 8 lines every move.)

## Likely follow-ups
1. **Highlight the winning line** — return WHICH cells won, add a CSS class
   to those three cells.

2. **Score tracking** — keep X wins / O wins / draws across rounds in state.

3. **N x N board + K in a row** — generalize from hardcoded 3. Board size and
   win length become variables; win check loops K cells in each direction.

4. **Undo last move** — keep a history stack of moves, pop to undo.

5. **Disable board after win** — already handled (guard on `state.winner`),
   but show it visually (grey out).

## Rules that keep biting
- `dataset` values are STRINGS — `Number(cell.dataset.row)` before indexing.
- Check win BEFORE switching player.
- Check draw only AFTER the win check.
- Reset must clear grid + winner + currPlayer, then render.
