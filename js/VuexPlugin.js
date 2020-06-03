export default (store) => {
  if (localStorage) {
    let user = localStorage.getItem('user')
    store.commit('login', JSON.parse(user))
  }
  // 订阅
  store.subscribe((mutation, state) => {
    if (mutation.type === 'user/login') {
      localStorage.setItem('user', state['user/login'])
    }
  })
}