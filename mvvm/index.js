
// 构造器实现数据代理——通过this调用，更加便捷
function MVVM (options) {
  this.data = options.data
  this.methods = options.methods
  const self = this
  Object.keys(this.data).forEach(key => {
    self.proxyData(key) // 通过defineProperty给this添加key
  }) 
  observer(this.data)  // 当数据劫持后，对数据进行检测
  new Compile(options.el, this) // 执行编译，将文档节点转为文档碎片
}

// 原型链，挂载实例的方法
MVVM.prototype = {
  proxyData: function (key) {
    const self = this
    Object.defineProperty(self, key, {
      get: function () {
        return self.data[key]
      },
      set: function (newVal, oldVal) {
        self.data[key] = newVal
      }
    })
  }
}



