// ── PIECE (enum, not a class hierarchy) ──
const Piece = Object.freeze({ X: 'X', O: 'O', EMPTY: '-' });

// ── PLAYER ──
class Player {
  constructor(name, piece) {
    this.name = name;
    this.piece = piece;
  }
}

// ── BOARD ──
class Board {
  constructor(size) {
    this.size = size;
    this.grid = Array.from({ length: size }, () => Array(size).fill(Piece.EMPTY));
    this.movesCount = 0;
  }

  placeMark(row, col, piece) {
    if (row < 0 || row >= this.size || col < 0 || col >= this.size) return false;
    if (this.grid[row][col] !== Piece.EMPTY) return false;
    this.grid[row][col] = piece;
    this.movesCount++;
    return true;
  }

  checkWin(row, col, piece) {
    const n = this.size;

    let rowWin = true;
    for (let c = 0; c < n; c++) if (this.grid[row][c] !== piece) { rowWin = false; break; }
    if (rowWin) return true;

    let colWin = true;
    for (let r = 0; r < n; r++) if (this.grid[r][col] !== piece) { colWin = false; break; }
    if (colWin) return true;

    if (row === col) {
      let diagWin = true;
      for (let i = 0; i < n; i++) if (this.grid[i][i] !== piece) { diagWin = false; break; }
      if (diagWin) return true;
    }

    if (row + col === n - 1) {
      let antiWin = true;
      for (let i = 0; i < n; i++) if (this.grid[i][n - 1 - i] !== piece) { antiWin = false; break; }
      if (antiWin) return true;
    }

    return false;
  }

  isFull() {
    return this.movesCount === this.size * this.size;
  }

  print() {
    this.grid.forEach(row => console.log(row.join(' | ')));
    console.log('');
  }
}

// ── GAME (the referee) ──
class Game {
  constructor(players, board) {
    this.players = players;
    this.board = board;
    this.turn = 0;
  }

  playMove(row, col) {
    const player = this.players[this.turn];

    if (!this.board.placeMark(row, col, player.piece)) {
      console.log('Invalid move, try again.');
      return;                                  // ??? #1: don't switch turns
    }

    this.board.print();

    if (this.board.checkWin(row, col, player.piece)) {
      console.log(`${player.name} (${player.piece}) WINS!`);   // ??? #2
      return;
    }

    if (this.board.isFull()) {
      console.log('DRAW!');                     // ??? #3
      return;
    }

    this.turn = (this.turn + 1) % this.players.length;   // switch turn
  }
}

// ── TEST (bottom-up wiring) ──
const board = new Board(3);
const players = [new Player('Alice', Piece.X), new Player('Bob', Piece.O)];
const game = new Game(players, board);

game.playMove(0, 0); // Alice
game.playMove(1, 0); // Bob
game.playMove(0, 1); // Alice
game.playMove(1, 1); // Bob
game.playMove(0, 2); // Alice → wins top row


// ┌─────────────────────────────────────┐
// │              Piece  «enum»           │
// │  X = 'X'                             │
// │  O = 'O'                             │
// │  EMPTY = '-'                         │
// └─────────────────────────────────────┘
//               ▲
//               │ uses
//               │
// ┌─────────────────────────┐         ┌──────────────────────────────────┐
// │         Player          │         │             Board                │
// │─────────────────────────│         │──────────────────────────────────│
// │ name                    │         │ size                             │
// │ piece : Piece           │         │ grid : Piece[][]                 │
// │─────────────────────────│         │ movesCount                       │
// │ (just holds data)       │         │──────────────────────────────────│
// └─────────────────────────┘         │ placeMark(row,col,piece): bool   │
//               ▲                      │ checkWin(row,col,piece) : bool   │
//               │                      │ isFull() : bool                  │
//               │ has many             │ print()                          │
//               │                      └──────────────────────────────────┘
//               │                                     ▲
//               │                                     │ has one
// ┌─────────────┴───────────────────────────────────┴──────────┐
// │                          Game   (referee)                    │
// │──────────────────────────────────────────────────────────────│
// │ players : Player[]                                            │
// │ board   : Board                                               │
// │ turn    : number                                              │
// │──────────────────────────────────────────────────────────────│
// │ playMove(row, col)                                            │
// │   1. place mark  → if fail, don't switch turn                 │
// │   2. check win   → announce winner, stop                      │
// │   3. check full  → draw, stop                                 │
// │   4. else        → switch turn                                │
// └──────────────────────────────────────────────────────────────┘

// Game ──has many──> Player      (the two competitors)
// Game ──has one───> Board       (the grid it referees)
// Player ──uses────> Piece       (X or O)
// Board ──filled with──> Piece   (each cell is a Piece)


// Class	Job	One-liner
// Piece	the marks	"just values, X / O / empty"
// Player	who's playing	"holds name + which piece"
// Board	owns the grid	"places marks, knows who won" — data + logic on data
// Game	the referee	"runs turns, decides what happens next" — orchestration
