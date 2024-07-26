class Maze {
    static count(r, c) {
        if (r === 1 || c === 1) {
            return 1;
        }
        let left = Maze.count(r - 1, c);
        let right = Maze.count(r, c - 1);
        return left + right;
    }

    static path(p, r, c) {
        if (r === 1 && c === 1) {
            console.log(p);
            return;
        }

        if (r > 1) {
            Maze.path(p + 'D', r - 1, c);
        }

        if (c > 1) {
            Maze.path(p + 'R', r, c - 1);
        }
    }

    static pathRet(p, r, c) {
        if (r === 1 && c === 1) {
            return [p];
        }

        let list = [];

        if (r > 1) {
            list = list.concat(Maze.pathRet(p + 'D', r - 1, c));
        }

        if (c > 1) {
            list = list.concat(Maze.pathRet(p + 'R', r, c - 1));
        }

        return list;
    }

    static pathRetDiagonal(p, r, c) {
        if (r === 1 && c === 1) {
            return [p];
        }

        let list = [];

        if (r > 1 && c > 1) {
            list = list.concat(Maze.pathRetDiagonal(p + 'D', r - 1, c - 1));
        }

        if (r > 1) {
            list = list.concat(Maze.pathRetDiagonal(p + 'V', r - 1, c));
        }

        if (c > 1) {
            list = list.concat(Maze.pathRetDiagonal(p + 'H', r, c - 1));
        }

        return list;
    }

    static pathRestrictions(p, maze, r, c) {
        if (r === maze.length - 1 && c === maze[0].length - 1) {
            console.log(p);
            return;
        }

        if (!maze[r][c]) {
            return;
        }

        if (r < maze.length - 1) {
            Maze.pathRestrictions(p + 'D', maze, r + 1, c);
        }

        if (c < maze[0].length - 1) {
            Maze.pathRestrictions(p + 'R', maze, r, c + 1);
        }
    }
}

// Example usage:
// console.log(Maze.count(3, 3));
// Maze.path("", 3, 3);
// console.log(Maze.pathRet("", 3, 3));
// console.log(Maze.pathRetDiagonal("", 3, 3));

let board = [
    [true, true, true],
    [true, false, true],
    [true, true, true]
];

Maze.pathRestrictions("", board, 0, 0);