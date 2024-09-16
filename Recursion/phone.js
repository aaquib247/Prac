// https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/

class PhonePad {
    static pad(p, up) {
        if (up.length === 0) {
            console.log(p);
            return;
        }
        let digit = up.charAt(0) - '0'; // convert '2' into 2
        for (let i = (digit - 1) * 3; i < digit * 3; i++) {
            let ch = String.fromCharCode('a'.charCodeAt(0) + i);
            PhonePad.pad(p + ch, up.substring(1));
        }
    }

    static padRet(p, up) {
        if (up.length === 0) {
            return [p];
        }
        let digit = up.charAt(0) - '0'; // convert '2' into 2
        let list = [];
        for (let i = (digit - 1) * 3; i < digit * 3; i++) {
            let ch = String.fromCharCode('a'.charCodeAt(0) + i);
            list = list.concat(PhonePad.padRet(p + ch, up.substring(1)));
        }
        return list;
    }

    static padCount(p, up) {
        if (up.length === 0) {
            return 1;
        }
        let count = 0;
        let digit = up.charAt(0) - '0'; // convert '2' into 2
        for (let i = (digit - 1) * 3; i < digit * 3; i++) {
            let ch = String.fromCharCode('a'.charCodeAt(0) + i);
            count += PhonePad.padCount(p + ch, up.substring(1));
        }
        return count;
    }
}

// Example usage:

console.log(PhonePad.padRet("", "12"));
console.log(PhonePad.padCount("", "12"));
