function isHappy(n) {
    let slow = n;
    let fast = n;

    do {
        slow = findSquare(slow);
        fast = findSquare(findSquare(fast));
    } while (slow !== fast);

    return slow === 1;
}

function findSquare(number) {
    let ans = 0;
    while (number > 0) {
        let rem = number % 10;
        ans += rem * rem;
        number = Math.floor(number / 10);
    }
    return ans;
}

// Example usage
function main() {
    let happyNumber = 19;
    let isHappyResult = isHappy(happyNumber);
    console.log("Is " + happyNumber + " a happy number? " + isHappyResult);
}

main();

console.log(isHappy(19)); // true
console.log(isHappy(2));  // false