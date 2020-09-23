function Stack () {

}

Stack.prototype = {
  items: [],
  push: function (item) {
    this.items.push(item)
  },
  pop: function () {
    return this.items.pop()
  },
  top: function () {
    return this.items[0]
  },
  isEmpty: function () {
    return this.items.length === 0
  },
  size: function () {
    return this.items.length
  },
  clear: function () {
    this.items = []
  }

}

/* 
  栈元素的应用场景：
    中序表达式转后序表达式
    后序表达式计算
*/