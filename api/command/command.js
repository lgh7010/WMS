const express = require('express')
const createError = require('http-errors')
const router = express.Router()

initRouter()

function initRouter(){
  router.post('/command/refresh', (req, res, next) => {
    try {
      let fileData = JSON.parse(req.body.jsonString.toString())
      router.stack = []
      initRouter()
      var resultList = []

      if(fileData.openapi){
        //swaggerJson인 경우
        Object.keys(fileData.paths).forEach(url => {
          Object.keys(fileData.paths[url]).forEach(method => {
            Object.keys(fileData.paths[url][method].responses).forEach(responseCode => {
              let content = fileData.paths[url][method].responses[responseCode].content

              if(content){
                Object.keys(content).forEach(type => {
                  let examples = fileData.paths[url][method].responses[responseCode].content[type].examples
                  Object.keys(examples).forEach(name => {
                    if(examples[name].value){
                      let r = JSON.stringify(JSON.parse(examples[name].value))
                      addApi('swagger', url, method, r)
                      resultList.push({
                        url: url,
                        method: method,
                        response: r
                      })
                    }
                  })
                })
              } else {
                let r = JSON.stringify({})
                addApi('swagger', url, method, r)
                resultList.push({
                  url: url,
                  method: method,
                  response: r
                })
              }
            })
          })
        })
      } else {
        //swaggerJson이 아닌 경우
        fileData.forEach(elem => {
          addApi('simple', elem.url, elem.method, JSON.parse(elem.response))
          resultList.push({
            url: elem.url,
            method: elem.method,
            response: elem.response,
          })
        })
      }

      res.json({
        result: true,
        resultMessage: '성공',
        data: resultList
      })
    } catch (error) {
      console.log(error)
      const status = error.response ? error.response.status || '500' : '500'
      next(createError(status))
    }
  })
  router.post('/command/stop', (req, res, next) => {
    router.stack = []
    initRouter()
  })
}
function addApi(type, url, method, response){
  if(url.startsWith('/') == false){
    url = '/' + url
  }
  while(url.includes('{')){
    url = url.replace('{', ':').replace('}', '')
  }
  switch (method.toLowerCase()){
    case "post":
      router.post(url, (req, res) => {
        if(type == 'swagger'){
          res.json(JSON.parse(response))
        } else {
          res.json(response)
        }
      })
      break
    case "get":
      router.get(url, (req, res) => {
        if(type == 'swagger'){
          res.json(JSON.parse(response))
        } else {
          res.json(response)
        }
      })
      break;
    case "put":
      router.put(url, (req, res) => {
        if(type == 'swagger'){
          res.json(JSON.parse(response))
        } else {
          res.json(response)
        }
      })
      break;
    case "patch":
      router.patch(url, (req, res) => {
        if(type == 'swagger'){
          res.json(JSON.parse(response))
        } else {
          res.json(response)
        }
      })
      break;
    case "delete":
      router.delete(url, (req, res) => {
        if(type == 'swagger'){
          res.json(JSON.parse(response))
        } else {
          res.json(response)
        }
      })
      break;
  }
}
module.exports = router
