//https://leetcode.com/problems/flood-fill/description/

var floodFill = function (image, sr, sc, color) {
    const directions = [[-1, 0], [0, -1], [1, 0], [0, 1]]

    function dfs(image, sr, sc, color) {
        let oldvalue = image[sr][sc];
        image[sr][sc] = color;
        let x = sr;
        let y = sc;

        for (const [dx, dy] of directions) {

            let resX = x + dx;
            let resY = y + dy;

            if (resX >= 0 && resX < image.length && resY >= 0 && resY < image[0].length && image[resX][resY] === oldvalue) {
                dfs(image, resX, resY, color)
            }


        }
    }


    if (image[sr][sc] !== color) {
        dfs(image, sr, sc, color)
    }

    return image;

};