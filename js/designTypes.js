/* 
  单例模式：一个类只生成一个实例
  并不是调用后只生成一个实例，而是暴露出来的方法，只能获得唯一实例
*/

const singleCase = function (name) {
  this.name = name
  this.instance = null
}

singleCase.prototype.getName = function () {
  console.log(this.name)
}

singleCase.getCase = function (name) {
  if (!this.instance) {
    this.instance = new singleCase(name)
  }
  return this.instance
}

var a = singleCase.getCase('a')
var b = singleCase.getCase('b')

/* 
  单例模式的应用
  createModel——生成弹窗，只生成唯一一个
*/
function createModel () {
  let div = document.createElement('div')
  div.style.display = "none"
  div.innerHTML = '弹出框'
  document.body.appendChild(div)
  return div 
}

const getInstance = function (fn) {
  let result
  return function () {
    if (result) {
      return result
    }
    return result = fn.apply(this, arguments)
  }
}

/* 
  调用时，getInstance(createModel), 可以生成唯一的变量，且不会重复
*/



/* 
  策略模式，两种表现形式
*/
const strategies = {
  A: function (salary) {
    return salary * 3
  },
  B: function (salary) {
    return salary * 2
  },
  C: function (salary) {
    return salary * 1
  }
}

const calculateSalary = function (type, salary) {
  return strategies[type](salary)
}

// 另一种形式

const A = function (salary) {
  return salary * 3
}
const B = function (salary) {
  return salary * 2
}
const C = function (salary) {
  return salary * 1
}

const calulator = function (fn, salary) {
  return fn(salary)
}


/* 
代理模式：
代理对象和本体对象具有一致的接口，对使用者极其友好
代理模式种类很多，但是JS常用 虚拟代理 和 缓存代理

当使用代理模式实现图片预加载时，不令图片自身加载
而是通过代理对象来实现预加载（实现一个加载的图片）
*/

const myImage = (function () {
  const image = document.createElement('img')
  document.body.appendChild(image)
  return {
    setSrc: function (src) {
      image.src = src
    }
  }
})()

const proxyImage = (function () {
  const img = new Image()
  img.onload = function () {
    myImage.setSrc = this.src
  }
  return {
    setSrc: function (src) {
      myImage.setSrc = './loading.gif'
      img.src = src
    }
  }
})()

// 调用时proxyImage.setSrc(src)，通过img先加载，
// 加载成功的事件中，再将地址赋给自己需要的元素！！！


/* 
  缓存代理

*/
const mult = function() {
  let a = 1
  for (let i = 0, l; l = arguments[i++];) { // for循环中第二个变量为布尔值判断，undefined时为false，跳出循环
    a = a * l
  }
  return a
}

const proxyMult = (function () {
  const cache = {}
  return function () {
    const tag = Array.prototype.join.call(arguments, ',')
    if (cache[tag]) {
      return cache[tag]
    }
    return  cache[tag] = mult.apply(this, arguments)
  }
})()

/* 
  命令模式
*/

// 设置命令
const setCommand = function (button, command) {
  button.onClick = function () {
    command.execute()
  }
}

// 命令内容、
const menu = {
  updateMenu: function () {
    console.log('更新菜单')
  }
}

//  声明命令
const UpdateCommand = function (receive) {
  return {
    execute: receive.updateMenu
  }
}

const updateCommand = UpdateCommand(menu) // 返回一个命令 

// setCommand(el, updateCommand)  执行命令

/* 
  组合模式
*/

const macroCommand = function () {
  return {
    list: [],
    add: function (command) {
      this.list.push(command)
    },
    execute: function() {
      this.list.forEach(item => {
        item.execute()
      })
    }
  }
}

const commandCon1 = macroCommand()
const commandCon2 = macroCommand()


const command1 = {
  execute: function () {
    console.log('执行命令1')
  }
}
const command2 = {
  execute: function () {
    console.log('执行命令2')
  }
}
const command3 = {
  execute: function () {
    console.log('执行命令3')
  }
}
commandCon1.add(command1)
commandCon2.add(command2)
commandCon2.add(command3)

const bigCon = macroCommand()
bigCon.add(commandCon1)
bigCon.add(commandCon2)
bigCon.execute()


const Folder = function (folder, level) {
  this.folder = folder
  this.level = level
  switch (level) {
    case 1:
    case 2:
      this.list = []
      break;
    case 3:
      break;
  }
}

Folder.prototype.add = function (folder) {
  switch (this.level) {
    case 1:
      if (folder.level == 1) return
      this.list.push(folder)
      break;
    case 2:
      if ([1, 2].indexOf(folder.level) > -1) return
      this.list.push(folder)
      break;
    case 3:
      console.log('No Adding Files')
      break;
  }
}

Folder.prototype.scan = function () {
  console.log('扫描文件夹：', this.folder)
  if(this.list) {
    this.list.forEach(item => {
      item.scan()
  })
  }
}

const folder = new Folder('根文件夹', 1)
const folder1 = new Folder('JS', 2)
const folder2 = new Folder('life', 2)
const folder3 = new Folder('深入React技术栈.pdf', 3)
const folder4 = new Folder('JavaScript权威指南.pdf', 3)
const folder5 = new Folder('小王子.pdf', 3)

folder.add(folder1)
folder.add(folder2)
folder2.add(folder3)
folder2.add(folder4)
folder2.add(folder5)
folder.scan()

/* 
模板方法模式：
在继承的基础上，在父类中定义好执行的算法
采用子类原型链接到父类实例的方式继承
*/
function Pub () {}

Pub.prototype.firstStep = function () {
  console.log("烧开水")
}
Pub.prototype.second = function () {}
Pub.prototype.third = function () {
  console.log("搅拌，装杯")
}
Pub.prototype.fourth = function () {}
Pub.prototype.init = function () {
  this.firstStep()
  this.second()
  this.third()
  this.fourth()
}
const tea = function () {}
const coffee = function () {}
tea.prototype = new Pub()
coffee.prototype = new Pub()
tea.prototype.second = function () {
  console.log("加入茶叶，搅拌")
}
tea.prototype.fourth = function () {
  console.log("加入柠檬")
}
coffee.prototype.second = function () {
  console.log("加入咖啡，搅拌")
}
coffee.prototype.fourth = function () {
  console.log("加入糖")
}

/* 
享元模式：
它是优化程序设计的模式，本质是减少对象创建的个数
适用情形：
有大量相似对象，占用了大量内存
对象中的大部分状态可以抽离为外部状态

示例：模特衣服展示——50套男装，50套女装
*/

function Model (gender) {
  this.gender = gender
}

Model.prototype.takePhoto = function () {
  console.log(this.gender + '穿着' + this.underWear)
}

const male = new Model('male')
const female = new Model('femal')

for (let i = 0; i < 50; i++) {
  male.underWear = `第${i}套衣服`
  male.takePhoto()
}

// 优化

const modelFactory = (function () {
  const modelGender = {}
  return {
    createModel: function (gender) {
      if (modelGender[gender]) {
        return modelGender[gender]
      }
      modelGender[gender] = new Model(gender)
    }
  }
})()

const modelManager = function () {
  const modelObj = {}
  return {
    add: function (gender, i) {
      modelObj[i] = {
        underWear: `第${i}套衣服`
      }
      return modelFactory.createModel(gender)
    },
    copy: function (model, i) {
      model.underWear = modelObj[i].underWear
    }
  }
}



// 职责链模式优化
const order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay) {
    console.log('500 元定金预购, 得到 100 元优惠券')
  } else {
    return 'nextSuccess'
  }
}
const order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay) {
    console.log('200 元定金预购, 得到 50 元优惠券')
  } else {
    return 'nextSuccess'
  }
}
const orderNomal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log('普通购买, 无优惠券')
  } else {
    console.log('库存不够, 无法购买')
  }
}

 /* 某电商针对已付过定金的用户有优惠政策, 
  在正式购买后, 已经支付过 500 元定金的用户会收到 100 元的优惠券, 
  200 元定金的用户可以收到 50 元优惠券, 没有支付过定金的用户只能正常购买。 
  orderType: 表示订单类型, 1: 500 元定金用户；2: 200 元定金用户；3: 普通购买用户
  pay: 表示用户是否已经支付定金, true: 已支付；false: 未支付
  stock: 表示当前用于普通购买的手机库存数量, 已支付过定金的用户不受此限制*/

  // 职责链模式优化
  const order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay) {
    console.log('500 元定金预购, 得到 100 元优惠券')
  } else {
    return 'nextSuccess'
  }
}
const order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay) {
    console.log('200 元定金预购, 得到 50 元优惠券')
  } else {
    return 'nextSuccess'
  }
}
const orderNomal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log('普通购买, 无优惠券')
  } else {
    console.log('库存不够, 无法购买')
  }
}


// 链路代码
const chain = function(fn) {
  this.fn = fn
  this.successor = null
}

chain.prototype.setNext = function (successor) {
  this.successor = successor
}

chain.prototype.init = function () {
  const result = this.fn.apply(this, arguments)
  if (result === 'nextSuccess') {
    this.successor.init.apply(this.successor, arguments)
  }
}

const order500C = new chain(order500)
const order200C = new chain(order200)
const orderNomalC = new chain(orderNomal)
order500C.setNext(order200C)
order200C.setNext(orderNomalC)
order500C.init(1, false, 10)


/* 
  中介者模式
  一场测试结束后, 公布结果: 告知解答出题目的人挑战成功, 否则挑战失败。
*/

const player = function (name) {
  this.name = name
  playerMiddle.add(name)
}

player.prototype.win = function () {
  playerMiddle.win(this.name)
}

player.prototype.lose = function () {
  playerMiddle.lose(this.name)
}

const playerMiddle = (function () {
  let players = [],
  winArr = [],
  loseArr = []
  return {
    add: function (name) {
      players.push(name)
    },
    win: function (name) {
      winArr.push(name)
      if (winArr.length + loseArr.length === players.length) this.show()
    },
    lose: function (name) {
      loseArr.push(name)
      if (winArr.length + loseArr.length === players.length) this.show()
    },
    show: function () {
      for (let winner of winArr) {
        console.log(winner + 'success')
      }

      for (loser of loseArr) {
        console.log(loser + 'fail')
      }
    }
  }
})()

const a = new player('A选手')
const b = new player('B选手')
const c = new player('C选手')
b.win()
a.lose()
c.lose()

/* 
  装饰者模式
  使用AOP装饰函数实现装饰者模式
*/

Function.prototype.after = function (fn) {
  const _this = this   // 此时的this代指Function的实例，即函数对象，保存调用的函数
  return function () {
    var res = _this.apply(this, arguments) // 调用原函数
    fn.apply(this, arguments) // 调用传入的函数
    return res // 返回的res
  }
} 

Function.prototype.before = function (fn) {
  const _this = this
  return function () {
    fn.apply(this, arguments) // 先执行插入前面的函数
    return _this.apply(this, arguments) // 再执行自身函数
  }
}

const wear1 = function() {
  console.log('穿上第一件衣服')
}

const wear2 = function() {
  console.log('穿上第二件衣服')
}

const wear3 = function() {
  console.log('穿上第三件衣服')
}

wear2.before(wear1).after(wear3)


/* 
  状态模式：  每种状态用对象来保存
*/

const obj = {
  "weakLight" : {
    press: function () {
      console.log('开启强光')
      this.currentState = obj.strongLight
    }
  },
  "strongLight" : {
    press: function () {
      console.log('关闭灯光')
      this.currentState = obj.offLight
    }
  },
  "offLight" : {
    press: function () {
      console.log('开启弱光')
      this.currentState = obj.weakLight
    }
  }
}

const Light = function () {
  this.currentState = obj.offLight
}
Light.prototype.init = function () {
  let btn = document.createElement('button')
  btn.innerHTML = '开关'
  document.body.appendChild(btn)
  let _this = this
  btn.onclick = function () {
    _this.currentState.press.call(_this)
  }
}
new Light().init()


/* 观察者模式之vue的双向绑定 */

const vm = new MVVM({
  dataa: {
    number: 1
  }
})

/* 通常调用number时，我们调用方式 —— vm.data.number
  我们要实现的是 vm.number因此有以下代码
*/
function MVVM (options) {
  this.data = options.data
  const self = this
  Object.keys(this.data).forEach(key => {
    self.proxyKeys(key)  // 实现每个值改动后，自动将值更改（又因为this.data引用了options.data，所以一变都变）
  })
}

MVVM.prototype = {
  proxyKeys : function (key) {
    const self = this  // 此时的this代表的是MVVM实例
    Object.defineProperty(this, key, {
      get() {
        return self.data[key]
      },
      set(newVal) {
        self.data[key] = newVal
      } 
    })
  }
}

/* 代理data中的数据后，要对它进行监测
  通过 observer函数
  监听对象的变化，获取值时，自动调用get方法，改动了值，则会调用set
*/
let data = {
  number: 0
}
data.number = 1
//当数据有变化时，要通知观测者

function Dep () {
  this.subs = []
}

Dep.prototype = {
  add: function (obj) {
    this.subs.push(obj)
  },
  notify: function () {
    this.subs.forEach(item => {
      item.update()
    })
  }
}  

function observer (data) {
  if (!data || typeof data !== 'object') {
    return
  }
  const self = this
  Object.keys(data).forEach(key => {
    self.defineReactive(data, key, data[key])
  })
}

function defineReactive (data, key, value) {
  var dep = new Dep()
  observer(value) 
  Object.defineProperty(data, key, {
    get: function() {
      if (Dep.target) {
        dep.add(Dep.target) // 添加订阅者
      }
      return value
    },
    set: function (newVal) {
      if (value !== newVal) {
        value = newVal
        dep.notify() // 当值有变动时，进行通知
      }
    }
  })
}

/* 监视器watcher中的 Dep 和  sub 
  Watcher的作用：作为observer和compile之间的桥梁
  a、当自身实例化时，向订阅器中添加了自己
  b、当数据发生了变化时，dep.notify通知时，能调用自身的update函数，触发compile绑定的回调函数实现视图更新
*/
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
  run: function () {
    if (value !== oldValue) {
      this.cb.call(this.vm, value)
    }
  },
  get: function () {
    Dep.target = this
    const value = this.vm.data[this.exp] // 当执行完这一句时，已经将Dep.target作为观察者了
    Dep.target = null
    return value
  }
}

/* 
  compile编译的实现
  在遍历解析的过程会多次操作dom，为了提高性能，我们要减少操作dom
  因此我们使用文档碎片——fragment
*/

function Compile (el, vm) {
  this.vm = vm
  this.el = document.querySelector(el)
  this.fragment = null
  this.init()
}

Compile.prototype = {
  init: function () {
    if (this.el) {
      this.fragment = this.nodeToFragment(this.el) // 将dom节点转换为文档碎片
      this.compileElement(this.fragment)
      this.el.appendChild(this.fragment)
    }
  },
  nodeToFragment: function (el) {
    const fragment = document.createDocumentFragment()
    let child = el.firstChild // 
    while (child) {
      fragment.appendChild(child)
      child = el.firstChild
    }
    return fragment
  },

  compileText: function (node, exp) {
    const self = this
    const initText = this.vm[exp]
    this.updateText(node, initText)
    new Watcher(this.vm, exp, function (value) {
      self.updateText(node, value)
    })
  },

  compileEvent: function (node, vm, exp, dir) {
    const eventType = dir.split(':')[1]
    const cb = vm.methods && vm.methods[exp]
    if (eventType && cb) {
      node.addEventListener(eventType, cb.bind(vm), false)
    }
  },

  compileModel: function (node, vm, exp) {
    let val = vm[exp]
    const self = this
    this.modelUpdater(node, val)
    node.addEventListener('input', function (event) {  // 双向绑定还是借助于input来实现
      const newVal = event.target.value
      self.vm[exp] = newVal
    })
  },

  compileElement: function () {

  }

}
























