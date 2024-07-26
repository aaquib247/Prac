class Stream {
    constructor() {}

    main() {
        let c = this.skip("bacapplcdah");
        console.log(c);
    }

    skip(up) {
        if (up.length === 0) {
            return "";
        }
        let ch = up.charAt(0);

        if (ch === 'a') {
            return this.skip(up.substring(1));
        } else {
            return ch + this.skip(up.substring(1));
        }
    }

    skipString(up) {
        if (up.length === 0) {
            return "";
        }

        let ch = up.charAt(0);

        if (ch === 'a') {
            return this.skipString(up.substring(1));
        } else {
            return ch + this.skipString(up.substring(1));
        }
    }

    skipApple(up) {
        if (up.length === 0) {
            return "";
        }
        if (up.startsWith("apple")) {
            return this.skipApple(up.substring(5));
        } else {
            return up.charAt(0) + this.skipApple(up.substring(1));
        }
    }

    skipAppNotApple(up) {
        if (up.length === 0) {
            return "";
        }
        if (up.startsWith("app") && !up.startsWith("apple")) {
            return this.skipAppNotApple(up.substring(3));
        } else {
            return up.charAt(0) + this.skipAppNotApple(up.substring(1));
        }
    }
}

// To create an instance of the class and call the main method
const stream = new Stream();
stream.main();
