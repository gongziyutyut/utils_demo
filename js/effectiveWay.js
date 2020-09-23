/* 
  工作中常用的js函数，用于提高效率
*/

// 常用的正则表达式

/* 
邮箱的正则匹配
以字母或者数字开头，然后贪婪匹配，中间加一个@
贪婪匹配字符和数字，再加一个.
然后以字符结尾，贪婪匹配2-4
*/
let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/

/* 
匹配手机号
/^1[0-9]{10}$/
经我完善后，取如下的校验规则，第二位数从3-8
*/
reg = /^1[3-8]\d{9}$/

/* 
匹配8-16位数字和字母密码的正则表达式
 */
reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{8,16}$/

/* 
匹配国内电话号码
*/
reg = /\d{3,4}-\d{7,8}/

/* 
匹配身份证号
身份证号包括旧身份证号15位和新身份证号18位，以及以字母结尾的号码
*/
reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}[dXx]$)/

/* 
匹配腾讯qq号
以1-9之间数字开头，然后贪婪匹配是数字
*/
reg = /[1-9]\d{4,}/

/* 
匹配ip地址
这是简单版本
*/
reg = /\d+\.\d+\.\d+\.\d+/

/* 
匹配中文，依据unicode码进行判断，并贪婪匹配
*/
reg = /^[\u4e00-\u9fa5]*$/

// 检测平台的设备类型
/* let isWechat = /micromessenger/i.test(navigator.userAgent),
    isWeibo = /weibo/i.test(navigator.userAgent),
    isQQ = /qq/i.test(navigator.userAgent),
    isIOS = /(iphone|ipod|ipad|ios)/i.test(navigator.userAgent),
    isAndroid = /android/i.test(navigator.userAgent) */

// 常用的日期时间函数
/* 
对时间进行格式化
包括统一24小时格式
*/
function formatTime (timeStamp) {
  let date = new Date(timeStamp)
  return date.getFullYear() + '年'
  + formatNumber(date.getMonth() + 1) + '月'
  + formatNumber(date.getDate()) + '日'
  + formatNumber(date.getHours()) + ':'
  + formatNumber(date.getMinutes())
}

// 格式化数字
function formatNumber (num) {
  return num >= 10 ? num : "0" + num
}

// 倒计时的时间格式化
function countdown (timestamp) {
  let day = Math.floor(timestamp/(24 * 3600 * 1000)), // 计算天数
  remainder1 = timestamp % (24 * 3600 * 1000), // 计算整天数后的余数(因为计算时以毫秒计算，所以余下的数依然是毫秒级)
  hour = Math.floor(remainder1/(3600 * 1000)),
  remainder2 = remainder1 % (3600 * 1000),
  minute = Math.floor(remainder2/(60 * 1000)),
  remainder3 = remainder2 % (60 * 1000),
  second = Math.floor(remainder3/1000)
  if (day) {
    return `${day}天${hour}时${minute}分${second}秒`
  } else if (hour) {
    return `${hour}时${minute}分${second}秒`
  } else if (minute) {
    return `${minute}分${second}秒`
  } else if (second) {
    return `${second}秒`
  }
}


/* 
跨终端事件处理
禁用表单enter键自动提交
*/
let isSupportTouch = ("ontouchstart" in document.documentElement) ? true : false
document.onkeydown = function (event) {
  let target, code, tag
  if (!event) {
    event = window.event
    target = event.srcElement
    code = event.keyCode
    if (code === 13) {
      tag = target.tagName
      if (tag == 'TEXTAREA') {
        return true
      } else {
        return false
      }
    } 
  } else {
     target = event.target
     code = target.keyCode
     if (code == 13) {
      tag = target.tagName
      if (tag == 'INPUT') {
        return false
      } else {
        return true
      }
     } 
  }
}

/* 
  移动端适配方案
  此移动端适配并不简单易懂
  实质上的移动端适配是rem适配或者1px适配
  思路：
    获取页面的宽度
*/
function adjustTo (win, doc) {
  let docDom = doc.documentElement,
  resizeEvt = 'orientationchange' in window ? 'orientationonchange' : 'change',
  recalc = function () {
    var clientWidth = docDom.clientWidth
    var fontSize = 20
    docDom.style.fontSize = fontSize + 'px'
    var docStyles = getComputedStyle(docDom)
    var realFontSize = parseFloat(docStyles.fontSize)
    var scale = realFontSize/fontSize
    console.log('realFontSize:' + realFontSize + ', scale:' + scale)
    fontSize = clientWidth/667 * 20
    if (isIphoneX()) fontSize = 19
    fontSize = fontSize/scale
    docDom.style.fontSize = fontSize + 'px'
  }
  if (!doc.addEventListener) return 
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
   // iphoneX判断
  function isIphoneX () {
    return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
  }
}

/* 
  xss预防
  对敏感符号进行转义，避免恶意脚本执行
  预防的是用户输入（如用户输入恶意代码，存储进入了服务器，此为存储型）
  又或者用户输入了恶意链接的代码，此为反射型
*/

function preventXSS (s) {
  let map = {
    '"': "&quote;",
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "\n": "&#10;"
  }
  return s.replace(/["<>&]/g, matchItem => {
    return map[matchItem]
  })
}

/* 
  常用的JS算法
  节流函数，此函数功能　——　在规定时间内只触发一次请求，时间过后再次触发（节流的作用就是稀释函数执行频率）
  防抖函数，此函数功能　——　在连续触发的事件中，只执行最后一次触发事件
*/
// 简洁版
function throttle(flag, callBack) {
  if (flag) { // flag是个全局变量
    flag = false
    setTimeout(function () {
      flag = true
      callBack
    }, 10000)
  }
}

/* 
复杂版
  思路大致相同，不过较为缜密
  外部传参——延迟时间
  当在限定时间内
*/
function throttle1 (fun, delay) {
  let last, deferTime   // 定义两个变量，用于取时间值和定时器
  return function (args) {   // 执行函数的结果是返回一个函数
    let that = this          // this此时为window对象
    let _args = arguments   // 取得函数参数对象(内层函数)
    let now = +new Date()   // 获取当前的时间
    if (last && now < last + delay) {   // 当上一次时间 存在 且 当前时间小于 上一次时间 + 延迟
      deferTime && clearTimeout(deferTime) // 清除定时器
      deferTime = setTimeout(function () {  // 定义定时器，内部的函数为给last赋值上当前的时间
        last = now
        fun.apply(that, _args)   // 调用传入的函数，同时绑定函数的this，并且将参数传入（但此时没有参数）
      }, delay)
    } else {
      last = now
      fun.apply(that, _args)  
    }
  }
}

/* 
  防抖函数（常用于mousemove，连续点击等等）
*/
function debounce (fun, delay) {
  return function (args) {
    let _this = this
    fun.id && clearTimeout(fun.id)
    fun.id = setTimeout(function () {
      fun.call(_this, args)
    }, delay)
  }
}

/* 观察者模式 ——发布订阅模式
  用于一对多的关系
  让多个观察者对象同时监听某一个主题对象，当主题对象状态发生变化，会通知所有的观察者
  应用场景：
  不同业务模块需要相互关联时（大家只关注一个入口就可以了）
*/
/* 
  详解：
    一个观察者包含：消息容器、订阅消息方法、取消订阅的方法、发送订阅消息的方法
    订阅消息的方法：
*/
let observer = (function () {
  let _message = {}
  return {
    //注册消息，将其添加进入消息容器
    /* 
      假设当前有3个订阅者，那么调用方法就是
      observer.regist('事件1'， sub1)
      observer.regist('事件1'， sub2)
      observer.regist('事件1'， sub3)
      那么有3个订阅者订阅了同一事件，此时代码执行，初始无此事件，然后相继添加
      _message{'事件1'：[sub1, sub2, sub3]}
    */
    regist: function (type, fn) {
      if (typeof _message[type] === 'undefined') {
        _message[type] = [fn]
      } else {
        _message[type].push(fn)
      }
    },
    /* 
      发布消息，observer.fire('事件1', 参数)
      一旦发布消息，那么所有的订阅者都将收到消息并触发执行
    */
    fire: function (type, args) {
      if (!_message[type]) {
        return
      }
      let events = {
        type: type,
        args: args || {}
      },
      i = 0,
      len = _message[type].length;
      for (; i < len; i++) {
        _message[type][i].call(this, events)
      }
    },
    remove: function (type, fn) {
      if (_message[type] instanceof Array) {
        let i = _message[type].length-1
        for (; i>=0; i--) {
          _message[type][i] == fn && _message.splice(i, 1)
        }
      }
    }
  }
})()

/* 
  另一个简单的例子
*/
  // 被观察者
var Publish = function (name) {
  this.name = name
  thiis.subscribers = []
}
// 被观察者发布消息的方法
Publish.prototype.deliver = function (news) {
  var publish = this // 被观察者的实例对象
  this.subscribers.forEach(item => {
    // 循环被观察者的 观察者容器——即循环所有观察者，为他们发布内容
    item(news, publish)
  })
  return this // 链式调用
}

// 观察者— 每一个观察者都是一个函数，在函数的原型上扩展方法
Function.prototype.subscribe = function (publish) {
  var sub = this // 观察者的实例对象
  // 没必要添加多个相同的观察者，没有意义
  var existFlag = publish.subscribers.some(item => item = sub)
  if (!existFlag) {
    publish.subscribers.push(sub)
  }
  return this
}

// 取消订阅——观察者取消订阅的办法
Function.prototype.unsubscibe = function (publish) {
  var sub = this // 观察者实例对象
  publish.subscribers = publish.subscribers.filter(item => item !== sub)
  return this
}


// 模板渲染方法
function templateRender (str, data) {
  return str.replace(/\{\{(\w+)\}\}/g, function(match, $1) {
    return typeof data[$1] === undefined ? '' : data[$1]
  })
}

// 冒泡排序
function bubble (data) {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length -i ; j++) {
      if (data[i] < data[j]) {
        swap(data, i, j)
      }
    }
  }
}

// 置换函数
function swap (arr, i, j) {
 /*  let mid = arr[j]   过于简单
  arr[j] = arr[i]
  arr[i] = mid */
  /* 这里用到了解构赋值，因为本质上是修改arr[i]即可，所以以下方法可行 */
  if (arr[i] === arr[j]) return
  [arr[i], arr[j]] = [arr[j], arr[i]]

}
// 数组去重
function uniqueArr (data) {
  return new Set(...data)
} 
/* 
  ES10的新特性应用
  Object.entries(),可以将对象转换为数组
  将键值对列表转换为数组，可以使用lodash或者Object.fromEntries()
*/

/* 
let obj = {name: '金庸', work: '作家', age: '94'}
console.log(Object.entries(obj))
以下为输出的数据格式
0: (2) ["name", "金庸"]
1: (2) ["work", "作家"]
2: (2) ["age", "94"]
*/


// 防止页面复制
 // 禁止右键菜单
 document.body.oncontextmenu = e => {
  console.log(e, '右键');
  return false;
  // e.preventDefault();
};
// 禁止文字选择。
document.body.onselectstart = e => {
  console.log(e, '文字选择');
  return false;
  // e.preventDefault();
};
// 禁止复制
document.body.oncopy = e => {
  console.log(e, 'copy');
  return false; 
  // e.preventDefault();
}
// 禁止剪切
document.body.oncut = e => {
  console.log(e, 'cut');
  return false;
  // e.preventDefault();
};
// 禁止粘贴
document.body.onpaste = e => {
  console.log(e, 'paste');
  return false;
  // e.preventDefault();
};
// css 禁止文本选择 这样不会触发js
/* body {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
} */
  
// 破解防复制：
/* 
  上面的防复制是通过js 和 css实现的
  因此要破解时就是通过禁用js和取消css中user-select来实现

  操作起来很容易，那就是打开控制台，禁用js
  若是不生效的话，那就找到 css取消 user-select
*/



