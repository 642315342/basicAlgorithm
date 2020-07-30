class Bus {
  constructor() {
    this.listens = {}
  }
  on(type, fn) {
    if(!this.listens[type]) {
      this.listens[type] = []
    }
    this.listens[type].push(fn)
  }
  emit(type, ...args) {
    if(this.listens[type]) {
      this.listens[type].forEach(fn => fn(...args))
    }
  }
  off(type, fn) {
    if(this.listens[type]) {
      let index = this.listens[type].indexOf(fn)
      if(index >= 0) {
        this.listens[type].splice(index, 1)
      }
    }
  }
}
// let bus = new Bus()
// function f1() {
//   console.log('去哪吃')
// }
// function f2(add) {
//   console.log(`去${add}吃把`)
// }
// function f3(add, add1) {
//   console.log(`${add}没啥好吃的，去${add1}吃`)
// }
// bus.on('eat', f1)
// bus.on('eat', f2)
// bus.on('eat', f3)
// bus.emit('eat', '食堂', '教室')
// console.log('-----------');

// bus.off('eat', f2)
// bus.emit('eat', '食堂', '教室')


class MyObserver {
  constructor() {
    this.subs = []
  }
  addObserver(watcher) {
    this.subs.push(watcher)
  }
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}
let uid = 0
class MyWatcher {
  constructor() {
    this.id = ++uid
  }
  update() {
    console.log(`我是${this.id}号观察者，我观察的对象有动静`)
  }
}
let w1 = new MyWatcher()
let w2 = new MyWatcher()
let ob = new MyObserver()
ob.addObserver(w1)
ob.addObserver(w2)
ob.notify()