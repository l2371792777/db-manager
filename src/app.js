const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const userApiRouter=require('./routes/api/user')
const accountViewRouter = require('./routes/view/account')
const accountApiRouter = require('./routes/api/account')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))


// routes
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(accountViewRouter.routes(), accountViewRouter.allowedMethods())
app.use(accountApiRouter.routes(), accountApiRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
