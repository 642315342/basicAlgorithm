const eventEmitter = require('events')
const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class Koa extends eventEmitter {
  constructor() {
    this.context = context
    this.request = request
    this.response = response
    this.middlewares = []
  }
  use(fn) {
    this.middlewares.push(fn)
    return this
  }
  compose(ctx, fnArrs) {
    function dispatch(i) {
      if (i === fnArrs.length) return Promise.resolve
      let fn = fnArrs[i]
      return Promise.resolve(fn(ctx, function next() {
        return dispatch(i+1)
      }))
    }
    return dispatch(0)
  }
  createContext(req, res) {
    let ctx = Obejct.create(this.context)
    let request = ctx.request = Obejct.create(this.request)
    let response = ctx.response = Obejct.create(this.response)
    ctx.req = request.req = response.req = req
    ctx.res = request.res = response.res = res
    request.ctx = response.ctx = ctx

    return ctx
  }
  handleRequest(req, res) {
    let ctx = this.createContext(req, res)
    let res = this.compose(ctx, this.middlewares)
    res.then(() => {
      res.end(ctx.body)
    })
  }
  listen(...args) {
    const server = http.createServer(this.handleRequest.bind(this))
    server.listen(...args)
  }
}