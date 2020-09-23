class Bus {
  constructor() {
    this.callBacks = {}
  }
  $on (name, fn) {
    this.callBacks[name] = this.callBacks[name] ? this.callBacks[name] : []
    this.callBacks[name].push(fn)
  }
  $emit (name, args) {
    if (this.callBacks[name]) {
      this.callBacks[name].forEach(fn => {
        fn(args)
      });
    }
  }
}