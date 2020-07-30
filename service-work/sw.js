/**
 * 1. 与主线程独立不会被阻塞（不要再应用加载时注册sw）
 * 2. 完全异步，无法使用XHR和localStorage
 * 3. 可以拦截处理页面的所有网络请求(因此只支持https)，可以访问cache和indexDB，支持推送
 * 4. service worker是事件驱动的worker，生命周期与页面无关。
 */

 // 注册
 if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
}