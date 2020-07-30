let url = require('url')

let proto = {
  get url() { // 这样就可以用ctx.request.url上取值了，不用通过原生的req
    return this.req.url
  },
  get path() {
    return url.parse(this.req.url).pathname
  },
  get query() {
    return url.parse(this.req.url).query
  },
  get body() {
    return this.response.body
  },
  set body(val) {
    this.response.body = val
  }
} // proto同源码定义的变量名

// function defineGetter(prop, name) {
//   Object.defineProperty(proto, name, {
//     get() {
//       return this[prop][name]
//     }
//   })
// }

// defineGetter('request', 'url')
// defineGetter('request', 'path')

module.exports = proto