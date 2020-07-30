 // 如果promise是同步调用， 构造函数中resolve/reject 函数 都会立即执行，把status改成对应的状态，然后then中根据状态（resolve/reject）调用onResolve/onReject，并且此时data也是正确的
    // 但如果promise是异步的，构造函数中resolve/reject 函数 不会立即执行。此时会先执行then，（状态为pending）在then中分别给构造函数的onResolveCallback/onRejectCallback  添加回调，回调中函数中逻辑与状态resolve/reject中一样（保证同步异步都执行同样逻辑）
    // 然后等promise异步执行时会执行resolve/reject 函数， 此时执行添加的回调函数。
    function MyPromise(executor) {
        this.status = 'pending'; // Promise当前的状态
        this.data = null; // Promise的值
        // Promise resolve时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
        this.onResolveCallback = [];
        this.onRejectCallback = [];
        let self = this;

        function resolve(value) {
            // then 函数需要异步执行 onResolveCallback
            setTimeout(() => {
                if(self.status === 'pending') {
                    self.status = 'resolve';
                    self.data = value;
                    // 执行resolve的回调函数，将value传递到callback中
                    self.onResolveCallback.forEach(callback => callback(value));
                }
            });
        }

        function reject(reason) {
            // then 函数需要异步执行 onResolveCallback
            setTimeout(() => {
                if(self.status === 'pending') {
                    self.status = 'reject';
                    self.data = reason;
                    // 执行reject的回调函数，将reason传递到callback中
                    self.onRejectCallback.forEach(callback => callback(reason));
                }
            });
        }
        try {
            executor(resolve, reject);
        } catch(e) {
            reject(e)
        }
    }
/**
 * 对resolve 进行改造增强 针对resolve中不同值情况 进行处理
 * @param  {promise} promise2 promise1.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onFulfilled的返回值
 * @param  {[type]} resolve   promise2的resolve方法
 * @param  {[type]} reject    promise2的reject方法
 */
function resolvePromise (promise2, x, resolve, reject) {

    let then 
    let thenCalledOrThrow = false // 避免多次调用

    if (promise2 === x) { // 如果从onFulfilled中返回的x 就是promise2 就会导致循环引用报错
        reject(new TypeError('Chaining cycle detected for promise!'))
        return
    }

    // 如果x是一个我们自己写的promise对象 
    if (x instanceof MyPromise) {
        if (x.status === 'pending') { // 如果为等待态需等待直至 x 被执行或拒绝 并解析value值
            x.then(value => {
                resolvePromise(promise2, value, resolve, reject)
            }, err => {
                reject(err)
            })
        }  else { // 如果 x 已经处于执行态/拒绝态(值已经被解析为普通值)，用相同的值执行传递下去 promise
            x.then(resolve, reject)
        }
        return
    }

    // 如果 x 为对象或者函数
    if ((x !== null) && ((typeof x === 'function') || (typeof x === 'object'))) {
    try {
        then = x.then //because x.then could be a getter
        if (typeof then === 'function') { // 是否是thenable对象（具有then方法的对象/函数）
            then.call(x, value => {
                if (thenCalledOrThrow) return
                thenCalledOrThrow = true
                resolvePromise(promise2, value, resolve, reject)
                return
            }, err => {
                if (thenCalledOrThrow) return
                thenCalledOrThrow = true
                reject(err)
                return
            })
        } else { // 说明是一个普通对象/函数
            resolve(x)
        }
    } catch (e) {
        if (thenCalledOrThrow) return
        thenCalledOrThrow = true
        reject(e)
        return
    }
    } else {
        resolve(x)
    }

    }

    MyPromise.prototype.then = function(onResolve, onReject) {
        let self = this, promise2;
        // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
        onResolve = typeof onResolve === 'function' ? onResolve : function(value){return value};
        onReject = typeof onReject === 'function' ? onReject : function(reason){return reason};
        if(this.status === 'pending') {
            return promise2 = new MyPromise(function(resolve, reject) {
                try {
                    self.onResolveCallback.push(function(value) {
                        let x = onResolve(value);
                        resolvePromise(promise2, x, resolve, reject)
                        // if(x instanceof MyPromise) {
                        //     x.then(resolve, reject)
                        // }else {
                        //     resolve(x)
                        // }
                    })
                    self.onRejectCallback.push(function(reason) {
                        let x = onReject(reason);
                        resolvePromise(promise2, x, resolve, reject)
                        // if(x instanceof MyPromise) {
                        //     x.then(resolve, reject)
                        // }else {
                        //     reject(x)
                        // }
                    })
                } catch(e) {
                    reject(e)
                } 
            })
        }
        if(this.status === 'resolve') {
            return promise2 = new MyPromise(function(resolve, reject) {
                setTimeout(() => {
                    try {
                        let x = onResolve(self.data);
                        resolvePromise(promise2, x, resolve, reject)
                        // if(x instanceof MyPromise) {
                        //     x.then(resolve, reject)
                        // }else {
                        //     resolve(x)
                        // }
                        
                    } catch(e) {
                        reject(e)
                    }
                });

            })
        }
        if(this.status === 'reject') {
            return promise2 = new MyPromise(function(resolve, reject) {
                setTimeout(() => {
                    try {
                        let x = onReject(self.data);
                        resolvePromise(promise2, x, resolve, reject)
                        // if(x instanceof MyPromise) {
                        //     x.then(resolve, reject)
                        // }else {
                        //     resolve(x)
                        // }
                        
                    } catch(e) {
                        reject(e)
                    }
                });
            })
        }
    }