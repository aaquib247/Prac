var distanceK = function (root, target, k) {

    let map = new Map();
    function parent(node, p = null) {
        if (!node) return;

        map.set(node, p);
        parent(node.left, node);
        parent(node.right, node)
    }
    parent(root);

    let queue = [[target, 0]];
    let vis = new Set();
    vis.add(target);    
    let res = [];

    while (queue.length > 0) {
        let [node, dist] = queue.shift();

        if(dist === k){
            res.push(node.val);
            continue;
        }

        let neighbours = [node.left, node.right, map.get(node)];
        for (const n of neighbours) {
            if (n && !vis.has(n)) {
                vis.add(n);
                queue.push([n, dist + 1])
            }
        }
    }

    return res;

};