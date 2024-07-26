class Triangle {
    static main() {
        Triangle.triangle2(4, 0); 
        // let arr = [1, 4, 3, 5];
        // Triangle.bubble(arr, arr.length, 0);
        // Triangle.selection(arr, arr.length, 0, 0);
        // console.log(arr);
    }

    static triangle2(r, c) {
        if (r === 0) {
            return;
        }
        if (c < r) {
            Triangle.triangle2(r, c + 1);
            process.stdout.write("*"); // Use process.stdout.write for printing without newline
        } else {
            Triangle.triangle2(r - 1, 0);
            console.log(); // Use console.log() for a newline
        }
    }

    static triangle(r, c) {
        if (r === 0) {
            return;
        }
        if (c < r) {
            process.stdout.write("*"); // Use process.stdout.write for printing without newline
            Triangle.triangle(r, c + 1);
        } else {
            console.log(); // Use console.log() for a newline
            Triangle.triangle(r - 1, 0);
        }
    }

    static bubble(arr, r, c) {
        if (r === 0) {
            return;
        }
        if (c < r - 1) {
            if (arr[c] > arr[c + 1]) {
                // swap
                let temp = arr[c];
                arr[c] = arr[c + 1];
                arr[c + 1] = temp;
            }
            Triangle.bubble(arr, r, c + 1);
        } else {
            Triangle.bubble(arr, r - 1, 0);
        }
    }

    static selection(arr, r, c, max) {
        if (r === 0) {
            return;
        }
        if (c < r) {
            if (arr[c] > arr[max]) {
                Triangle.selection(arr, r, c + 1, c);
            } else {
                Triangle.selection(arr, r, c + 1, max);
            }
        } else {
            let temp = arr[max];
            arr[max] = arr[r - 1];
            arr[r - 1] = temp;
            Triangle.selection(arr, r - 1, 0, 0);
        }
    }
}

// Call the main method to execute the code
Triangle.main();
