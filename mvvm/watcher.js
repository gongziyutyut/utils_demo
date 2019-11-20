function Watcher (vm, exp, cb) {
  this.vm = vm
  this.exp = exp
  this.cb = cb
  this.value = this.get()
}

Watcher.prototype = {
  update: function () {
    this.run()
  },

  get: function () {
    Dep.target = this
    const val = this.vm.data[this.exp]  
    Dep.target = null
    return val
  },

  run: function () {
    const value = this.vm.data[this.exp]
    const oldVal = this.value
    if (oldVal !== value) {
      this.value = value
      this.cb.call(this.vm, value)
    }
  }

}
