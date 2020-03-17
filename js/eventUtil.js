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
  },
  getEvent: function (event) {
    return event ? event : window.event
  },
  getTarget: function (event) {
    return event.target || event.srcElement
  },
  preventDefault: function (event) {
    if (event.preventDefault) {
      event.preventDefault()
    } else {
      event.returnValue = false
    }
  }, 
  stopPropagation: function (event) {
    if (event.stopPropagation) {
      event.stopPropagation()
    } else {
      event.cancelBubble = true
    }
  }
}
