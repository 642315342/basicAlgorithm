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
