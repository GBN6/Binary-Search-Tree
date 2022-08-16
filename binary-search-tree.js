class Node {
    constructor(data = null, leftChild = null, rightChild = null) {
        this.data = data;
        this.leftChild = leftChild;
        this.rightChild = rightChild;
    }
}

class Tree { 
    constructor(array) {
        this.root = this.buildTree(array);
    }

    sorted(array) {
        let sorted = [...new Set(array)].sort((a, b) => a - b);
        return sorted;
    }

    minValue(root) {
        let minimum = root.data;
        while (root.leftChild !== null) {
            minimum = root.leftChild.data
            root = root.leftChild
        }
        return minimum;
    }

    buildTree(array) {
        let sorted = this.sorted(array);
        if (sorted.length === 0) return null
        const middle = parseInt(sorted.length / 2);
        const root = new Node(sorted[middle], this.buildTree(sorted.slice(0, middle)), this.buildTree(sorted.slice(middle + 1)))
        return root;
    }

    insert(value, root = this.root) {
        if (root === null) return new Node(value);
        root.data < value ? (root.rightChild = this.insert(value, root.rightChild)) : (root.leftChild = this.insert(value, root.leftChild)) 
        return root;
    }

    delete(value, root = this.root) {
        if (root === null) return root;
        if (root.data < value) root.rightChild = this.delete(value, root.rightChild);
        else if (root.data > value) root.leftChild = this.delete(value, root.leftChild);
        else { 
            if (root.leftChild === null) return root.rightChild;
            else if (root.rightChild === null) return root.leftChild;
            root.data = this.minValue(root.rightChild);
            root.rightChild = this.delete(value, root.rightChild);
        }
    }

    find(value, root = this.root) {
        if (root === null) return null;
        if (root.data !== value) {
            return root.data < value ? this.find(value, root.rightChild) : this.find(value, root.leftChild)
        }
        return root;
    }

    //Breadth first traversal - all elements of level, uses queue - remove first element, add elements to the back
    levelOrder(callback) {
        if (!this.root) return [];
        let queueArray = [this.root];
        let resultArray = [];
        //breadth-first level
        while (queueArray.length) {
            let level = [];
            let size = queueArray.length;
            for (let i = 0; i < size; i++) {
                const node = queueArray.shift();
                level.push(node.data)
                if (node.leftChild) queueArray.push(node.leftChild)
                if (node.rightChild) queueArray.push(node.rightChild)
                if(callback) callback(node);
            }
            resultArray.push(level);
        }
        if (!callback) return resultArray;
    }

    //depth first traversal - 3 methods:
    // -  preorder(root,left,right)
    // - inorder(left,root,right)
    // - postorder(left,right,root)
    //uses stack - add to the end and remove from the end
    
    
    
    //from root to left side then right side
    preorder(callback) {
        if (!this.root) return [];
        const stack = [this.root];
        const resultArray = [];

        while(stack.length) {
            const node = stack.pop();
            if (node.rightChild) stack.push(node.rightChild);
            if (node.leftChild) stack.push(node.leftChild);
            if (callback) callback(node);
            resultArray.push(node.data)
        }
        if (!callback) return resultArray;
    }

    //all left side then root then right side
    inorder(node = this.root, callback, result = []) {
        if (!this.root) return [];
        if (node === null) return;
        this.inorder(node.leftChild, callback, result);
        callback ? callback(node) : result.push(node.data)
        this.inorder(node.rightChild, callback, result);
        if (result) return result;
    }

    //al left side then right side then root
    postorder(callback) {
        if(!this.root) return []
        const stack = [this.root];
        const result = []
        while (stack.length) {
            const node = stack.pop();
            if(node.leftChild) stack.push(node.leftChild);
            if(node.rightChild) stack.push(node.rightChild);
            if (callback) callback(node);
            result.push(node.data);
        }
        if(!callback) return result.reverse();
    }


    //height is the number of edges in longest path from given node to leaf node(node with no child
    //height of leaf node is 0
    height(node = this.root) {
        if(node === null) return -1;
        const leftHeight = this.height(node.leftChild);
        const rightHeight = this.height(node.rightChild);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    //depth of a node is the number of edges from node to the tree root
    //depth of root node is 0
    depth(node, root = this.root, level = 0) {
        if (!node) return null;
        if (root === null) return 0;
        if (root.data === node.data) return level;
        let count = this.depth(node, root.leftChild, level + 1)
        if (count !== 0) return count
        return this.depth(node, root.rightChild, level + 1);
    }

    balanced(node = this.root) {
        if (node === null) return true;
        const heightDiffrence = Math.abs(this.height(node.leftChild) - this.height(node.rightChild));
        return (
            heightDiffrence <= 1 && this.balanced(node.leftChild) && this.balanced(node.rightChild)
        )
    }

    reBalance() {
        if (this.root === null) return;
        const sorted = [...new Set(this.inorder().sort((a, b) => a - b))];
        this.root = this.buildTree(sorted);
    }
}

module.exports = Tree;

// let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]

let newTree = new Tree([1, 3, 2, 5]);
newTree.insert(6);
newTree.insert(10);
newTree.insert(7);
newTree.insert(9);
console.log(newTree.find(9));
console.log(newTree.height());
console.log(newTree.depth());
console.log(newTree.levelOrder());
console.log(newTree.preorder());
console.log(newTree.inorder());
console.log(newTree.postorder());
console.log(newTree.balanced());

