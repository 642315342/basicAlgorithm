var BSTIterator = function(root) {
  this.arr = []
  this.index = 0
  qianxu = (node) => {
    if(!node) return 
    if(node.left) {
      qianxu(node.left)
    }
    this.arr.push(node.val)
    if(node.right) {
      qianxu(node.right)
    }
  }
  qianxu(root)
  this.len = this.arr.length - 1
};

/**
 * @return the next smallest number
 * @return {number}
 */
BSTIterator.prototype.next = function() {
  return this.arr[this.index++]
};

/**
 * @return whether we have a next smallest number
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
  return this.index <= this.len
};


class Tree {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}
let tree = new Tree(7)
tree.left = new Tree(3)
tree.right = new Tree(15)
// tree.left.left = new Tree(4)
// tree.left.right = new Tree(5)
tree.right.left = new Tree(9)
tree.right.right = new Tree(20)
// tree.left.left.left = new Tree(8)
// tree.left.right.right = new Tree(9)

iterator = new BSTIterator(tree);
console.log(iterator.next());    // 返回 3
console.log(iterator.next());    // 返回 7
console.log(iterator.hasNext()); // 返回 true
console.log(iterator.next());    // 返回 9
console.log(iterator.hasNext()); // 返回 true
console.log(iterator.next());    // 返回 15
console.log(iterator.hasNext()); // 返回 true
console.log(iterator.next());    // 返回 20
console.log(iterator.hasNext()); // 返回 false

