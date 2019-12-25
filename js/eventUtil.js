var EventUtil = {
  addFn: function (el, type, fn) {
      if (el.addEventListener) {
          el.addEventListener(type, fn, false)
      } else if (el.attachEvent) {
          el.attachEvent('on' + type, fn)
      } else {
          el['on' + type] = fn
      }
  },
  removeFn: function (el, type, fn) {
      if (el.removeEventListener) {
          el.removeEventListener(type, fn, false)
      } else if (el.detachEvent) {
          el.detachEvent('on' + type, fn)
      } else {
          el['on' + type] = null 
      }
  }
}
