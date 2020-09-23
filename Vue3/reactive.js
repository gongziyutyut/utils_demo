
const isObject = val => {
  return typeof val !== null && typeof val === 'object'
}
const toProxy = new WeakMap()
const toRaw = new WeakMap()
const effectStack = []
const targetMap = new WeakMap()

function reactive (obj) {
  if (typeof obj !== 'object') return
  if (toProxy.has(obj)) { // 避免重复代理
    return toProxy.get(obj)
  }
  if (toRaw.get(obj)) {
    return obj
  }
  let observed = new Proxy(obj, {
    get (target, key) {
      console.log(`拦截get:${key}`)
      let res = Reflect.get(target, key)
      track (target, key)
      return isObject(res) ? reactive(res) : res
    },
    set (target, key, value) {
      console.log(`拦截set:${key}`)
      if (target[key] !== value && (!(target instanceof Array))) {
        let ret = Reflect.set(target, key, value)
        trigger(target, key)
        return ret
      }
      if (target instanceof Array) {
        if (key === 'length') return true
        Reflect.set(target, key, value)
        return true
      }
    },
    deleteProperty (target, key) {
      console.log(`拦截delete:${key}`)
      let ret = Reflect.deleteProperty(target, key)
      trigger(target, key)
      return ret
    }
  })
  toProxy.set(obj, observed)
  toRaw.set(observed, obj)
  return observed
}

function effect (fn) {
  const rxEffect = () => {
    try {
      effectStack.push(rxEffect)
      fn.apply(this, arguments)
    } finally {
      effectStack.pop()
    }
  }
  rxEffect()
  return rxEffect
}


function track (target, key) {
  const effect = effectStack[effectStack.length - 1]
  if (effect) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      depsMap = new Map()
      targetMap.set(target, depsMap)
    }
    let deps = depsMap.get(key)
    if (!deps) {
      deps = new Set()
      depsMap.set(key, deps)
    }
    if (deps.has(effect)) {
      deps.add(effect)
    }
  }
}

function trigger (target, key) {
  const depsMap = targetMap.get(target)
  if (depsMap) {
    const deps = depsMap.get(key)
    if (deps) {
      deps.forEach(effect => effect())
    }
  }
}





let testObj = reactive({
  a: 3,
  b: {
    a: 4
  },
  c: [1,2,43]
})
effect(() => {
  console.log('依赖收集', testObj.a)
})

testObj.a = 4

/* testObj.a
testObj.a = 4
delete testObj.a */

/* let targetMap = new WeakMap()
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
} */

