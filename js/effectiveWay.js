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
    console.log('realFontSize:' + realFontSize + ', ')
  }
}
