class Node {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null
    }
}

class TreeImplementation {

    preOrder(root) {
        if (!root) return null;
        console.log(root.data)
        this.preOrder(root.left)
        this.preOrder(root.right)
    }

    postOrder(root) {
        if (!root) return null;

        this.postOrder(root.left)
        this.postOrder(root.right)
        console.log(root.data)
    }

    inOrder(root) {
        if (!root) return null;

        this.inOrder(root.left)
        console.log(root.data)
        this.inOrder(root.right)
    }

    height(root) {
        if (root === null) return -1;
        let left = this.height(root.left)
        let right = this.height(root.right)

        return Math.max(left, right) + 1;
    }

    diameter(root) {
        let dia = 0;

       function getDiameter(root){
            if (!root) return 0;
              let left = getDiameter(root.left)
              let right = getDiameter(root.right)

              dia = Math.max(dia, left+right)

              return Math.max(left, right) + 1;
        }

        getDiameter(root);
        return dia;
    }

    siblings(root,p,q){

     if(!root) return false;
     
     let left = root.left ? root.left.data : null;
     let right = root.right ? root.right.data : null;

     if((left === p && right === q) || (left === q && right === p))
         return true;

     return (this.siblings(root.left,p,q) || this.siblings(root.right,p,q))

    }

    find(root,n,parent){
    if(!root) return null;
    if(root.data === n) return {root,parent};

    let left = this.find(root.left,n,root);
    let right = this.find(root.right,n,root);

    return left ? left : right;
    }

    cousins(root,p,q){
     let x = this.find(root,p);
     let y = this.find(root,q);

     if(!x || !y) return false;

     return ((this.level(root,x,0) === this.level(root,y,0)) && (x.parent !== y.parent))
    }

 

    level(root,node,level){
      if(!root) return -1;
      if(root === node.root) return level;

      let left = this.level(root.left,node,level+1);
      if(left !== -1) return left;

      return this.level(root.right,node,level+1);
    }
}


const tree = new TreeImplementation();
const root = new Node(1)
root.left = new Node(2)
root.right = new Node(3)
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.right = new Node(6);

tree.preOrder(root);
console.log('-------------------')
console.log('The Height of the Tree is : ', tree.height(root))
console.log('-------------------')
console.log('The Diameter of the Tree is : ', tree.diameter(root))
tree.postOrder(root);
console.log('-------------------')
tree.inOrder(root);
console.log('-------------------')
console.log(tree.siblings(root,4,5))
console.log('-------------------')
console.log(tree.cousins(root,4,6))


