// 04 处理resolve(x)    x本身是pormise的情况
function resolvePromise(promise2, x, resolve, reject) {
  if(promise2 === x) {
    return reject('循环引用')
  }
  if(x !== null && (typeof x === 'object' || typeof x === 'function')) {
    let called
    try {
      let then = x.then
      if(typeof then === 'function') {
        then.call(
          x,
          val => {
            if(called) return
            called = true
            resolvePromise(promise2, val, resolve, reject)
          },
          err => {
            if(called) return
            called = true
            reject(err)
          } 
        )
      } else {
        resolve(x)
      }
    } catch(e) {
      if(called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}
function MyPromise(executor) {
  this.value = null
  this.status = 'pending'

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
  try {
    executor(resolve, reject)
  } catch(e) {
    reject(e)
  }
}

MyPromise.all = function(promises) {
  let arr = [], len = promises.length
  return new MyPromise((resolve, reject) => {
    for(let i = 0; i < len;) {
      promises[i].then(
        res => {
          arr[i] = res
          if(i === len - 1) {
            return resolve(arr)
          }
          i++
        },
        rej => reject(rej)
      )
    }
  })
}


MyPromise.prototype.then = function(onResolve, onReject) {
  onResolve = typeof onResolve === 'function' ? onResolve : res => res
  onReject = typeof onReject === 'function' ? onReject : err => {throw err}

  let promise2
  if(this.status === 'pending') {
    promise2 = new MyPromise((res, rej) => {
      this.onResolveCallbacks.push(() => {
        setTimeout(() => {
          try {
            let x = onResolve(this.value)
            resolvePromise(promise2, x, res, rej)
          } catch(e) {
            rej(e)
          }
        })
      })
      this.onRejectCallbacks.push(() => {
        setTimeout(() => {
          try {
            let x = onReject(this.value)
            resolvePromise(promise2, x, res, rej)
          } catch(e) {
            rej(e)
          }
        })
      })
      
    })
    
  }
  if(this.status === 'resolve') {
    promise2 = new MyPromise((res, rej) => {
      setTimeout(() => {
        try {
          let x = onResolve(this.value)
          resolvePromise(promise2, x, res, rej)
        } catch(e) {
          reject(e)
        }
      })
    })
  }
  if(this.status === 'reject') {
    promise2 = new MyPromise((res, rej) => {
      setTimeout(() => {
        try {
          let x = onReject(this.value)
          resolvePromise(promise2, x, res, rej)
        } catch(e) {
          reject(e)
        }
      })
    })
  }
  return promise2
}

MyPromise.prototype.catch = function(onReject) {
  return this.then(null, onReject)
}



const first = () => (new Promise((resolve,reject)=>{
  console.log(3);
  let p = new Promise((resolve, reject)=>{
       console.log(7);
      setTimeout(()=>{
         console.log(5);
         resolve(6); 
      },0)
      resolve(1);
  }); 
  resolve(2);
  p.then((arg)=>{
      console.log(arg);
  });

}));

first().then((arg)=>{
  console.log(arg);
});
console.log(4);

