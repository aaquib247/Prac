class Node {
  constructor(val){
    this.val = val;
    this.left = null;
    this.right =null;
  }
}

var minDepth = function(root) {

    if(!root) return 0;
    
    if(!root.left) return minDepth(root.right) + 1;
    if(!root.right) return minDepth(root.left) + 1;
    
    let left = minDepth(root.left);
    let right = minDepth(root.right);

    return Math.min(left,right) + 1;

};

const root = new Node(1);
root.left = new Node(2);
root.left.left = new Node(4);
root.right = new Node(3)

console.log(minDepth(root))
