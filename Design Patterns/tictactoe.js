// 1. Enums & Pieces
const PieceType = { X: 'X', O: 'O', EMPTY: ' ' };

class Piece {
  constructor(type) { this.type = type; }
}
class XPiece extends Piece { constructor() { super(PieceType.X); } }
class OPiece extends Piece { constructor() { super(PieceType.O); } }

// 2. Player
class Player {
  constructor(name, piece) {
    this.name = name;
    this.piece = piece;
  }
}

// 3. Board
class Board {
  constructor(size = 3) {
    this.size = size;
    this.grid = Array.from({ length: size }, () => Array.from({ length: size }, () => new Piece(PieceType.EMPTY)));
  }

  makeMove(r, c, piece) {
    if (this.grid[r][c].type !== PieceType.EMPTY) return false;
    this.grid[r][c] = piece;
    return true;
  }

  isFull() {
    return this.grid.every(row => row.every(cell => cell.type !== PieceType.EMPTY));
  }

  print() {
    console.log('\nBoard:');
    this.grid.forEach(row => console.log(row.map(c => c.type).join(' | ')));
  }
}

// 4. Win Strategy
class SimpleWinChecker {
  static check(board, symbol) {
    const g = board.grid, N = board.size;
    for (let i = 0; i < N; i++) {
      if (g[i].every(c => c.type === symbol)) return true;
      if (g.map(r => r[i]).every(c => c.type === symbol)) return true;
    }
    if (g.every((r, i) => r[i].type === symbol)) return true;
    if (g.every((r, i) => r[N - 1 - i].type === symbol)) return true;
    return false;
  }
}

// 5. Game
class Game {
  constructor(p1, p2, boardSize = 3) {
    this.players = [p1, p2];
    this.current = 0;
    this.board = new Board(boardSize);
  }

  play(r, c) {
    const player = this.players[this.current];
    if (!this.board.makeMove(r, c, player.piece)) return 'Invalid!';
    this.board.print();

    if (SimpleWinChecker.check(this.board, player.piece.type)) return `${player.name} wins!`;
    if (this.board.isFull()) return 'Draw!';
    this.current = 1 - this.current;
    return `Next: ${this.players[this.current].name}`;
  }
}

const g = new Game(
  new Player("Alice", new XPiece()),
  new Player("Bob", new OPiece())
);

console.log(g.play(0, 0)); // Alice
console.log(g.play(1, 1)); // Bob
console.log(g.play(0, 1)); // Alice
console.log(g.play(2, 2)); // Bob
console.log(g.play(0, 2)); // Alice wins!
