// 1. 简单bind
let foo = {
  value: 'foo value'
};
function bar(name, age) {
  console.log(this.value);
  console.log(name);
  console.log(age);
}

Function.prototype.myBind1 = function (ctx, ...args) {
  const self = this
  function fn(...args1) {
    self.apply(ctx, args.concat(args1))
  }
  return fn
}
let bind1 = bar.myBind1(foo, 'zhangsan')
// bind1(20)


function bar(name, age) {
  this.habit = 'shopping';
  // this.value = 'bar value'
  console.log(this.value);
  console.log(name);
  console.log(age);
}

bar.prototype.friend = 'kevin';
Function.prototype.myBind2 = function (ctx, ...args) {
  const self = this // this --> bar
  function fn(...args1) {
    // this --> bindFoo
    self.apply(this instanceof self ? this : ctx, args.concat(args1))
  }
  fn.prototype = this.prototype
  return fn
}

// var bindFoo = bar.myBind2(foo, 'daisy');

// var obj = new bindFoo('18'); //new时候把this指向了bindBar(fn)
// console.log(bindFoo.habit);
// console.log(obj.friend);







function Animal(name, color) {
  this.name = name;
  this.color = color;
}
Animal.prototype.say = function () {
  return `I'm a ${this.color} ${this.name}`;
};

const Cat = Animal.myBind2(null, 'cat');
const cat = new Cat('white');
if (cat.say() === 'I\'m a white cat' &&
  cat instanceof Cat && cat instanceof Animal) {
  console.log('success');
}


console.log(cat.say());
