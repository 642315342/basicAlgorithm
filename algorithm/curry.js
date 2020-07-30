// fn.length 函数参数个数
function curry(fn, ...args1) {
  let length = fn.length
  return function(...args2) {
    let args = args1.concat(args2)
    if(args.length < length) {
      return curry.call(this, fn, ...args)
    }else {
      return fn.apply(this, args)
    }
  }
}
var fn = curry(function(a, b, c) {
  console.log([a, b, c]);
});

fn("a", "b", "c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
// fn("a")("b", "c") // ["a", "b", "c"]