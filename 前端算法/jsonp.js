// 页面写一个callback = show  服务器执行show(data)
// 页面上的show就会被执行
function show(data) {
  console.log(data, 'show');
}
function jsonp({url, params, callback}) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    // window[callback] = (data) => {
    //   resolve(data)
    //   document.body.removeChild(script)
    // }
    let arr = []
    for(let key in params) {
      arr.push(`${key}=${params[key]}`)
    }
    arr.push(`callback=${callback}`)
    script.src = `${url}?${arr.join('&')}`

    script.setAttribute('type', 'text/javascript')
    document.body.appendChild(script)
  })
}
jsonp({
  url: './a.js',
  params: { test: 'test', test1: 'test1' },
  callback: 'show'
}).then(data => {
  console.log(data, 'promise');
})