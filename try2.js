function diameter(root){
    if(!root) return 0;
    let largestDiameter = 0;  // Fixed the typo here
    
    function height(root){
        if(!root) return 0;
        
        let left = height(root.left);
        let right = height(root.right);
        
        let dia = left + right + 1;  // Corrected calculation for diameter
        largestDiameter = Math.max(largestDiameter, dia);
        
        return Math.max(left, right) + 1;
    }
    
    height(root);
    return largestDiameter;
}

// Tree structure as input
const tree = {
    val: 1,
    left: {
        val: 2,
        left: {
            val: 4,
            left: null,
            right: null
        },
        right: {
            val: 9,
            left: null,
            right: null
        }
    },
    right: {
        val: 3,
        left: {
            val: 6,
            left: null,
            right: null
        },
        right: {
            val: 7,
            left: {
                val: 8,
                left: null,
                right: null
            },
            right: {
                val: 9,
                left: null,
                right: null
            }
        }
    }
};

console.log(diameter(tree));  // Expected output is 5
                      