const http = require('http')
const eventEmitter = require('events')
let context = require('./context')
let request = require('./request')
let response = require('./response')

class Koa extends eventEmitter {
  constructor() {
    super()
    this.fn = undefined
    this.middlewares = []
    this.context = context // 将三个模块保存，全局的放到实例上
    this.request = request
    this.response = response
  }
  use(fn) {
    this.middlewares.push(fn)
    // this.fn = fn
  }
  createContext(req, res) {
    const ctx = Object.create(this.context)
    const request = ctx.request = Object.create(this.request)
    const response = ctx.response = Object.create(this.response)
    // 请仔细阅读以下眼花缭乱的操作，后面是有用的
    ctx.req = request.req = response.req = req
    ctx.res = request.res = response.res = res
    request.ctx = response.ctx = ctx
    request.response = response
    response.request = request
    return ctx

  }
  compose(middlewares, ctx) {
    function dispatch(i) {
      if(i === middlewares.length) return Promise.resolve()
      let middleware = middlewares[i]
      return Promise.resolve(middleware(ctx, () => dispatch(i+1)))
    }
    return dispatch(0)
  }
  handleRequest(req, res) {
    res.statusCode = 404
    let ctx = this.createContext(req, res)
    // this.fn(ctx)
    let composeFn = this.compose(this.middlewares, ctx)
    composeFn.then(() => {
      if(typeof ctx.body == 'object'){ // 如果是个对象，按json形式输出
        res.setHeader('Content-Type', 'application/json;charset=utf8')
        res.end(JSON.stringify(ctx.body))
      }
      //  else if (ctx.body instanceof Stream){ // 如果是流
      //     ctx.body.pipe(res)
      // }
      else if (typeof ctx.body === 'string' || Buffer.isBuffer(ctx.body)) { // 如果是字符串或buffer
          res.setHeader('Content-Type', 'text/html charset=utf8')
          res.end(ctx.body)
      } else {
          res.end('Not found')
      }
    }).catch(err => { // 监控错误发射error，用于app.on('error', (err) =>{})
        this.emit('error', err)
        res.statusCode = 500
        res.end('server error')
    })
  }
  listen(...args) {
    const server = http.createServer(this.handleRequest.bind(this))
    server.listen(...args)
  }
}

let app = new Koa()

app.use(async (ctx, next) => {
  console.log(1)
  await next()
  console.log(2)
})
app.use(async (ctx, next) => {
  console.log(3)
  let p = new Promise((resolve, roject) => {
      setTimeout(() => {
          console.log('3.5')
          resolve()
      }, 1000)
  })
  await p.then()
  await next()
  console.log(4)
  ctx.body = 'hello world'
})



app.listen(3334)
