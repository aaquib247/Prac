class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 0;
  }
}

class AVL {
  constructor() {
    this.root = null;
  }

  height(node) {
    return node ? node.height : -1;
  }

  insert(value) {
    this.root = this._insert(value, this.root);
  }

  _insert(value, node) {
    if (!node) {
      return new Node(value);
    }

    if (value < node.value) {
      node.left = this._insert(value, node.left);
    } else if (value > node.value) {
      node.right = this._insert(value, node.right);
    }

    node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
    return this._rotate(node);
  }

  _rotate(node) {
    if (this.height(node.left) - this.height(node.right) > 1) {
      // left heavy
      if (this.height(node.left.left) - this.height(node.left.right) > 0) {
        // left left case
        return this._rightRotate(node);
      } else if (this.height(node.left.left) - this.height(node.left.right) < 0) {
        // left right case
        node.left = this._leftRotate(node.left);
        return this._rightRotate(node);
      }
    } else if (this.height(node.left) - this.height(node.right) < -1) {
      // right heavy
      if (this.height(node.right.left) - this.height(node.right.right) < 0) {
        // right right case
        return this._leftRotate(node);
      } else if (this.height(node.right.left) - this.height(node.right.right) > 0) {
        // right left case
        node.right = this._rightRotate(node.right);
        return this._leftRotate(node);
      }
    }

    return node;
  }
  // Rotate from p - Right  
  _rightRotate(p) {
    let c = p.left;  // write the respective positions of c and t
    let t = c.right;

    c.right = p;
    p.left = t;

    p.height = Math.max(this.height(p.left), this.height(p.right)) + 1;
    c.height = Math.max(this.height(c.left), this.height(c.right)) + 1;

    return c;
  }

  _leftRotate(c) {
    let p = c.right;
    let t = p.left;

    p.left = c;
    c.right = t;

    p.height = Math.max(this.height(p.left), this.height(p.right)) + 1;
    c.height = Math.max(this.height(c.left), this.height(c.right)) + 1;

    return p;
  }

  populate(nums) {
    nums.forEach(num => this.insert(num));
  }

  display() {
    this._display(this.root, "Root Node: ");
  }

  _display(node, details) {
    if (!node) {
      return;
    }
    console.log(details + node.value);
    this._display(node.left, "Left child of " + node.value + ": ");
    this._display(node.right, "Right child of " + node.value + ": ");
  }

  isEmpty() {
    return this.root === null;
  }

  balanced() {
    return this._balanced(this.root);
  }

  _balanced(node) {
    if (!node) {
      return true;
    }
    return Math.abs(this.height(node.left) - this.height(node.right)) <= 1 &&
      this._balanced(node.left) &&
      this._balanced(node.right);
  }
}

// Example usage:
const avlTree = new AVL();
avlTree.populate([10, 5, 15, 3, 7, 12, 17]);
avlTree.display();

console.log("Is AVL tree balanced?", avlTree.balanced());
