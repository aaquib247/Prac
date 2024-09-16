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

// let ans = SubSeq.subseqRet("", "abc");
// console.log(ans);

// SubSeq.subseqAscii("", "abc");

// let ansAscii = SubSeq.subseqAsciiRet("", "abc");
// console.log(ansAscii);
