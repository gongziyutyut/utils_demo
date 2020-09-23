const http = require('http')

let app = http.createServer((req, res) => {
    const {url, headers} = req
    let paramObj = handleUrl(url)
    res.end(paramObj.cb + '()')
})

function handleUrl (url) {
    let urlArr = url.split('?')
    let paramArr = urlArr[1].split('&')
    let obj = {}
    paramArr.forEach(param => {
        let [key, val] = param.split('=')
        obj[key] = val
    })
    return obj
}


app.listen(3000, () => {
    console.log('连接上');
})


