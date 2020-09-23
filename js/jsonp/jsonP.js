function jsonp (url, params, cb) {
    return new Promise((resolve, reject) => {
        var scriptNode = document.createElement('script')
        let jointArr = []
        for (let key in params) {
            jointArr.push(`${key}=${params[key]}`)
        }
        jointArr.push(`cb=${cb}`)
        let newUrl = url + '?' + jointArr.join('&')
        scriptNode.src = newUrl
        document.body.appendChild(scriptNode)
        scriptNode.onload = function () {
            resolve()
        }
    })
}

