/**
 * 检测页面崩溃
 * 1. 利用window.load/beforeunload 在load时，sessionStorage记录一个变量good_exit: pending， 在beforeunload
 * 时记录good_exit: true。 当第二次打开页面根据good_exit判断是否崩溃。
 * 问题：（1）此方案只有在崩溃时再次刷新页面才能知道是崩溃了，但用户一般会直接关闭网页/浏览器，则sessionStorage记录失效。
 *      （2） 若用localStroage的话， 用户不关闭之前的，重新打开一个新的页面，则会判断为崩溃。
 * 
 * 2. 利用sericer-worker
 * (1)Service Worker 有自己独立的工作线程，与网页区分开，网页崩溃了，Service Worker 一般情况下不会崩溃；
 * (2)Service Worker 生命周期一般要比网页还要长，可以用来监控网页的状态；
 * (3)网页可以通过 navigator.serviceWorker.controller.postMessage API 向掌管自己的 SW 发送消息。
 * 
 * 浏览器每5s向SW发送一次心跳（id: SW通过id来区分不同页面），beforeunload时向SW发送一次unload信息
 * 
 * SW 监听message 如果是heartbeat则更新该页面心跳时间，如果第一次（！timer）则每10检查一次时间， 若超时则上报
 * 
 * 如果是unload则在pages中删除该页面。
 * 
 * 
 */
// 浏览器
if (navigator.serviceWorker.controller !== null) {
  const HEARTBEAT_INTERVAL = 5 * 1000 // 每五秒发一次心跳
  const sessionId = uuid()
  function heartbeat() {
    navigator.serviceWorker.controller.postMessage({
      type: "heartbeat",
      id: sessionId,
      data: {}, // 附加信息，如果页面 crash，上报的附加数据
    })
  }
  window.addEventListener('beforeunload', () => {
    navigator.serviceWorker.controller.postMessage({
      type: "unload",
      id: sessionId,
    })
    clearInterval(timer)
    timer = null
  })
  const timer = setInterval(heartbeat, HEARTBEAT_INTERVAL)
  heartbeat()
}

// SW
const CHECK_TIME = 10 * 1000 // 检测时间
const DELAY_TIME = 15 * 1000 // 超时时间
const pages = {}

function check() {
  for(const id in pages) {
    const now = +new Date()
    if(now - pages[id].time > DELAY_TIME) {
      // 上报 crash
      delete pages[id]
    }
  }
  if(!Object.keys(pages).length) {
    clearInterval(timer)
    timer = null
  }
}

Worker.addEventListener('message', (e) => {
  const data = e.data
  if(data.type === 'heartbeat') {
    pages[data.id] = {time: +new Date()}
    if(!timer) {
      timer = setInterval(check, CHECK_TIME)
    }
  }else if(data.type === 'unload') {
    delete pages[id]
  }
})

