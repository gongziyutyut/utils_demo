let Vue
class Store {
  constructor (options) {
    this.$options = options
    this.vm = new Vue({
      data : {
        $$state: this.$options.state
      }
    })

    this._mutations = options.mutations
    this._actions = options.actions
    const store = this
    const {commit, dispatch} = store // 拿到实例对象中的方法，对方法换装
    this.commit = (type, payload) => {
      commit.call(this, type, payload)
    }
    this.dispatch = (type, payload) => {
      dispatch.call(this,type, payload)
    }
    this.vm.computed = {}
    for (let key in this.$options.getters) {
      this.vm.computed[key] = () => {
        return this.$options.getters[key](store.state)
      }
    }
  }

  get state () {
    return this.vm._data.$$state
  }

  get getters () {
    let obj = {}
    for (let key in this.vm.computed) {
      obj [key] = this.vm.computed[key]()
    }
    return obj
  }
  
  commit (type, payload) {
    let entry = this._mutations[type]
    if (entry) {
      entry(this.state, payload)
    }
  }

  dispatch(type, payload) {
   let entry = this._actions[type]
   if (entry) {
      entry(this.state, payload)
    }
  }

}

function install (_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      } 
    }
  })
}

export default {
  Store, install
}