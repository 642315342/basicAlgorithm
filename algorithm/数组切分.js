// function add(a) {
//   let res = a
//   function sum(b) {
//     res += b
//     return sum
//   }
//   sum.toString = function() {
//     return res
//   }
//   return sum
// }
function curry(fn) {
  let params = []
  function res(...args) {
    params = [...params, ...args]
    if(params.length >= fn.length) {
      return fn(...params)
    }else {
      return res
    }
  }
  return res
}

function add(x, y,z, a) {
  return x + y + z + a
}

let cur = curry(add)
console.log(cur(1,2,3)(4));

