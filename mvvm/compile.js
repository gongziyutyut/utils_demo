function Compile (el, vm) {  
  this.vm = vm
  this.el = document.querySelector(el)
  this.fragment = null
  this.init()
}

Compile.prototype = {
  init: function () {
    if (this.el) {
      this.fragment = this.nodeToFragment(this.el)
      this.compileElement(this.fragment)
      this.el.appendChild(this.fragment)
    }
  },
  nodeToFragment: function (el) {
    const fragment = document.createDocumentFragment()
    let child = el.firstChild
    while (child) {
      fragment.appendChild(child)
      child = el.firstChild
    }
    return fragment
  },

  compileElement: function (el) {
    const childNodes = el.childNodes
    const self = this
    Array.prototype.forEach.call(childNodes, function (node) {
      const reg = /\{\{(.*)\}\}/
      const text = node.textContent
      if (self.isElementNode(node)) {
        self.compile(node)
      } else if (self.isTextNode(node) && reg.test(text)) {
        self.compileText(node, reg.exec(text)[1]) 
        // reg.exec(text)返回与正则组匹配的数组
        // 先匹配的第一个为 {{}}， 第二个为花括号中的东西
      }
      if (node.childNodes && node.childNodes.length) {
        self.compileElement(node)
      }
    })
  },

  compile: function (node) {
    const nodeAttrs = node.attributes
    const self = this
    Array.prototype.forEach.call(nodeAttrs, function (attr) {
      const attrName = attr.name
      const exp = attr.value
      const dir = attrName.substring(2)
      if (self.isDirective(attrName)) {  // 检查属性名包含v-
        if (self.isEventDirective(dir)) { // 判断指令是否是事件指令
          self.compileEvent(node, self.vm, exp, dir) // 调用编译事件
        } else {
          self.compileModel(node, self.vm, exp) // 编译指令
        }
      }
    })
  },

  compileText: function (node, exp) {
    const self = this
    const initText = this.vm[exp]
    this.updateText(node, initText) // 初始话
    new Watcher(this.vm, exp, function (value) {
      self.updateText(node, value)
    })
  },

  compileEvent: function (node, vm, exp, dir) {
    const eventType = dir.split(':')[1]
    const cb = vm.methods && vm.methods[exp]
    if (eventType && cb) {
      node.addEventListener(eventType, cb.bind(vm), false)
    }
  },

  compileModel: function (node, vm, exp) {
    let val = vm[exp]
    const self = this
    this.nodeUpdater(node, val)
    node.addEventListener('input', function (event) {
      const newValue = event.target.value
      self.vm[exp] = newValue   // 实现view 到 model的绑定
    })  
  },

  updateText: function (node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value
  },

  nodeUpdater: function (node, value) {
    node.value = typeof value == 'undefined' ? '' : value
  },

  isEventDirective: function (dir) {
    return dir.indexOf('on:') === 0
  },

  isDirective: function (attr) {
    return attr.indexOf('v-') === 0
  },

  isElementNode: function (node) {
    return node.nodeType === 1
  },

  isTextNode: function (node) {
    return node.nodeType === 3
  }
}
