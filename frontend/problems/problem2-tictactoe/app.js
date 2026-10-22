// TEMPLATE — same structure for every browser coding problem
// ============================================================
//
// STEP 1: STATE — what data drives the UI?
// const state = { ... };
//
// STEP 2: CACHE DOM — querySelector everything you'll touch
// const el = document.querySelector("#id");
//
// STEP 3: render() — draw the UI from state, called after every change
// function render() { ... }
//
// STEP 4: EVENTS — change state, then call render()
// el.addEventListener("click", () => { /* change state */ render(); });
//
// STEP 5: INIT — set initial state and do first render
// render();
// ============================================================

// STEP 1 — STATE
const state = {
    board: Array.from({ length: 3 }, () => Array(3).fill(null)),      // 3x3 grid
    currentPlayer: 'X',
    winner: null,
    count : 0
};

// STEP 2 — CACHE DOM
const statusEl = document.querySelector("#status")
const boardEl = document.querySelector("#board")
const resetBtn = document.querySelector("#reset-btn")


function render() {
    boardEl.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let div = document.createElement("div")
            div.textContent = state.board[i][j] ?? "";
            boardEl.append(div);
            div.dataset.row = i;
            div.dataset.col = j;

        }
    }
    statusEl.textContent = state.winner ? `Winner: ${state.winner}` : `Player ${state.currentPlayer}'s turn`;
}

function checkWinner(row, col, player) {
    // Check row
    let rowWin = true;
    for (let c = 0; c < 3; c++) {
        if (state.board[row][c] !== player) {
            rowWin = false;
            break;
        }
    }
    if (rowWin) return player;

    let colWin = true;
    for (let r = 0; r < 3; r++) {
        if (state.board[r][col] !== player) {
            colWin = false;
            break;
        }
    }
    if (colWin) return player;

    if (row === col) {
        let diag1 = true;
        for (let i = 0; i < 3; i++) {
            if (state.board[i][i] !== player) {
                diag1 = false;
                break;
            }
        }
        if (diag1) return player;
    }
    if (row + col === 2) {
        let diag2 = true;
        for (let i = 0; i < 3; i++) {
            if (state.board[i][2 - i] !== player) {
                diag2 = false;
                break;
            }
        }
        if (diag2) return player;
    }

    return null;
}


boardEl.addEventListener("click", (e) => {
    const cell = e.target.closest("div");
    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);


    if (state.board[row][col] || state.winner) return;
    state.board[row][col] = state.currentPlayer;
    state.count++;
    const winner = checkWinner(row, col, state.currentPlayer);
    if (winner) {
        state.winner = winner;
        render();
        return;
    }

    const isDraw = state.count === 9
    if (isDraw) {
        state.winner = "Draw";
        render();
        return;
    }


    state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';

    render();
});

resetBtn.addEventListener("click", () => {
    state.board = Array.from({ length: 3 }, () => Array(3).fill(null));
    state.currentPlayer = "X";
    state.winner = null;
    state.count = 0;
    render();
});


render()

// STEP 4 — EVENTS
// events attached to board and reset button are already defined above

// STEP 5 — INIT
// initialize the game state and render the board for the first time which is done by the render() call above