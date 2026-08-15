// All 8 Tasks We Built Today:

// Task 1: Create Player Class
// Create a Player class with:
// - playerId, name, score
// Create 3 players and print them

// Task 2: Create Team Class
// Create a Team class with:
// - teamId, teamName, players (empty array)
// Create 2 teams and print them

// Task 3: Add addPlayers() method
// Add addPlayers(player) to Team
// - pushes player into players array
// Add P1, P2 to India
// Add P3 to Australia

// Task 4: Add getBestPlayer() method
// Find player with HIGHEST score in team
// Return full player object
// TC: O(n)

// Task 5: Add getTopN(n) method
// Return TOP N players by score (high to low)
// t1.getTopN(2) → [Virat(95), Rohit(88)]
// TC: O(n log n)

// Task 6: Add getAverageScore() method
// Return average score of ALL players in team
// t1.getAverageScore() → 85.75
// TC: O(n)

// Task 7: Add getPlayersByScoreRange(min, max)
// Return players whose score is between min and max
// t1.getPlayersByScoreRange(80, 95) 
// → [Virat(95), Rohit(88), Jadeja(85)]
// TC: O(n)

// Task 8: Add getAverageScoreByPosition()
// Group players by position
// Return average score per position
// t1.getAverageScoreByPosition()
// → { batsman: 91.5, bowler: 72.5, allrounder: 85 }
// TC: O(n)


class Player{
    constructor(id,name,score,position){
        this.playerId = id;
        this.name = name;
        this.score = score;
        this.position = position;
    }
}

class Team{
    constructor(id,name){
        this.teamId = id;
        this.teamName = name;
        this.players = [];
    }
    
    addPlayers(player){
        this.players.push(player)
    }
    
    getBestPlayer(){
      let max = this.players[0];
      for(let p of this.players){
          if(p.score > max.score){
              max = p
          }
      }
      return max;
    }
    
    getTopN(n){
        this.players.sort((a,b) => b.score - a.score)
        return this.players.slice(0,n);
    }
    
    getAverageScore(){
        let sum = 0;
        let n = this.players.length;
        
        for(let player of this.players){
            sum += player.score
        }
        
        return sum/n;
    }
    
    getPlayersByScoreRange(min, max){
        return this.players.filter((player) => player.score >= min && player.score <= max)
    }
    
    getAverageScoreByPosition(){
        let map = new Map();
        for(let player of this.players){
            
            if(!map.has(player.position)){
                map.set(player.position, [])
            }
            map.get(player.position).push(player.score)
        }
        
        let res = {};
        for(let [k,Val] of map){
            let sum = 0;
            for(let score of Val){
                 sum += score;
            }
            res[k] = sum/Val.length;
        }
        
        return res;
        
    }
}

const P1 = new Player(1, 'Virat',  95, 'batsman')
const P2 = new Player(2, 'Rohit',  88, 'batsman')
const P3 = new Player(3, 'Bumrah', 75, 'bowler')
const P4 = new Player(4, 'Jadeja', 85, 'allrounder')
const P5 = new Player(5, 'Shami',  70, 'bowler')

const P30 = new Player(6, 'Ricky',  99, 'batsmen')

const t1 = new Team(1,'India')
const t2 = new Team(2,'Australia')

t1.addPlayers(P1);
t1.addPlayers(P2);
t1.addPlayers(P4)
t1.addPlayers(P5)

t2.addPlayers(P30)

console.log(t1.getBestPlayer())
console.log(t2.getBestPlayer())
console.log(t1.getTopN(2))
console.log(t1.getTopN(3))
console.log(t1.getAverageScore())
console.log(t2.getAverageScore())
console.log(t1.getPlayersByScoreRange(80, 95))
console.log(t1.getPlayersByScoreRange(70, 80))

console.log("Get Avg by Position")
console.log(t1.getAverageScoreByPosition())
