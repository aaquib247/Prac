// Node class to be used in the BST
class Node {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
      this.height = 0;  // Initialize height
    }
  }
  
  class BST {
    constructor() {
      this.root = null;
    }
  
    // Insert a value into the BST
    insert(value) {
      this.root = this._insert(value, this.root);  // Start the insertion from the root
    }
  
    _insert(value, node) {
      if (node === null) {
        return new Node(value);  // Create a new node if we reach a null position
      }
  
      if (value < node.value) {
        node.left = this._insert(value, node.left);  // Insert into the left subtree
      } else if (value > node.value) {
        node.right = this._insert(value, node.right);  // Insert into the right subtree
      }
  
      // Update the height of the node
      node.height = Math.max(this._height(node.left), this._height(node.right)) + 1;
      return node;
    }
  
    // Get the height of a node
    _height(node) {
      if (node === null) {
        return -1;  // Height of an empty tree is -1
      }
      return node.height;
    }
  
    // Display the BST
    display() {
      this._display(this.root, 'Root Node: ');
    }
  
    _display(node, details) {
      if (node === null) {
        return;
      }
      console.log(details + node.value);
      this._display(node.left, 'Left child of ' + node.value + ' : ');
      this._display(node.right, 'Right child of ' + node.value + ' : ');
    }
  
    // In-order traversal (Left, Root, Right)
    inorder() {
      const result = [];
      this._inorder(this.root, result);
      return result;
    }
  
    _inorder(node, result) {
      if (node !== null) {
        this._inorder(node.left, result);
        result.push(node.value);
        this._inorder(node.right, result);
      }
    }
  
    // Pre-order traversal (Root, Left, Right)
    preorder() {
      const result = [];
      this._preorder(this.root, result);
      return result;
    }
  
    _preorder(node, result) {
      if (node !== null) {
        result.push(node.value);
        this._preorder(node.left, result);
        this._preorder(node.right, result);
      }
    }
  
    // Post-order traversal (Left, Right, Root)
    postorder() {
      const result = [];
      this._postorder(this.root, result);
      return result;
    }
  
    _postorder(node, result) {
      if (node !== null) {
        this._postorder(node.left, result);
        this._postorder(node.right, result);
        result.push(node.value);
      }
    }
  }
  
  // Example usage
  const bst = new BST();
  
  // Insert values into the BST
  bst.insert(10);
  bst.insert(5);
  bst.insert(15);
  bst.insert(2);
  bst.insert(7);
  bst.insert(12);
  bst.insert(18);
  
  // Display the BST
  console.log('Display BST:');
  bst.display();
  
  // Get the height of the BST
  console.log('Height of the BST:', bst._height(bst.root));
  
  //Perform in-order traversal
  console.log('In-order Traversal:', bst.inorder());  // [2, 5, 7, 10, 12, 15, 18]
  
  // Perform pre-order traversal
  console.log('Pre-order Traversal:', bst.preorder());  // [10, 5, 2, 7, 15, 12, 18]
  
  // Perform post-order traversal
  console.log('Post-order Traversal:', bst.postorder());  // [2, 7, 5, 12, 18, 15, 10]
  