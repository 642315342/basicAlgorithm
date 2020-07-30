function compose(fnArr) {
  function dispatch(i) {
    if(i === fnArr.length) return
    let fn = fnArr[i]
    return fn('', function next() {
      return dispatch(i+1)
    })
  }
  dispatch(0)
}

function f1(ctx, next) {
  console.log(1);
  next()
  console.log(2);
}
function f2(ctx, next) {
  console.log(3);
  next()
  console.log(4);
}
function f3(ctx, next) {
  console.log(5);
  next()
  console.log(6);
}
compose([f1, f2, f3])