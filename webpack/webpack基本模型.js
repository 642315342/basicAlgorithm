// main.js
  // 通过 CommonJS 规范导入 show 函数
  const show = require('./show.js')
  // 执行 show 函数
  show('Webpack');
// show.js
  function show(content) {
    window.document.getElementById('app').innerText = 'Hello,' + content;
  }
  // 通过 CommonJS 规范导出 show 函数
  module.exports = show;

// main.js 中 import show.js main.js作为webpack的入口
// webpack打包后的函数 是一个立即执行函数  参数是一个数组， 每一项是每一个chunk（此时为[main.js, show.js]）
// 所有内容都会被包一层函数function (module, exports, __require) {}
(function (modules) {
  const installedModules = {}
  function __require(moduleId) {
    if(installedModules[moduleId]) {
      return installedModules[moduleId].exports
    }
    const module = (installedModules[moduleId] = {
      // 模块在数组中的 index
      i: moduleId,
      // 该模块是否已经加载完毕
      l: false,
      // 该模块的导出值
      exports: {}
    })
    module.exports = installedModules[moduleId].call(module.exports, module, module.exports, __require)
    module.l = true
    return module.exports
  }

  return __require(0)

})([
  // main.js 
  function (module, exports, __require) {
    // __require 参数为需要导入模块的index, 此处为1
    const show = __require(1)
    show('webpack')
  },
  function (module, exports, __require) {
    function show(content) {
      window.document.getElementById('app').innerText = 'Hello,' + content;
    }
    // 通过 CommonJS 规范导出 show 函数
    module.exports = show;
  },
])








