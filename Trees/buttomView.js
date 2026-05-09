var bottomView = function (root) {
    if (!root) return [];

    let map = new Map();
    let queue = [[root, 0]];

    let min = 0, max = 0;

    while (queue.length) {
        let [node, hd] = queue.shift();

        map.set(hd, node.val);

        // track range
        min = Math.min(min, hd);
        max = Math.max(max, hd);

        if (node.left) queue.push([node.left, hd - 1]);
        if (node.right) queue.push([node.right, hd + 1]);
    }

    let result = [];

    // iterate from leftmost to rightmost
    for (let i = min; i <= max; i++) {
        result.push(map.get(i));
    }

    return result;
};