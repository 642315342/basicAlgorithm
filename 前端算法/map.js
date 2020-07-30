



Array.prototype.mysplice = function(from, num, ...args) {
  let res = []
  let rest = []
  let pre = []
  let len = this.length
  let cur = from
  // 把多余的存起来
  for(let i = from + num; i < len; i++) {
    rest.push(this[i])
  }
  // 记录要删除的
  for(let i = from; i < from + num; i++) {
    res.push(this[i])
  }
  // 添加中间的（参数传入的）
  for(let i = 0; i < args.length; i++) {
    this[cur++] = args[i]
  }
  // 添加刚剩的
  for(let i = 0; i < rest.length; i++) {
    this[cur++] = rest[i]
  }
  
  return res
}
let arr = [2, 3, 5, 8]
let arr1 = [2, 3, 5, 8]
let a = arr.splice(2,1,1,1)

console.log('arr', arr);
console.log('a', a);
let b = arr1.mysplice(2,1,1,1)
console.log('arr1', arr1);
console.log('b', b);
