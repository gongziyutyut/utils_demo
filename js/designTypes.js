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

createModel.getInstance = (function () {
  
})()