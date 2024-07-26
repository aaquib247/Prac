class Dice {
    static dice(p, target) {
        if (target === 0) {
            console.log(p);
            return;
        }

        for (let i = 1; i <= 6 && i <= target; i++) {
            Dice.dice(p + i, target - i);
        }
    }

    static diceRet(p, target) {
        if (target === 0) {
            return [p];
        }

        let list = [];
        for (let i = 1; i <= 6 && i <= target; i++) {
            list = list.concat(Dice.diceRet(p + i, target - i));
        }
        return list;
    }

    static diceFace(p, target, face) {
        if (target === 0) {
            console.log(p);
            return;
        }

        for (let i = 1; i <= face && i <= target; i++) {
            Dice.diceFace(p + i, target - i, face);
        }
    }

    static diceFaceRet(p, target, face) {
        if (target === 0) {
            return [p];
        }

        let list = [];
        for (let i = 1; i <= face && i <= target; i++) {
            list = list.concat(Dice.diceFaceRet(p + i, target - i, face));
        }
        return list;
    }
}

// Example usage:
Dice.dice("", 4); // This will print all possible combinations to reach the target 4 with a standard dice
console.log(Dice.diceRet("", 4)); // This will return all possible combinations as an array

Dice.diceFace("", 4, 6); // This will print all possible combinations to reach the target 4 with a dice having 6 faces
console.log(Dice.diceFaceRet("", 4, 6)); // This will return all possible combinations as an array
