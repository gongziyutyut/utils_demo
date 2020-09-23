const Queue = require('./queue')



function Stack () {
    this.q1 = new Queue()
    this.q2 = new Queue()
    this.data_que = null
    this.emp_que = null
}

Stack.prototype = {
    initQueue () {
        if (this.q2.isEmpty()) {
            this.data_que = this.q1
            this.emp_que = this.q2
        } else {
            this.data_que = this.q2
            this.emp_que = this.q1
        }
    },

    push  (item) {
        this.initQueue()
        this.data_que.enqueue(item)
    },

    top () {
        this.initQueue()
        return this.data_que.tail()
    },


}

let stack1 = new Stack()

stack1.push(1)
stack1.push(2)
stack1.push(3)
console.log(stack1.top());
