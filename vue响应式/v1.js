const data = {
  a: 11, b: 22
}

function reactive(data) {
  for(const key in data) {
    defineReactive(data, key)
  }
  return data
}
function defineReactive(data, key) {
    let val =  data[key]
    // 每个key都有自己的dep
    const dep = new dep()
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get() {
        dep.depend()
        return val
      },
      set(newVal) {
        dep.notify()
        val = newVal
      }
    })
    // val 是对象时候递归监听
    if(isObejct(val)) {
      reactive(val)
    }
}
let depId = 0
class Dep {
  constructor() {
    this.id = depId++
    this.subs = []
  }
  depend() {
    if(Dep.target) {
      this.subs.push(Dep.target)
    }
  }
  notify() {
    this.subs.forEach(watcher  => {
      watcher .updata()
    })
  }
}
Dep.target = null
const targetStack = []

function pushTarget(target) {
  targetStack.push(target)
  Dep.target = target
}
function popTarget() {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length-1]
}

class Watcher {
  constructor(getter) {
    this.getter = getter
    this.get()
  }
  get() {
    pushTarget(this)
    this.value = this.getter()
    popTarget()
    return this.value
  }
  updata() {
    this.get()
  }
}
