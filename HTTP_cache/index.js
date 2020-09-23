const http = require('http')
const crypto = require('crypto')
const app = http.createServer((req, res) => {
  const {url} = req
  switch (url) {
    case '/':
      res.end(`
        <html>
          <head>
            <meta charset="UTF-8">
          </head>
          请求HTMl是 ${updateTime()}
          <script src="main.js"></script>
        </html>
      `)
      break;
    case '/main.js':
      const content = `document.write('<br> JS update in ${updateTime()}')`
      // res.setHeader('Expires', new Date(Date.now() + 3 * 1000).toUTCString())
      res.setHeader('Cache-Control', 'no-cache')
      const hash = crypto.createHash('sha1').update(content).digest('hex')
      res.setHeader('Etag', hash)
      if (req.headers['if-none-match'] === hash) {
        console.log('协商缓存');
        res.statusCode = 304
        res.end()
        return
      }
      res.statusCode = 200
      res.end(content)
     /*  res.setHeader('Cache-Control', 'no-cache')
      res.setHeader('last-modified', new Date().toUTCString())
      if (req.headers['if-modified-since'] && new Date(req.headers['if-modified-since']).getTime() + 10 * 1000 > Date.now()) {
        console.log('协商缓存');
        res.statusCode = 304
        res.end()
      } else {
        res.statusCode = 200
        res.end(content)
      } */
      break;
    case '/favicon.ico':
      res.end('')
      break;
  }
  
})

app.listen(3000, () => {
  console.log('启动服务！');
})

function updateTime() {
  setInterval(() => this.time = new Date().toUTCString(), 1000)
  return this.time
}

module.exports = updateTime