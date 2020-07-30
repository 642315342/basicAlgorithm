class Lru {
  constructor(max) {
    this.map = new Map()
    this.max = max
  }
  put(key) {
    if(this.subs.includes(key)) {
      let index = this.subs.indexOf(key)
      this.subs.splice(index, 1)
    }else {
      if(this.subs.length >= this.max) {
        this.subs.shift()
      }
    }
    this.subs.push(key)
  }
}

let res = new Lru(3)
res.put(1)
res.put(3)
console.log(res.subs);
res.put(4)
console.log(res.subs);
res.put(2)
console.log(res.subs);
res.put(3)
console.log(res.subs);


