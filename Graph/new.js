class nodeClass {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor() {
        this.root = null;
    }

    insert(data) {
        this.root = this._insert(data, this.root)
    }

    _insert(data, node) {
        if (node === null)
            return new nodeClass(data);

        if (data < node.data)
            node.left = this._insert(data, node.left)

        if (data > node.data)
            node.right = this._insert(data, node.right)

        return node;
    }

    preOrder(root) {

        if (root == null)
            return null;

        if(root !== null){
            console.log(root.data);
            this.preOrder(root.left);
            this.preOrder(root.right);

        }
 
    }


    inOrder(root) {

        if (root == null)
            return [];

        this.inOrder(root.left);
        console.log(root.data);
        this.inOrder(root.right);
    }


    diameter(root) {
        let dia = 0
        function height(root) {
            if (root == null) return 0;

            let l = height(root.left)
            let r = height(root.right)

            let max = l + r;
            dia = Math.max(max, dia)

            return Math.max(l, r) + 1

        }
        height(root);
        return dia
    }

    symmetry(root) {
        if (root == null)
            return true;

        let queue = [];
        queue.push(root.left)
        queue.push(root.right)

        while (queue.length > 0) {
            let l = queue.shift();
            let r = queue.shift();

            if (l !== r) return false;
            if (l == null && r == null) return true;
            if (l == null || r == null) return false;

            queue.push(l.left);
            queue.push(r.right)
            queue.push(l.right)
            queue.push(r.left)

        }

        return true;
    }

    sorted(arr) {


        function createTree(left, right) {

            if (left > right)
                return null;

            let mid = Math.floor((left + right) / 2);
            let root = new nodeClass(arr[mid])
            root.left = createTree(left, mid - 1);
            root.right = createTree(mid + 1, right)
            return root;
        }

        const bst = createTree(0, arr.length - 1)
        this.preOrder(bst)

    }

    linkedList(root) {
        if (root == null) return null;

        let current = root;

        while (current !== null) {
            if (current.left != null) {
                let temp = current.left;

                while (temp.right !== null) {
                    temp = temp.right;
                }
                temp.right = current.right;
                current.right = current.left;
                current.left = null;

            }
            current = current.right;

        }

        this.preOrder(this.root)
        return this.root
    }

}


const tree = new Tree();

tree.insert(10)
tree.insert(5)
tree.insert(15)
tree.insert(5)
tree.insert(2)
tree.insert(7)
tree.insert(12)
tree.insert(18)

console.log(tree.linkedList(tree.root))

// console.log(tree.inOrder(tree.root));
// console.log(tree.diameter(tree.root));


// tree.insert(1)
// tree.insert(2)
// tree.insert(2)
// tree.insert(3)
// tree.insert(4)
// tree.insert(4)
// tree.insert(3)
// console.log(tree.inOrder(tree.root));
// console.log(tree.symmetry(tree.root))
// const arr = [1,2,3,4,5,6,7]
// console.log(tree.sorted(arr))

