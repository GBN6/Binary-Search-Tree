const Tree = require('./binary-search-tree');

const randomNumbersArray = (size) => {
    return Array.from({ length: size}, () => Math.floor(Math.random() * 100))
};

const tree = new Tree(randomNumbersArray(20));
console.log('Balanced:', tree.balanced());
console.log('Lever Order =>', tree.levelOrder());
console.log('Preorder =>', tree.preorder());
console.log('Inorder =>', tree.inorder());
console.log('Postorder =>', tree.postorder());

for (let i = 0; i < 5; i++) {
    tree.insert(Math.floor(Math.random() * 1000));
  }
console.log('Balanced:', tree.balanced());

tree.reBalance();
console.log('Balanced:', tree.balanced());
console.log('Lever Order =>', tree.levelOrder());
console.log('Preorder =>', tree.preorder());
console.log('In-order =>', tree.inorder());
console.log('Post-order =>', tree.postorder());