// 01 最简单的promise  只支持同步
function MyPromise(executor) {
  this.status = 'pending'
  this.value = null

  resolve = (res) => {
    if(this.status === 'pending') {
      this.status = 'resolve'
      this.value = res
    }
  }

  reject = (err) => {
    if(this.status === 'pending') {
      this.status = 'reject'
      this.value = err
    }
  }
  try {
    executor(resolve, reject)
  } catch(e) {
    reject(e)
  }
}

MyPromise.prototype.then = function(onFufilled, onRejected) {
  if(this.status === 'resolve') {
    onFufilled(this.value)
  }
  if(this.status === 'reject') {
    onRejected(this.value)
  }
}

let p = new MyPromise((res, rej) => {
    res(111)
})

p.then(res => {
  console.log(res)
})