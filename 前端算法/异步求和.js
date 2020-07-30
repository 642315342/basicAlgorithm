function addSum(...args) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      let sum = args.reduce((add, i) => add + i)
      res(sum)
    }, 1000);
  })
}
addSum(1,2,3,4).then(res => console.log(res))


function sum(a) {
  function add(b) {
    a += b
    return add
  }
  add.toString = function() {
    return a
  }
  return add
}
console.log(sum(1));
console.log(sum(1)(2));
console.log(sum(1)(2)(3));
console.log(sum(1)(2)(3)(4));
