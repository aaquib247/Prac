class Find {
    static main() {
        const arr = [2, 3, 1, 4, 4, 5];
        // console.log(this.find(arr, 4, 0));
        // console.log(this.findIndex(arr, 4, 0));
        // console.log(this.findIndexLast(arr, 4, arr.length - 1));
        // this.findAllIndex(arr, 4, 0);
        // console.log(this.list);

        // Using findAllIndex that modifies a global list
        // let list = [];
        // let ans = this.findAllIndexWithList(arr, 4, 0, list);
        // console.log(ans);
        // console.log(list);

        console.log(this.findAllIndex2(arr, 4, 0));
    }

    static find(arr, target, index) {
        if (index === arr.length) {
            return false;
        }
        return arr[index] === target || this.find(arr, target, index + 1);
    }

    static findIndex(arr, target, index) {
        if (index === arr.length) {
            return -1;
        }
        if (arr[index] === target) {
            return index;
        } else {
            return this.findIndex(arr, target, index + 1);
        }
    }

    static findIndexLast(arr, target, index) {
        if (index === -1) {
            return -1;
        }
        if (arr[index] === target) {
            return index;
        } else {
            return this.findIndexLast(arr, target, index - 1);
        }
    }

    static list = [];

    static findAllIndex(arr, target, index) {
        if (index === arr.length) {
            return;
        }
        if (arr[index] === target) {
            this.list.push(index);
        }
        this.findAllIndex(arr, target, index + 1);
    }

    static findAllIndexWithList(arr, target, index, list) {
        if (index === arr.length) {
            return list;
        }
        if (arr[index] === target) {
            list.push(index);
        }
        return this.findAllIndexWithList(arr, target, index + 1, list);
    }

    static findAllIndex2(arr, target, index) {
        const list = [];

        if (index === arr.length) {
            return list;
        }

        // Collect indices for current call only
        if (arr[index] === target) {
            list.push(index);
        }

        // Recursively collect indices from subsequent calls
        const ansFromBelowCalls = this.findAllIndex2(arr, target, index + 1);
        list.push(...ansFromBelowCalls);

        return list;
    }
}

// To call the main method and see the result
Find.main();
