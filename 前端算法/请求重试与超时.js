let num = 3 // 最大次数
let time = 1000 // 轮询时间 
let overTime = 5000 // 超时时间
function fn() {
  console.log('发起一次请求')
  return new Promise(res => {
    setTimeout(() => {
      res('请求成功')
    }, 9900);
  })
}

loop(fn, time, num, overTime).then(res => {
  console.log('结果已有', res)
}, 
err => {
  console.log('结果已有', err)
})

function loop(fn, time, num, overTime) {
  let start = +new Date()
  let curNum = 0, timer
  return new Promise((resolve, reject) => {
    function next() {
      if(curNum > num) {
        clearInterval(timer)
        return reject('重试超过最大次数')
      }
      fn().then(
        res => {
          clearInterval(timer)
          return resolve(res)
        },
        err => {
          clearInterval(timer)
          return reject(err)
        }
      )
    }
    timer = setInterval(() => {
      let now = +new Date()
      if(now - start >= overTime) {
        clearInterval(timer)
        return reject('请求超时')
      }
      curNum++
      next()
    }, time)
  })
}