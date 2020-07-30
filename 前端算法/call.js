let foo = {
  val: 'foo val'
}
let bar = {
  val: 'bar val',
  say(a) {
    console.log(this.val, a);
  }
}
Function.prototype.myCall = function(ctx, ...args) {
  if(typeof this !== 'function') {
    throw new Error('my error')
  }
  ctx = ctx || window
  const fn = Symbol('fn')
  ctx[fn] =this
  const res = ctx[fn](...args)
  delete ctx[fn]
  return res
}
bar.say.myCall(foo, '11')
