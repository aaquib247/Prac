class Player {
    constructor(public name: string, public position: number = 0) {}
  }

  class Dice {
    roll(): number {
      return Math.floor(Math.random() * 6) + 1;
    }
  }

  class Snake {
    constructor(public head: number, public tail: number) {}
  }

  class Ladder {
    constructor(public start: number, public end: number) {}
  }

  class SnakeAndLadderGame {
    private players: Player[];
    private snakes: Snake[];
    private ladders: Ladder[];
    private dice: Dice;
    private boardSize: number;
  
    constructor(players: Player[], snakes: Snake[], ladders: Ladder[], boardSize: number = 100) {
      this.players = players;
      this.snakes = snakes;
      this.ladders = ladders;
      this.dice = new Dice();
      this.boardSize = boardSize;
    }
  
    startGame(): void {
      let winnerFound = false;
  
      while (!winnerFound) {
        for (const player of this.players) {
          const roll = this.dice.roll();
          console.log(`${player.name} rolled a ${roll}`);
          let newPos = player.position + roll;
  
          if (newPos > this.boardSize) {
            console.log(`${player.name} rolled too high. Stay at ${player.position}`);
            continue;
          }
  
          newPos = this.checkForSnakeOrLadder(newPos);
  
          player.position = newPos;
          console.log(`${player.name} moved to ${player.position}`);
  
          if (player.position === this.boardSize) {
            console.log(`🎉 ${player.name} wins!`);
            winnerFound = true;
            break;
          }
        }
      }
    }
  
    private checkForSnakeOrLadder(position: number): number {
      for (const snake of this.snakes) {
        if (snake.head === position) {
          console.log(`Oops! Bitten by snake at ${position}`);
          return snake.tail;
        }
      }
  
      for (const ladder of this.ladders) {
        if (ladder.start === position) {
          console.log(`Yay! Climbed ladder at ${position}`);
          return ladder.end;
        }
      }
  
      return position;
    }
  }

  const players = [new Player("Alice"), new Player("Bob")];

const snakes = [
  new Snake(99, 21),
  new Snake(95, 75),
  new Snake(92, 88),
  new Snake(62, 19),
  new Snake(49, 11),
  new Snake(46, 25),
  new Snake(16, 6)
];

const ladders = [
  new Ladder(2, 38),
  new Ladder(7, 14),
  new Ladder(8, 31),
  new Ladder(15, 26),
  new Ladder(21, 42),
  new Ladder(28, 84),
  new Ladder(36, 44),
  new Ladder(51, 67),
  new Ladder(71, 91),
  new Ladder(78, 98),
  new Ladder(87, 94)
];

const Game = new SnakeAndLadderGame(players, snakes, ladders);
Game.startGame();
