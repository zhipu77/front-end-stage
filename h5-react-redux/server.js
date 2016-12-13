var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
// var config = require('./webpack.config.prod')
var config = require('./webpack.config')

var express = require('express')
var app = express()
var port = 9000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { 
	noInfo: true, 
	publicPath: config.output.publicPath,
	hot: true,
	watchOptions: {
	    aggregateTimeout: 300,
	    poll: 1000 // is this the same as specifying --watch-poll?
	}
}))
app.use(webpackHotMiddleware(compiler))


app.use(express.static(__dirname + '/'));
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html')
})
app.get("/*", function(req, res) {
  res.sendFile(__dirname + '/index.html')
})
app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
