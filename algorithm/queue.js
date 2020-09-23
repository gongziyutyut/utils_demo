function Queue () {
  /* this.items = [] */
}
Queue.prototype = {
  items: [],
  enqueue: function (item) {
    this.items.push(item)
  },
  dequeue: function () {
    return this.items.shift()
  },
  head: function () {
    return this.items[0]
  },
  tail: function () {
    return this.items[this.items.length - 1]
  },
  size: function () {
    return this.items.length
  },
  isEmpty: function () {
    return this.items.length === 0
  },
  clear: function () {
    this.items = []
  },
  getItems: function () {
    return this.items
  }
}
// 应用场景
/* 约瑟夫环 */
let queue = new Queue()
for (let i = 0; i < 100; i++) {
  queue.enqueue(i)
}

function findLastOne () {
  let len = queue.size()
  let index = 1
  while (len > 1) {
    if (index % 3 == 0) {
      queue.dequeue()
    } else {
      const num = queue.dequeue()
      queue.enqueue(num)
    }
    index++
    len = queue.size()
  }
  console.log(queue.getItems())
}

// 斐波那契数列
function fibonacci (n) {
  let queue = new Queue()
  let arr = []
  queue.enqueue(1)
  queue.enqueue(1)
  let index = 1
  while (index < n-2) {
    queue.dequeue()
    const item = queue.head()
    arr.push(item)
    
  } 
}

module.exports = Queue