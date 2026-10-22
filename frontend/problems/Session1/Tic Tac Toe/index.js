const size = 4;

// State
const state = {
    grid: Array.from({ length: size }, () => Array(size).fill(null)),
    winner: null,
    currentPlayer: 'X',
    move : 0
}

// DOM Cache

const statusEl = document.querySelector("#status")
const boardEl = document.querySelector("#board")
const resetBtn = document.querySelector("#reset-btn")

function render() {
    boardEl.innerHTML = "";
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          let div = document.createElement("div")
          div.textContent = state.grid[i][j] ??  "";
          boardEl.append(div)
          div.dataset.row = i;
          div.dataset.col = j;
        }
    }
    statusEl.textContent = state.winner ? `Winner is ${state.winner}` : `Player ${state.currentPlayer} turn`;
    statusEl.style.marginLeft = "20px";
    resetBtn.style.marginLeft = "20px";
}

function Winner(r,c,player){
    let row= true;
    for(let col=0;col<size;col++){
        if(state.grid[r][col] !== player){
            row = false;
            break;
        }
    }
    if(row) return true;

    let col= true;
    for(let row=0;row<size;row++){
        if(state.grid[row][c] !== player){
            col = false;
            break;
        }
    }
    if(col) return true;

    if(r === c){
        let diag = true;
        for(let i=0;i<size;i++){
            if(state.grid[i][i] !== player){
                diag = false;
                break;
            }
        }
        if(diag) return true;
    }

    if(r+c === size-1){
        let antiDiag = true;
        for(let i=0;i<size;i++){
            if(state.grid[i][size-1-i] !== player){
               antiDiag = false;
               break;
            }
        }
        if(antiDiag) return true;   
    }

    return false;


}

boardEl.addEventListener("click", (e) => {
   let cell = e.target.closest("div")
   let row = Number(cell.dataset.row)
   let col = Number(cell.dataset.col)

   if(state.grid[row][col] || state.winner) return;
   state.grid[row][col] = state.currentPlayer;
   state.move++;

   if(Winner(row,col,state.currentPlayer)){
      state.winner = state.currentPlayer;
      render();
      return;
   }
 
   if(state.move === size * size){
    state.winner = "Draw"
    render()
    return;
   }

   state.currentPlayer = state.currentPlayer === 'X' ? 'O':'X';
   render();

})

resetBtn.addEventListener("click",()=>{
    state.grid = Array.from({ length: size }, () => Array(size).fill(null)),
    state.winner = null,
    state.currentPlayer ='X',
    state.move = 0;
    render()
})


render();