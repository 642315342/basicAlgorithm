class Tree {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}
let tree = new Tree(1)
tree.left = new Tree(2)
tree.right = new Tree(3)
tree.left.left = new Tree(4)
tree.left.right = new Tree(5)
tree.right.left = new Tree(6)
tree.right.right = new Tree(7)
tree.left.left.left = new Tree(8)
tree.left.right.right = new Tree(9)
/**
 * 递归 
 */
function xianxu(tree) {
  console.log(tree.val)
  if(tree.left) {
    xianxu(tree.left)
  }
  if(tree.right) {
    xianxu(tree.right)
  }
}
function zhongxu(tree) {
  if(tree.left) {
    zhongxu(tree.left)
  }
  console.log(tree.val)
  if(tree.right) {
    zhongxu(tree.right)
  }
}
function houxu(tree) {
  if(tree.left) {
    houxu(tree.left)
  }
  if(tree.right) {
    houxu(tree.right)
  }
  console.log(tree.val)
}
/**
 * 非递归
 */

function xianxu1(tree) {
  const xianxuArr = []
  xianxuArr.push(tree)
  while(xianxuArr.length) {
    let tree = xianxuArr.pop()
    console.log(tree.val);
    if(tree.right) {
      xianxuArr.push(tree.right)
    }
    if(tree.left) {
      xianxuArr.push(tree.left)
    }
  }
}
function zhongxu1(tree) {
  const xianxuArr = []
  while(xianxuArr.length !== 0 || tree !== null) {
    if(tree !== null) {
      xianxuArr.push(tree)
      tree = tree.left
    } else {
      let temp = xianxuArr.pop()
      console.log(temp.val)
      tree = temp.right
    }
  }
}
// 先序：中左右， 后序：左右中 -> 中右左 反向打印
// 先序：中左右，搞出 中右左 很简单
const houxuArr = []
function houxu1(tree) {
  const xianxuArr = []
  xianxuArr.push(tree)
  while(xianxuArr.length) {
    let temp = xianxuArr.pop()
    houxuArr.push(temp.val)
    if(temp.left) {
      xianxuArr.push(temp.left)
    }
    if(temp.right) {
      xianxuArr.push(temp.right)
    }
  }
}

function cengxu(tree) {
  const xianxuArr = []
  xianxuArr.push(tree)
  while(xianxuArr.length) {
    let tree = xianxuArr.shift()
    console.log(tree.val);
    if(tree.left) {
      xianxuArr.push(tree.left)
    }
    if(tree.right) {
      xianxuArr.push(tree.right)
    }
  }
}



function ceng(tree) {
  if(!tree) return []
  let res = [], first = []
  first.push(tree)
  while(first.length) {
    let q = [], len = first.length
    for(let i = 0; i < len; i++) {
      let temp = first.shift()
      q.push(temp.val)
      if(temp.left) {
        first.push(temp.left)
      }
      if(temp.right) {
        first.push(temp.right)
      }
    }
    res.push(q)
  }
  return res
}

console.log(ceng(tree));