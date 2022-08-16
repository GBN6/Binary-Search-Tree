const Tree = require('./binary-search-tree');

const randomNumbersArray = (size) => {
    return Array.from({ length: size}, () => Math.floor(Math.random() * 100))
};

const tree = new Tree(randomNumbersArray(20));
