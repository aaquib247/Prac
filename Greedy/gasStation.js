//Intuition: The idea is to check if the total amount of gas is greater than or equal to the total cost. 
// If not, it's impossible to complete the circuit. If it is possible, we can find the starting station by iterating through 
// the gas stations and keeping track of the current tank. 
// If at any point the tank goes below zero, we reset the starting station to the next station and reset the tank.

//Time Complexity: O(n) - We traverse the gas and cost arrays once.
//Space Complexity: O(1) - We use a constant amount of space.
function canCompleteCircuit(gas, cost) {
    let totalGas = gas.reduce((acc, sum) => acc + sum, 0);
    let totalCost = cost.reduce((acc,sum) => acc + sum, 0)

    if(totalGas < totalCost) return -1;

    let tank = 0;
    let start = 0;

    for (let i = 0; i < gas.length; i++) {
        const diff = gas[i] - cost[i];
        tank += diff;

        // cannot reach next station from current start
        if (tank < 0) {
            start = i + 1; // try next station as start
            tank = 0;     // reset tank
        }
    }

    // if total gas < total cost → impossible
    return start;
}

console.log(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])); // 3
console.log(canCompleteCircuit([2, 3, 4], [3, 4, 3]));          // -1