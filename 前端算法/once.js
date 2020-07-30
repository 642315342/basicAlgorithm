function once(fn) {
  fn()
}
let one = once(function() {
  console.log(111)
})

one()