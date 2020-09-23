// 需要数据变化的订阅者，实现数据检测
function Dep () { // 被观察者构造器
  this.subs = []
}

Dep.prototype = {
  add: function (obj) {
    this.subs.push(obj) // 添加观察者
  },
  notify: function () {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

function observer (data) {
  if (!data || typeof(data) !== 'object') {
    return
  }
  const self = this
  // 循环遍历data中的数据， 并定义响应
  Object.keys(data).forEach(key =>
    self.defineReactive(data, key, data[key])   
  )
}

function defineReactive (data, key, val) {
  var dep = new Dep()
  observer(val)  // 嵌套处理数据
  Object.defineProperty(data, key, {
    get: function () {
      if (Dep.target) { // Dep.target是有数据在html中应用时，才会创建出来
        dep.add(Dep.target)
      }
      return val
    },
    // 当通过this.xxx修改数据时，由于数据代理
    // self.data[key]发生变化，而它变化后，调用此处的set函数
    set: function (newVal) {
      if (val !== newVal) {
        val = newVal 
        dep.notify() // 当值有变化的时候，通知所有的观察者
      }
    }
  })
}

