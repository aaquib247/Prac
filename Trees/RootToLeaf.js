//Rule

// Always push before going down
// path.push(node.val);

// Always pop when coming back
// path.pop();

// Copy when storing
// result.push([...path]); // not path

// Memory trick
// Only sum → no backtracking
// Path involved → backtracking needed

//Root to all leafs
var rootToLeafPaths = function (root) {
    let result = [];
    let path = [];

    function dfs(node) {
        if (!node) return;

        // add current node
        path.push(node.val);

        // if leaf node → save path
        if (!node.left && !node.right) {
            result.push([...path]); // copy
        } else {
            dfs(node.left);
            dfs(node.right);
        }

        // backtrack
        path.pop();
    }

    dfs(root);
    return result;
};

//Root to a particular leaf.
var rootToNodePath = function (root, target) {
    let path = [];

    function dfs(node) {
        if (!node) return false;

        // add current node
        path.push(node.val);

        // if target found
        if (node.val === target) return true;

        // search left or right
        if (dfs(node.left) || dfs(node.right)) {
            return true;
        }

        // backtrack if not found
        path.pop();
        return false;
    }

    dfs(root);
    return path;
};


//pathSum2
var pathSum = function (root, targetSum) {
    let result = [];
    let path = [];

    function dfs(node, sum) {
        if (!node) return;

        path.push(node.val);
        sum += node.val;

        if (!node.left && !node.right && sum === targetSum) {
            result.push([...path]);
        }

        dfs(node.left, sum);
        dfs(node.right, sum);

        path.pop(); // backtrack
    }

    dfs(root, 0);
    return result;
};