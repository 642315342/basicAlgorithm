function makeIterator(arr) {
  let index = 0
  return {
    next: function() {
      return index === arr.length
        ? { value: undefined, done: true }
        : { value: arr[index++], done: false }
    }
  }
}

let it = makeIterator([1,2,3])
console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())