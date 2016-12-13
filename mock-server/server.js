const express = require('express')
const app = express()
const port = 9966
const errorType = require('./errorType')
const BASE = '/api'

//some mock modules
const login = require('./store/login')



// 1.3.1 登录接口  login  1.3.2 登录接口（成功返回用户信息）  login
app.post(BASE + "/login", function(req, res) {
  const caseId = req.query.caseId
  if(!caseId){
    res.send(errorType.ERR_CASEID_NULL)
    return 
  }
  if(typeof login[caseId]==='undefined'){
    res.send(errorType.ERR_CASEID_ERROR)
    return 
  }
  res.send(login[caseId])
})



app.get("/*", function(req, res) {
  // console.log('req--------------------------------------------')
  // console.log(req.url)
  // console.log(req.method)
  // console.log(req.query)
  res.send(errorType.ERR_URL_GET)
  
})

app.post('/*',function(req, res) {
  res.send(errorType.ERR_URL_POST)
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.Time is %s", port, port,new Date())
  }
})
