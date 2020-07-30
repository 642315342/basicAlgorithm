// 03 then 返回promise
function MyPromise(executor) {
  this.status = 'pending'
  this.value = null

  this.onResolveCallbacks = []
  this.onRejectCallbacks = []

  resolve = (data) => {
    if(this.status === 'pending') {
      this.status = 'resolve'
      this.value = data
      this.onResolveCallbacks.forEach(resFn => resFn())
    }
  }

  reject = (data) => {
    if(this.status === 'pending') {
      this.status = 'reject'
      this.value = data
      this.onRejectCallbacks.forEach(rejFn => rejFn())
    }
  }

  try{
    executor(resolve, reject)
  } catch(e) {
    reject(e)
  }
}

MyPromise.prototype.then = function(onResolve, onReject) {
  onResolve = typeof onResolve === 'function' ? onResolve : res => res
  onReject = typeof onReject === 'function' ? onReject : rej => rej

  let promise2

  if(this.status === 'pending') {
    promise2 = new Promise((res, rej) => {
      this.onResolveCallbacks.push(() => {
        res(onResolve(this.value))
      })
      this.onRejectCallbacks.push(() => {
        rej(onReject(this.value))
      })
    })
  }
  if(this.status === 'resolve') {
    promise2 = new Promise((res, rej) => {
      res(onResolve(this.value))
    })
  }
  if(this.status === 'reject') {
    promise2 = new Promise((res, rej) => {
      rej(onReject(this.value))
    })
  }

  return promise2
}

let p = new MyPromise((res, rej) => {
  setTimeout(() => {
    res('111')
    // rej('222')
  }, 2000);
})

p.then((res) => {
  console.log('success1--->', res)
})
.then((res) => {
  console.log('success2--->', res)
})
