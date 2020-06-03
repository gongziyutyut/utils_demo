let Vue
class Router {
  constructor (options) {
    this.$options = options
    Vue.util.defineReactive(this, 'current', '/')
    this.routeMap = {}
    this.$options.routes.forEach(item => {
      this.routeMap[item.path] = item.component
    })
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))
  }

  onHashChange () {
    this.current = window.location.hash.slice(1)
    console.log(this.current)
  }
}

Router.install = (_Vue) => {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })

  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        default: ''
      }
    },
    render (h) {
      return  h('a', {
        attrs: {
          href: '#' + this.to
        }
      }, this.$slots.default)
    }
  })

  Vue.component('router-view', {
    render (h) {
      let component = null
      const {current, routeMap} = this.$router
      component =routeMap[current]
      return h(component)
    }
  })
}
export default Router