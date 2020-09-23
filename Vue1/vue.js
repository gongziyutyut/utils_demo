/* 
  声明一个Vue的类
*/
class Vue {
  constructor (options) {
    this.$options = options
    this.$data = options.data
    observer(this.$data)
    proxy(this) // 将data中的实例，挂载到this上面，用于简化书写
    new Compile(this.$options.el, this)
  }
}

/* 代理$data数据，便于调用 */

function proxy (vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get () {
        return vm.$data[key]
      },
      set (newVal) {
        vm.$data[key] = newVal
      }
    })
  })
}

class Observer {
  constructor (value) {
    this.value = value
    this.walker(this.value)
  }

  walker (obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    }) 
  }
}

function defineReactive (obj, key, val) {
  observer(val)
  let dep = new Dep()
  Object.defineProperty(obj, key, {
    get () {
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set (newVal) {
      observer(newVal)
      val = newVal
      dep.notify()
    }
  })
}

function observer (obj) {
  if (typeof obj === null || typeof obj !== 'object') return
  new Observer(obj)
}

/* 
  编译方式
*/
class Compile {
  constructor (el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    if (this.$el) {
      this.compile(this.$el)
    }
  }

  compile (el) {
    const self = this
    let childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (self.isElement(node)) {
        self.compileAttrs(node)
      } else if (self.isTextNode(node)) {
        self.compileText(node) 
      }
      if (node.childNodes) {
        self.compile(node)
      }
    })
  }

  compileText (node, exp) {
    const self = this
    this.update(node, RegExp.$1, 'text') // 初始话
  }

  // dir:要做的指令名称
  // 一旦发现一个动态绑定，都要做两件事情，首先解析动态值；其次创建更新函数
  // 未来如果对应的exp它的值发生变化，执行这个watcher的更新函数
  update(node, exp, dir) {
    // 初始化
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])
    // 针对key做了一个监听
    new Watcher(this.$vm, exp, val => {
      fn(node, val)
    })
  }

  textUpdater(node, val) {
    node.textContent = val
  }

  compileAttrs (node) {
    const self = this
    let nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      let attrName = attr.name
      let exp = attr.value
      /* 
        野鸡闷头钻，哪能上天王山？
        地上有的是米，喂呀，有根底！
        天王盖地虎
      */
      if (self.isEventHandler(attrName)) {
        let eventName = attrName.substring(1)
        node.addEventListener(eventName, function ($event) {
          self.$vm['$options']['methods'].call(self.$vm, $event)
        })
      } else if (self.isModel(attrName)) {
        node.addEventListener('input', function (event) {
          let newVal = event.target.value
          self.$vm[exp] = newVal
        })
      }
    })
  }

  isEventHandler (attrName) {
    return attrName[0] === '@'
  }

  isModel (attrName) {
    return attrName.indexOf('-model') > 0
  }

  isElement (node) {
    return node.nodeType === 1
  }

  isTextNode (node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
}

class Dep {
  constructor () {
    this.deps = []
  }
  addDep (w) {
    this.deps.push(w)
  }
  notify () {
    this.deps.forEach(w => {
      w.update()
    })
  }

}
class Watcher {
  constructor (vm, exp, updateFn) {
    this.$vm = vm
    this.key = exp
    this.updateFn = updateFn
    Dep.target = this
    vm[exp]
    Dep.target = null
  }

  update () {
    this.updateFn.call(this.$vm, this.$vm[this.key])
  }

}

