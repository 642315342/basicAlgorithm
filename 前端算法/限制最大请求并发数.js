let request = requestPoll(2)
request('aaa').then(res => {
  console.log(res)
})
request('bbb').then(res => {
  console.log(res)
})
request('ccc').then(res => {
  console.log(res)
})
request('ddd').then(res => {
  console.log(res)
})
request('eee').then(res => {
  console.log(res)
})
request('fff').then(res => {
  console.log(res)
})
request('ggg').then(res => {
  console.log(res)
})

function requestPoll(num) {
  let queue = [], curIdx = 0
  return function(url) {
    return new Promise((resolve, reject) => {
      queue.push({url, resolve, reject})
      return request()
    })
  }
  function request() {
      if(curIdx >= num || !queue.length) return
      curIdx++
      let {url, resolve, reject} = queue.shift()
      fetch(url)
      .then(
        (res) => resolve(res),
        (rej) => reject(rej)
      )
      .finally(() => {
        curIdx--
        if(curIdx < num) {
          request()
        }
      })
  }
}
function fetch(url) {
  return new Promise(res => {
    setTimeout(() => {
      res(url + '执行完成')      
    }, 1000);
  })
}