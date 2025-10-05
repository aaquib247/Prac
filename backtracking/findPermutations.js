// Global result array
let res = [];

// The main function to generate permutations
function permutation(input, output) {

    if (input.length === 0) {
        res.push(output);
        return;
    }

    // Set to check for duplicates at each recursive level
    let set = new Set();

    // Loop through the input string
    for (let i = 0; i < input.length; i++) {
        // Skip duplicates by checking if the character has been used in this position
        if (set.has(input[i])) continue;

        // Add the current character to the set to track duplicates for this level
        set.add(input[i]);

        // Create the new input string by removing the character at index i
        let newIp = input.slice(0, i) + input.slice(i + 1);

        // Create the new output string by appending the current character
        let newOut = output + input.charAt(i);

        // Recursively call the permutation function with the new input and output
        permutation(newIp, newOut);
    }
}

// Call the permutation function with the initial input and empty output
let input = "abc";
permutation(input, "");

// Output the results
console.log(res);
