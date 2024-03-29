const express = require('express')

const app = express()

const createError = require('http-errors')

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const commandRouter = require('./command/command.js')

app.use('/', commandRouter)

// catch 404 and forward to error handler
app.use(function error404(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function error(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json(err)
})

module.exports = app
