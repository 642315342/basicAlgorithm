function CancelToken(executor) {
  let resolvePromise
  this.promise = new Promise((resolve) => {
    resolvePromise = resolve
  })
  executor(resolvePromise)
}

let cancel
let a = new CancelToken(function(c) {
  cancel = c
})
a.promise.then(res => {
  console.log(res)
})

cancel(11)