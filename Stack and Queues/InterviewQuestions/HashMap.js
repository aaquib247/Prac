class MyHashMap {
    constructor(size = 1000) {
        this.size = size;
        this.map = Array.from({ length: size }, () => []);
    }

    hash(key) {
        return key % this.size; // simple hash for numbers
    }

    put(key, value) {
        const bucket = this.map[this.hash(key)];

        for (let pair of bucket) {
            if (pair[0] === key) {
                pair[1] = value; // update
                return;
            }
        }

        bucket.push([key, value]); // insert
    }

    get(key) {
        const bucket = this.map[this.hash(key)];

        for (let pair of bucket) {
            if (pair[0] === key) {
                return pair[1];
            }
        }

        return -1; // not found
    }

    remove(key) {
        const bucket = this.map[this.hash(key)];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                return;
            }
        }
    }
}