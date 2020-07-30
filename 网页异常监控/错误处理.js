/** 
 * try-catch： 捕获可以预测的错误， 只能捕获同步错误
 * onerror: 可以捕获异步, 不能捕获promise 
 * 捕获资源加载错误
 * 由于网络请求异常不会事件冒泡，因此必须在捕获阶段将其捕捉到才行，
 * 但是这种方式虽然可以捕捉到网络请求的异常，但是无法判断 HTTP 的状态是 404 还是其他比如 500 等等，
 * 所以还需要配合服务端日志才进行排查分析才可以。  window.addEventListener('error', function(e) {}, true)
 * unhandlerejection: 代替promise.catch，return true阻止浏览器打印
 * load/unload: 页面崩溃
 * 错误上报： img
 */