// 🎲 Dice (supports multiple dice)
class Dice {
  constructor(count = 1) {
    this.count = count;
  }

  roll() {
    let total = 0;
    for (let i = 0; i < this.count; i++) {
      total += Math.floor(Math.random() * 6) + 1;
    }
    return total;
  }
}

// 🐍 or 🪜 Jump (snake or ladder)
class Jump {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

// 📦 Cell on board
class Cell {
  constructor() {
    this.jump = null;
  }

  setJump(jump) {
    this.jump = jump;
  }
}

// 🧍 Player
class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.position = 0;
  }
}

// 🧩 Board
class Board {
  constructor(size) {
    this.size = size;
    this.cells = Array(size + 1).fill(null).map(() => new Cell());
  }

  addJump(start, end) {
    this.cells[start].setJump(new Jump(start, end));
  }

  getCell(position) {
    return this.cells[position];
  }
}

// 🎮 Game Controller
class Game {
  constructor(boardSize, diceCount = 1) {
    this.board = new Board(boardSize);
    this.players = [];
    this.turnQueue = [];
    this.dice = new Dice(diceCount);
    this.isGameOver = false;
    this.winner = null;
  }

  // Add players
  addPlayer(name) {
    const player = new Player(this.players.length + 1, name);
    this.players.push(player);
    this.turnQueue.push(player);
  }

  // Add a snake or ladder
  addJump(start, end) {
    this.board.addJump(start, end);
  }

  // Reset game
  reset() {
    this.players.forEach(p => p.position = 0);
    this.turnQueue = [...this.players];
    this.isGameOver = false;
    this.winner = null;
  }

  // Play one turn
  playTurn() {
    if (this.isGameOver) {
      console.log("Game is already over.");
      return;
    }

    const currentPlayer = this.turnQueue.shift();
    const roll = this.dice.roll();
    let newPos = currentPlayer.position + roll;

    if (newPos > this.board.size) newPos = currentPlayer.position; // No move

    // Check for snake or ladder
    const cell = this.board.getCell(newPos);
    if (cell.jump) {
      console.log(`${currentPlayer.name} hit a ${cell.jump.end < cell.jump.start ? "🐍 Snake" : "🪜 Ladder"}!`);
      newPos = cell.jump.end;
    }

    currentPlayer.position = newPos;
    console.log(`${currentPlayer.name} rolled ${roll} → moved to ${newPos}`);

    if (newPos === this.board.size) {
      this.isGameOver = true;
      this.winner = currentPlayer;
      console.log(`🏆 ${currentPlayer.name} wins!`);
    } else {
      this.turnQueue.push(currentPlayer);
    }
  }
}


// Setup game
const game = new Game(30, 2); // 30 cells, 2 dice
game.addPlayer("Alice");
game.addPlayer("Bob");

// Add snakes and ladders
game.addJump(14, 4);   // Snake
game.addJump(9, 25);   // Ladder
game.addJump(18, 11);  // Snake
game.addJump(3, 22);   // Ladder

// Run game till someone wins
while (!game.isGameOver) {
  game.playTurn();
}
