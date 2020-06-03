(function () {
  function XHR (win) {
    this.init().apply(this, arguments)
  }
  XHR.prototype = {
    init: () => {
      this.xhr = this.create()
    },

    create: () => {
      let xhr = null
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
      } else if (window.ActiveXObject) {
        xhr = new ActiveXObject('Msml2.Xmlhttp')
      } else {
        xhr = new ActiveXObject('Microsoft.Xmlhttp')
      }
      return xhr
    },
    readyState: (callback) => {
      this.xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this,status === 200) {
          callback && callback(this.responseText)
        }
      }
    },

    handleParam: (data) => {
      var dataStr = ""
      if (data && Object.prototype.call(data).toString() === '[object Object]') {
        for (let key in data) {
          dataStr += key + '=' + data[key] + '&'
        }
        dataStr = dataStr.substring(0, dataStr.length - 1)
      }
      return dataStr
    },

    get: (url, data, callback) => {
      this.readyState(callback)
      let dataStr = this.handleParam(data)
      let newUrl = url + '?' + dataStr
      this.xhr.open('get', newUrl, true)
      this.xhr.send(null)
    }
  }
  win.XHR = XHR
})(window)

(function (win) {
  function LocalSDK () {
    
  }
  LocalSDK.prototype = {
    needUpdate: (function () {
      return localStorage.getItem('version') !== resource
    })(),

    // 能力检测
    isIE : (function () {
      let i = 0
      let divDom = document.createElement('div')
      let all = document.getElementsByTagName(i)
      while (
        divDom.innerHTML = `<!-- [if gt IE>${++v}]><i></i> -->`
      ) {}
      return i > 0
    })(),

    checkHedge: function () {
      let len = localStorage.length
      let localStorageSize = 0
      for (let i = 0; i < len; i++) {
        let key = localStorage.key[i]
        localStorageSize += localStorage[key].length
      }
      return localStorageSize
    },

    startup: function () {
      if (localStorageSign === 'on' && !isIE && window.localStorage) {
        if (needUpdate) {
          // 进行存取
        } else {
          // 取出缓存
        }
      } else {
        // 是IE，需要特殊处理
      }
    },

    save: function () {
      try {
        localStorage.set('version', this.version)
      } catch(err) {
        localStorage.clear()
        localStorage.set('version', this.version)
      }
      for (let i = 0; i < resourceList.length; i++) {
        let key = resourceList[i].id
        let xhr = new XHR()
        xhr.get(resourceList[i].url, '', function (data) {
          try {
            localStorage.setItem(key, data)
          } catch (err) {
            if (err.name === 'QuotaExceededError') {
              localStorage.clear()
              localStorage.setItem(key, data)
            }
          }
        })
        // 加载到页面
      }
    }

  }
  win.LocalSDK = LocalSDK
})(window)