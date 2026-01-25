class SubSeq {
    static subseq(p, up) {
        if (up.length === 0) {
            console.log(p);
            return;
        }
        let ch = up.charAt(0);
        SubSeq.subseq(p + ch, up.substring(1));
        SubSeq.subseq(p, up.substring(1));
    }

    static subseqRet(p, up) {
        if (up.length === 0) {
            return [p];
        }
        let ch = up.charAt(0);
        let left = SubSeq.subseqRet(p + ch, up.substring(1));
        let right = SubSeq.subseqRet(p, up.substring(1));

        return left.concat(right);
    }

    static subseqAscii(p, up) {
        if (up.length === 0) {
            console.log(p);
            return;
        }
        let ch = up.charAt(0);
        SubSeq.subseqAscii(p + ch, up.substring(1));
        SubSeq.subseqAscii(p, up.substring(1));
        SubSeq.subseqAscii(p + ch.charCodeAt(0), up.substring(1));
    }

    static subseqAsciiRet(p, up) {
        if (up.length === 0) {
            return [p];
        }
        let ch = up.charAt(0);
        let first = SubSeq.subseqAsciiRet(p + ch, up.substring(1));
        let second = SubSeq.subseqAsciiRet(p, up.substring(1));
        let third = SubSeq.subseqAsciiRet(p + ch.charCodeAt(0), up.substring(1));

        return first.concat(second).concat(third);
    }
}

// Example usage:

// Uncomment to test the functions:

SubSeq.subseq("", "abc");
let res = [];
let ans = SubSeq.subseqRet("", "abc");
console.log(ans);

SubSeq.subseqAscii("", "abc");

// let ansAscii = SubSeq.subseqAsciiRet("", "abc");
// console.log(ansAscii);


//Arrays
// class SubSeq {
//     // Print all subsequences including elements as-is
//     static subseq(p, up) {
//         if (up.length === 0) {
//             console.log(p);
//             return;
//         }
//         let elem = up[0];
//         SubSeq.subseq(p.concat([elem]), up.slice(1)); // Include the element
//         SubSeq.subseq(p, up.slice(1)); // Exclude the element
//     }

//     // Return all subsequences including elements as-is
//     static subseqRet(p, up) {
//         if (up.length === 0) {
//             return [p];
//         }
//         let elem = up[0];
//         let left = SubSeq.subseqRet(p.concat([elem]), up.slice(1)); // Include the element
//         let right = SubSeq.subseqRet(p, up.slice(1)); // Exclude the element

//         return left.concat(right);
//     }

//     // Print all subsequences including elements and their numeric representations
//     static subseqAscii(p, up) {
//         if (up.length === 0) {
//             console.log(p);
//             return;
//         }
//         let elem = up[0];
//         SubSeq.subseqAscii(p.concat([elem]), up.slice(1)); // Include the element
//         SubSeq.subseqAscii(p, up.slice(1)); // Exclude the element
//         SubSeq.subseqAscii(p.concat([elem.toString().charCodeAt(0)]), up.slice(1)); // Include the ASCII code
//     }

//     // Return all subsequences including elements and their numeric representations
//     static subseqAsciiRet(p, up) {
//         if (up.length === 0) {
//             return [p];
//         }
//         let elem = up[0];
//         let first = SubSeq.subseqAsciiRet(p.concat([elem]), up.slice(1)); // Include the element
//         let second = SubSeq.subseqAsciiRet(p, up.slice(1)); // Exclude the element
//         let third = SubSeq.subseqAsciiRet(p.concat([elem.toString().charCodeAt(0)]), up.slice(1)); // Include the ASCII code

//         return first.concat(second).concat(third);
//     }
// }

// // Example usage:

// // Uncomment to test the functions:

// SubSeq.subseq([], [1, 2, 3]);

// let ans = SubSeq.subseqRet([], [1, 2, 3]);
// console.log(ans);

// SubSeq.subseqAscii([], [1, 2, 3]);

// let ansAscii = SubSeq.subseqAsciiRet([], [1, 2, 3]);
// console.log(ansAscii);
