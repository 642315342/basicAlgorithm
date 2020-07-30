function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say = function() {
  console.log('hello')
}
let p = new Person('za', 20)
console.log(p.name, p.age)
p.say()

/**
 * 1. new obj  临时对象
 * 2. obj.__proto__ = Person.prototype  临时对象与原型挂钩
 * 3. const res = Person.call(obj, ...args)  执行构造函数， 改变this指向， this.name = name 把name挂载到obj上 
 * 4. 当构造函数有返回值，并且是一个对象时，实例为该返回值而不是obj
 * 4. return typeof res === 'object' ? res :  obj
 */