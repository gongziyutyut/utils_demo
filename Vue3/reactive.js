let targetMap = new WeakMap()
let toProxy = new WeakMap()
let toRaw = new WeakMap()
// 关于响应数据的处理！！！
const baseHandler  =  {
  get (target, key) {
    const res = Reflect.get(target, key)
    track(target, key)
    return typeof res === 'object' ? reactive(res) : res
  },
  set (target, key, val) {
    const info = {oldVal: target[key], newVal: val}
    const res = Reflect.set(target, key, val)
    trigger(target, key)
    return res
  }
}

function reactive (target) {
  let observerd = toProxy.get(target)
  if (observerd) return observerd
  if (toRaw.has(observerd)) return target
  observerd = new Proxy(target, baseHandler)
  toProxy.set(target, observerd)
  toRaw.set(observerd, target)
  return target
}

