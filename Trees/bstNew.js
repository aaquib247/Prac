//search in bst:
class Node {
  constructor(value) {
    this.val = value;
    this.left = null;
    this.right = null;
  }
}

function search(root,target){
    if(!root) return false;
    
    if(root.val > target){
        return search(root.left,target)
    } else if(root.val < target){
        return search(root.right,target);
    } else {
        return true;
    }
}


const root = new Node(15);
root.left = new Node(10);
root.right = new Node(20);
root.left.left = new Node(8);
root.left.right = new Node(12);

console.log(search(root,10)); // true
console.log(search(root,25)); // false


//Ceil in BST
function search(root,target,ceil = null){
    if(!root) return ceil;
    
    if(root.val > target){
        return search(root.left,target,root.val)
    } else if(root.val < target){
        return search(root.right,target,ceil);
    } else {
        return root.val;
    }
}


const root = new Node(15);
root.left = new Node(10);
root.right = new Node(20);
root.left.left = new Node(8);
root.left.right = new Node(12);

console.log(search(root,10)); //output: 10
console.log(search(root,11)); // output: 12

//Floor
function findFloor(root, target, floor = null) {
    if (!root) return floor;

    if (root.val > target) {
        return findFloor(root.left, target, floor);
    } else if (root.val < target) {
        return findFloor(root.right, target, root.val);
    } else {
        return root.val;
    }
}

//Insertion in BST
function insert(root, value) {
    if (!root) return new Node(value);

    if (value < root.val) {
        root.left = insert(root.left, value);
    } else if (value > root.val) {
        root.right = insert(root.right, value);
    }

    return root;
}
let root = null;

root = insert(root, 15);
root = insert(root, 10);
root = insert(root, 20);
root = insert(root, 8);
root = insert(root, 12);

console.log(search(root, 10)); // true
console.log(search(root, 25)); // false