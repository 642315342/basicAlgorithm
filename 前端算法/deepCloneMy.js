const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const numTag = '[object Number]'
const strTag = '[object String]'
const objTag = '[object Object]'
const arrTag = '[object Array]'
const mapTag = '[object Map]'
const setTag = '[object Set]'

const deepTag = [objTag, arrTag, mapTag, setTag]

function getType(target) {
  return Object.prototype.toString.call(target)
}
function setRes(target) {
  return new target.constructor()
}

function isObject(target) {
  return target !== null && (typeof target === 'object' || typeof target === 'function')
}
function colneOtherTag(target, type) {
  const Con = target.constructor
  switch(type) {
    case boolTag:
    case strTag:
    case numTag:
    case dateTag:
      return new Con(target)
    default:
      return target
  }
}
function clone(target, map = new Map()) {
  if(!isObject(target)) {
    return target
  }
  let type = getType(target), res
  if(deepTag.includes(type)) {
    res = setRes(target) // 设置 res = {} [] map set
  } else {
    return colneOtherTag(target, type)
  }

  // 循环引用
  if(map.get(target)) {
    return map.get(target)
  }
  map.set(target, res)

  // map
  if(type === mapTag) {
    target.forEach((value, key) => {
      res.set(key, clone(value, map))
    })
    return res
  }
  // set
  if(type === setTag) {
    target.forEach((value) => {
      res.add(clone(value, map))
    })
    return res
  }
  // arr obj
  let keys = type === arrTag ? undefined : Object.keys(target)
  let forKeys = keys || target
  forKeys.forEach((val, key) => {
    keys ? res[val] = clone(target[val], map)
    : res[key] = clone(val, map)
  })
  return res
}


let m = new Map()
let map = new Map()
m.set({a: 1}, {a: 11})
m.set({b: 2}, {b: 22})


let obj = {
  a: m,
  b: {
    c: 1,
    d: [2,3,4]
  },
  e: 1,
  f: new Number(22),
  g: new Date(2012-10-10),
  h: /^\w+$/
}
obj.r = obj

let newObj = clone(obj)

console.log(newObj);
console.log(obj);

