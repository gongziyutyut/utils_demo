// 设置
(function (win, doc) {
  let Query = function (selector, context) {
    return new Query.fn.init(selector, context)
  }
  Query.fn = Query.prototype = {
    constructor: Query,
    init: function(selector, context) {
      /* 
        设置元素长度
        默认获取元素的上下文
        id选择符，按位非将-1转化为0
      */
      this.length = 0
      contenxt = context || document
      if (~selector.indexOf('#')) {
        // ~(A) = -(A+1)
        this[0] = document.getElementById(selector.slice(1))
        this.length = 1
      } else {
        let doms = context.getElementsByTagName(selector),
        i = 0,
        len = doms.length;
        for (; i < len; i++) {
          this[i] = doms[i]
        }
        this.context = context
        this.selector = selector
        return this
      }
    },
    // 增强数组
    push: [].push,
    sort: [].sort,
    splice: [].splice
  }
  // 方法扩展
  Query.extend = Query.fn.extend = function () {
    // 扩展对象从第二个参数算起
    let i = 1,
    len = arguments.length,
    target = arguments[0],
    j;
    if (i === len) {
      target = this
      i--
    }
    // 将参数对象合并到target
    for (; i < len; i++) {
      for (j in arguments[i]) {
        target[j] = arguments[i][j]
      }
    }
    return target
  }
  // 扩展事件方法
  Query.fn.extend({
    on: (function () {
      if (document.addEventListener) {
        return function (type, fn) {
          let i = this.length - 1
          for (; i >= 0 ; i--) {
            this[i].addEventListener(type, fn, false)
          } 
          return this
        }
      } else if (document.attachEvent) {
        return function (type, fn) {
          let i = this.length - 1 
          for (; i >= 0; i--) {
            this[i].attachEvent(`on${type}`, fn)
          }
          return this
        }
      }
    })()
  })
  // 将分割线转换为驼峰式
  Query.extend({
    camelCase: function (str) {
      return str.replace(/\-(\w)/g, function (all, letter) {
        return letter.toUpperCase()
      })
    }
  })
  // 设置css
  Query.extend({
    css: function () {
      let arg = arguments,
      len = arg.length;
      if (this.length < 1) {
        return this
      }
      if (len === 1) {
        if (typeof arg[0] === 'string') {
          if (this[0].currentStyle) {
            return this[0].currentStyle[arg[0]]
          } else {
            return getComputedStyle(this[0], false)[arg[0]]
          }
        } else if (typeof arg[0] === 'object') {
          for (let key in arg[0]) {
            for (let j = this.length -1; j >= 0; j--) {
              this[j].style[Query.camelCase(key)] = arg[0][key]
            }
          }
        }
      } else if (len === 2) {
        for (let j = this.length - 1; j >= 0; j--) {
          this.[j].style[Query.camelCase(arg[0])] = arg[1]
        }
      }
      return this
    }
  })
   // 设置属性
   Query.extend({
    attr: function () {
      let arg = arguments
      
    }
  })
})(window)