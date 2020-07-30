// 自定义Vue-Router
class MyRouter {
  constructor(options) { // options  router.js中 new Router({options}) 
    this.mode = options.mode || 'hash'; // 模式
    this.routes = options.routes || []; // routes 数组 
    this.routesMap = this._createMap(); 
    this.route = ''; // 当前路由
    this._init();
  }
  /**
   * 初始化 load或 hashchange/popstate 变化时更改当前路由
   */
  _init() {
    if(this.mode === 'hash') {
      window.location.hash = window.location.hash ? window.location.hash : '/';
      window.addEventListener('load', () => {
        this.route = window.location.hash.slice(1);
      });
      window.addEventListener('hashchange', () => {
        this.route = window.location.hash.slice(1);
      });
    }else {
      window.addEventListener('load', () => {
        this.route = window.location.pathname;
      });
      window.addEventListener('popstate', () => {
        this.route = window.location.pathname;
      });
    }
  }
  /**
   * 创建 routesMap 对应关系 简单; {'path': component}
   */
  _createMap() {
    return this.routes.reduce((res, cur) => {
      res[cur.path] = cur.component;
      return res;
    }, {})
  }
} 
// 定义插件
MyRouter.install = function(Vue) {
  // 单例
  if(MyRouter.install.installed) {
    return;
  }
  MyRouter.install.installed = true;

  Vue.mixin({
    beforeCreate() {
      if(this.$options && this.$options.router) {
        
        this._root = this; // 使每一个Vue实例都有一个属性_root 直接指向根实例  只有根实例有$options 及 _router
        this._router = this.$options.router; // 把我们的 插件 注册成为Vue组件的一个属性_router
        Vue.util.defineReactive(this._router, 'route') // 使用Vue提供的util工具 对新加属性_router 实现双向监听
      }
      else {
        this._root = this.$parent && this.$parent._root; // 使每一个Vue实例都有一个属性_root 直接指向根实例
      }
    }
  })
  // 注册组件router-view render当前路由对应的组件 routesMap中得到
  Vue.component('router-view', {
    render(h) {
      let current = this._self._root._router.route;
      return h(this._self._root._router.routesMap[current])
    }
  })

}
export default MyRouter;
