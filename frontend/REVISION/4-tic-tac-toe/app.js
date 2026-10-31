// ============================================================
// TIC-TAC-TOE — canonical version to memorize
// ============================================================
// STATE drives everything; render() redraws the board from it.
// Win check is smart: after a move, only check the lines that
// pass THROUGH the played cell (its row, its col, and a diagonal
// only if the cell sits on one).
// ============================================================

// 1. STATE
const state = {
    grid: Array.from({ length: 3 }, () => Array(3).fill(null)),  // 3x3, all empty
    winner: null,       // null | 'X' | 'O' | 'Draw'
    currPlayer: 'X'
}

const boardEl = document.querySelector("#board")
const resetEl = document.querySelector("#reset")
const statusEl = document.querySelector("#status")

// 3. RENDER — draw 9 cells + status line from state
function render() {
    boardEl.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let div = document.createElement("div")
            div.textContent = state.grid[i][j] ?? ""   // null → empty cell
            div.dataset.row = i;                        // store coords for the click handler
            div.dataset.col = j;
            boardEl.append(div)
        }
    }
    statusEl.innerHTML = state.winner
        ? `Winner: ${state.winner}`
        : `Player ${state.currPlayer}'s turn`;
}

// only checks the 4 lines through (row,col) — not all 8 lines
function isWinner(row, col, player) {
    // the played row
    let rowWin = true;
    for (let c = 0; c < 3; c++) {
        if (state.grid[row][c] !== player) { rowWin = false; break; }
    }
    if (rowWin) return true;

    // the played column
    let colWin = true;
    for (let r = 0; r < 3; r++) {
        if (state.grid[r][col] !== player) { colWin = false; break; }
    }
    if (colWin) return true;

    // main diagonal — only if the cell is on it (row === col)
    if (row === col) {
        let diagWin = true;
        for (let i = 0; i < 3; i++) {
            if (state.grid[i][i] !== player) { diagWin = false; break; }
        }
        if (diagWin) return true;
    }

    // anti-diagonal — only if the cell is on it (row + col === 2)
    if (row + col === 2) {
        let antiDiagWin = true;
        for (let i = 0; i < 3; i++) {
            if (state.grid[i][2 - i] !== player) { antiDiagWin = false; break; }
        }
        if (antiDiagWin) return true;
    }

    return false;
}

// 4. EVENTS — one delegated listener on the board
boardEl.addEventListener("click", (e) => {
    let cell = e.target.closest("div")
    if (!cell) return;

    let row = Number(cell.dataset.row);   // dataset is a string → convert to number
    let col = Number(cell.dataset.col);

    // ignore clicks on a filled cell, or after the game is over
    if (state.grid[row][col] || state.winner) return;
    state.grid[row][col] = state.currPlayer;   // place the mark

    // check win BEFORE switching player
    if (isWinner(row, col, state.currPlayer)) {
        state.winner = state.currPlayer
        render()
        return;
    }

    // board full with no winner → draw
    const isBoardFull = state.grid.every(r => r.every(v => v !== null))
    if (isBoardFull) {
        state.winner = "Draw"
        render()
        return;
    }

    // otherwise switch turns
    state.currPlayer = state.currPlayer === 'X' ? 'O' : 'X'
    render()
})

// reset → fresh grid, back to X, clear winner
resetEl.addEventListener("click", () => {
    state.grid = Array.from({ length: 3 }, () => Array(3).fill(null));
    state.winner = null;
    state.currPlayer = 'X';
    render()
})

render()   // first paint
