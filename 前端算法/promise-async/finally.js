// 1. executor 必须是函数
function MyPromise(executor) {
  if(typeof executor !== 'function') {
    throw new Error('executor 必须是一个函数')
  }
  this.value = null
  this.status = 'pending'

  this.onResolveCallbacks = []
  this.onRejectedCallbacks = []

  resolve = (data) => {
    if(this.status === 'pending') {
      this.status = 'resolved'
      this.value = data
      this.onResolveCallbacks.forEach(fn => fn())
    }
  }
  reject = (data) => {
    if(this.status === 'pending') {
      this.status = 'rejected'
      this.value = data
      this.onRejectedCallbacks.forEach(fn => fn())
    }
  }

  try {
    executor(resolve, reject)
  } catch(e) {
    reject(e)
  }
}

MyPromise.prototype.then = function(onResolve, onReject) {
  // 穿透
  onResolve = typeof onResolve === 'function' ? onResolve : res => res
  onReject = typeof onReject === 'function' ? onReject : err => { throw err }

  let promise2

  if(this.status === 'pending') {
    promise2 = new MyPromise((resovle, reject) => {
      this.onResolveCallbacks.push(() => {
        setTimeout(() => {
          try {
            let x = onResolve(this.value)
            resolvePromise(promise2, x, resovle, reject)
          } catch(e) {
            reject(e)
          }
        });
      })
      this.onRejectedCallbacks.push(() => {
        setTimeout(() => {
          try {
            let x = onReject(this.value)
            resolvePromise(promise2, x, resovle, reject)
          } catch(e) {
            reject(e)
          }
        });
      })
    })
  }
  if(this.status === 'resolved') {
    promise2 = new MyPromise((resovle, reject) => {
      setTimeout(() => {
        try {
          let x = onResolve(this.value)
          resolvePromise(promise2, x, resovle, reject)
        } catch(e) {
          reject(e)
        }
      });
    })
  }
  if(this.status === 'rejected') {
    promise2 = new MyPromise((resovle, reject) => {
      setTimeout(() => {
        try{
          let x = onReject(this.value)
          resolvePromise(promise2, x, resovle, reject)
        } catch(e) {
          reject(e)
        }
      })
    })  
  }
  return promise2
}
MyPromise.prototype.catch = function(fn) {
  return this.then(null, fn)
}
function resolvePromise(promise2, x, resovle, reject) {
  if(promise2 === x) {
    reject(new Error('循环引用'))
  }
  if(x instanceof MyPromise) {
    if(x.status === 'pending') {
      x.then(
        res => resolvePromise(promise2, res, resovle, reject),
        err => reject(err)
      ) 
    }else {
      resolve(x)
    }
  }
  if(x && (typeof x === 'object' || typeof x === 'function')) {
    let called
    try {
      let then = x.then
      if(typeof then === 'function') {
        then.call(
          x,
          res => {
            if(called) return 
            called = true
            resolvePromise(promise2, res, resovle, reject)
          },
          err => {
            if(called) return 
            called = true
            reject(err)
          }
        ) 
      } else{
        resolve(x)
      }
    } catch(e) {
      reject(e)
    }
  } else {
    resolve(x)
  }
}

MyPromise.resolve = function(value) {
  if(value instanceof MyPromise) {
    return value
  } else if(typeof value === 'object' && typeof value.then === 'function') {
    return new MyPromise(res => value.then(res))
  } else {
    return new MyPromise((res => res(value)))
  }
}

MyPromise.reject = function(value) {
  return new MyPromise((res, rej) => rej(value))
}

MyPromise.all = function(promises) {
  let arr = [], len = promises.length
  return new MyPromise((resolve, reject) => {
    for(let i = 0; i < len; i++) {
      promises[i].then(
        res => {
          arr[i] = res
          i++
          if(i === len) {
            resolve(arr)
          }
        },
        rej => reject(rej)
      )
    }
  })
  
}
MyPromise.race = function(promises) {
  return new MyPromise((resolve, reject) => {
    for(let i = 0; i < promises.length; i++) {
      promises[i].then(
        res => resolve(res),
        rej => reject(rej)
      )
    }
  })
}

let p1 = new MyPromise((resolve, reject)=>{
  setTimeout(()=>{
    resolve(111);
  }, 1000)
}); 
let p2 = new MyPromise((resolve, reject)=>{
  setTimeout(()=>{
    reject(222); 
  }, 2000)
}); 
let p3 = new MyPromise((resolve, reject)=>{
  setTimeout(()=>{
    resolve(333); 
  }, 3000)
}); 

MyPromise.race([p1, p2, p3])
.then(res => console.log('res', res))
.catch(res => console.log('catch', res))