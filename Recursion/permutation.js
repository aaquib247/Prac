class Permutations {
    static permutations(p, up) {
        if (up.length === 0) {
            console.log(p);
            return;
        }
        let ch = up.charAt(0);
        for (let i = 0; i <= p.length; i++) {
            let f = p.substring(0, i);
            let s = p.substring(i, p.length);
            Permutations.permutations(f + ch + s, up.substring(1));
        }
    }

    static permutationsList(p, up) {
        if (up.length === 0) {
            return [p];
        }
        let ch = up.charAt(0);
        let ans = [];
        for (let i = 0; i <= p.length; i++) {
            let f = p.substring(0, i);
            let s = p.substring(i, p.length);
            ans = ans.concat(Permutations.permutationsList(f + ch + s, up.substring(1)));
        }
        return ans;
    }

    static permutationsCount(p, up) {
        if (up.length === 0) {
            return 1;
        }
        let count = 0;
        let ch = up.charAt(0);
        for (let i = 0; i <= p.length; i++) {
            let f = p.substring(0, i);
            let s = p.substring(i, p.length);
            count += Permutations.permutationsCount(f + ch + s, up.substring(1));
        }
        return count;
    }
}

// Example usage:

// Uncomment to test the functions:

Permutations.permutations("", "abc");

let ans = Permutations.permutationsList("", "abc");
console.log(ans);

console.log(Permutations.permutationsCount("", "abcd"));
