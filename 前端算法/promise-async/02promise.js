// 02 让promise  支持异步 --> 增加回调函数
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

  if(this.status === 'pending') {
    this.onResolveCallbacks.push(() => {
      onResolve(this.value)
    })
    this.onRejectCallbacks.push(() => {
      onReject(this.value)
    })
  }
  if(this.status === 'resolve') {
    onResolve(this.value)
  }
  if(this.status === 'reject') {
    onReject(this.value)
  }
}

let p = new MyPromise((res, rej) => {
  setTimeout(() => {
    res('111')
    // rej('222')
  }, 1000);
})

p.then((res) => {
  console.log('success--->', res)
})
