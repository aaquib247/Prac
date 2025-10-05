function generatePermutations(input) {
    const res = [];

    function backtrack(currInput, currOutput) {
        if (currInput.length === 0) {
            res.push(currOutput);
            return;
        }

        const used = new Set();

        for (let i = 0; i < currInput.length; i++) {
            const char = currInput[i];

            // Skip if character already used at this level
            if (used.has(char)) continue;
            used.add(char);

            const remaining = currInput.slice(0, i) + currInput.slice(i + 1);
            backtrack(remaining, currOutput + char);
        }
    }

    backtrack(input, "");
    return res;
}

// Example usage:
const permutations = generatePermutations("aab");
console.log(permutations);
