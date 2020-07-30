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
  let queue = [], curIndex = 1, obj = {}
  return function (url) {
    queue.push(url)
    fetch()
    return obj.p
  }
  function fetch() {
    obj.p = new Promise((resolve, reject) => {
      if(curIndex > num || !queue.length) return
      curIndex++
      let url = queue.shift()
      console.log(curIndex, url)
      req(url).then((res) => {
        resolve(res)
      })
      .then(() => {
        curIndex--
        if(curIndex < num) {
          return fetch()
        }
      })
    })
  }
  function req(url) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(url)
      }, 2000);
    })
  }
}