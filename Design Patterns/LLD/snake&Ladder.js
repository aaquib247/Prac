class Dice {
  roll() {
    throw new Error('roll() must be implemented');
  }
}

class NormalDice extends Dice {
  roll() {
    return Math.floor(Math.random() * 6) + 1;
  }
}

class SpecialDice extends Dice {
  roll() {
    return 6;
  }
}

class Player {
  #name;
  #pos;

  constructor(name) {
    this.#name = name;
    this.#pos = 0;
  }

  getName()        { return this.#name; }
  getPosition()    { return this.#pos; }
  setPosition(pos) { this.#pos = pos; }
}

class Snake {
  constructor(head, tail) {
    this.head = head;
    this.tail = tail;
  }
}

class Ladder {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

class Board {
  constructor() {
    this.snakes = new Map();
    this.ladders = new Map();
  }

  static getInstance() {
    if (!Board.instance) {
      Board.instance = new Board();
    }
    return Board.instance;
  }

  addSnake(snake) {
    this.snakes.set(snake.head, snake.tail);
  }

  addLadder(ladder) {
    this.ladders.set(ladder.start, ladder.end);
  }

  getNewPosition(position) {
    if (this.snakes.has(position)) {
      console.log(`Snake! ${position} → ${this.snakes.get(position)}`);
      return this.snakes.get(position);
    }
    if (this.ladders.has(position)) {
      console.log(`Ladder! ${position} → ${this.ladders.get(position)}`);
      return this.ladders.get(position);
    }
    return position;
  }
}

class Game {
  constructor(board, dice) {
    this.board = board;
    this.dice = dice;
    this.players = [];
    this.currentPlayerIndex = 0;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  start() {
    console.log('Game Started!');
    while (true) {
      this.takeTurn();
      const currentPlayer = this.players[this.currentPlayerIndex];
      if (this.isWinner(currentPlayer)) {
        console.log(`${currentPlayer.getName()} WINS!`);
        break;
      }
      this.currentPlayerIndex =
        (this.currentPlayerIndex + 1) % this.players.length;
    }
  }

  takeTurn() {
    const player = this.players[this.currentPlayerIndex];
    const diceValue = this.dice.roll();
    let newPos = player.getPosition() + diceValue;

    console.log(`${player.getName()} rolled ${diceValue} | ${player.getPosition()} → ${newPos}`);

    if (newPos > 100) {
      console.log(`Overshoot! ${player.getName()} stays at ${player.getPosition()}`);
      return;
    }

    newPos = this.board.getNewPosition(newPos);
    player.setPosition(newPos);
    console.log(`${player.getName()} is now at ${newPos}`);
  }

  isWinner(player) {
    return player.getPosition() === 100;
  }
}

// ── TEST ──
const board = Board.getInstance();

board.addSnake(new Snake(45, 10));
board.addSnake(new Snake(80, 30));
board.addSnake(new Snake(99, 50));

board.addLadder(new Ladder(5, 25));
board.addLadder(new Ladder(40, 70));
board.addLadder(new Ladder(60, 90));

const game = new Game(board, new NormalDice());
game.addPlayer(new Player('Alice'));
game.addPlayer(new Player('Bob'));

game.start();


// ┌─────────────────┐
// │      Dice       │ ← Strategy Pattern
// │─────────────────│
// │ roll()          │
// └─────────────────┘
//        ▲
//   ┌────┴────┐
//   ▼          ▼
// NormalDice  LoadedDice


// ┌─────────────────┐
// │     Player      │
// │─────────────────│
// │ name            │
// │ position        │
// │─────────────────│
// │ move(steps)     │
// └─────────────────┘

// ┌─────────────────┐
// │     Snake       │
// │─────────────────│
// │ head            │
// │ tail            │
// └─────────────────┘

// ┌─────────────────┐
// │     Ladder      │
// │─────────────────│
// │ start           │
// │ end             │
// └─────────────────┘

// ┌──────────────────────┐
// │        Board         │ ← Singleton
// │──────────────────────│
// │ snakes Map           │ ◄── head → tail
// │ ladders Map          │ ◄── start → end
// │──────────────────────│
// │ getNewPosition(pos)  │ ← checks snake/ladder
// └──────────────────────┘

// ┌──────────────────────┐
// │        Game          │
// │──────────────────────│
// │ board                │ ◄── HAS-A Board
// │ players[]            │ ◄── HAS-A Players
// │ dice                 │ ◄── HAS-A Dice
// │ currentPlayerIndex   │
// │──────────────────────│
// │ start()              │
// │ takeTurn()           │
// │ checkWin()           │
// └──────────────────────┘


// Key Logic — getNewPosition(position)

// Player rolls dice → newPosition = current + diceValue

// if newPosition > 100 → stay (no move)

// if newPosition is a snake HEAD → go to snake TAIL (down)
// if newPosition is a ladder START → go to ladder END (up)
// else → stay at newPosition