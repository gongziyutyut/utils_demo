/* const timeout = (t) => {
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
      if(t === 2000) {
        reject(`reject in ${t}s`)
      }else {
        resolve(`resolve in ${t}s`)
      }
    }, t)
  })
}

const  duration  =  [1000, 2000, 3000] ;
const  promises = [];
duration.forEach(item => {
  promises.push(timeout(item).catch(e=> e))
})

function  whoIsThis() {
  console.log(this);
}
console.log([...'hello']);
console.log([1,2,4,3,2,0,10].sort());
console.log([1,2,4,3,2,0,10].sort((x,y)=> x-y));
console.log(2*e^10); */
// console.log(promises);
// Promise.all(promises).then(res=> console.log(res))
/* function task () {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve('task')
      },1000)
  })
}

task().then((res) => {
  console.log(res)
  return 'taskB'
}).then(res => {
  console.log(res)
  return 'taskC'
}).then(res => {
  console.log(res)
  throw new Error()
}).catch(e => {
  console.log(e)
  return 'taskD'
}).then(res => {
  console.log(res, '最后一个')
}) */

class Promise {
  constructor (executor) {
      const self = this
      self.status = 'pending'
      self.value = undefined
      self.reason = undefined
      self.onsuccess = []
      self.onfail = []

      resolve = (value) => {
          if (self.status === 'pending') {
              self.status = 'fulfilled'
              self.value = value
              self.onsuccess.forEach(fn => fn());
          }
      }

      reject = (reason) => {
          if (self.status === 'pending') {
              self.status = 'rejected'
              self.reason = reason
              self.onfail.forEach(fn => fn());
          }
      }

      try {
        executor(resolve, resolve)
      } catch (err) {
        resolve(err)
      }
  }

  then (onfulfilled, onrejected) {
      const self = this
      onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val
      onrejected = typeof onrejected === 'function' ? onrejected : err => {throw err}

      let p = new Promise((resolve, reject) => {
          if (self.status === 'fulfilled') {
              let x = onfulfilled(self.value)
              resolvePromise (p, x, resolve, reject)
          }

          if (self.status === 'rejected') {
              let x = onrejected(self.reason)
              resolvePromise (p, x, resolve, reject)
          }

          if (self.status === 'pending') {
              self.onsuccess.push(() => {
                  let x = onfulfilled(self.value)
                  resolvePromise (p, x, resolve, reject)
              })
              self.onfail.push(() => {
                  let x = onrejected(self.reason)
                  resolvePromise (p, x, resolve, reject)
              })
          }
      })
  }
}


function resolvePromise (promiseAgain, x, resolve, reject) {
  if (promiseAgain === x) {
      return reject(new TypeError('循环引用'))
  }
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      try {
          let then = x.then
          if (typeof then === 'function') {
              then.call(x, y => {
                  resolvePromise(promiseAgain, y, resolve, reject)
              }, err =>{
                  reject(err)
              })
          } else {
              resolve(x)
          }
      } catch (err) {
          reject(err)
      }
  } else {
      resolve(x)
  }
}

function PromiseAll (promises) {
  if (!Array.isArray(promises)) {
    throw new TypeError('接收参数必须是数组')
  }
  return new Promise((resolve, reject) => {
    let result = []
    let count = 0
    promises.forEach((promise, index) => {
      promise.then(res => {
        result[index] = res
        count++
        count === promises.length && resolve(result)
      }, err => {
        rejext(err)
      })
    })
  })
}
let p1 = new Promise((resolve, reject) => {
 /*  setTimeout(() => {
    resolve(1)
  }, 2000) */
  resolve(1)
})
let p2 = Promise.resolve(2)
let p3 = Promise.resolve(3)
PromiseAll([p1, p2, p3]).then(res => {
  console.log(res);
})

/* let promise = new Promise((resolve, reject) => {
  console.log(new Date().toUTCString())
  setTimeout(function () {
      resolve('success data')
      console.log(new Date().toUTCString())
  }, 2000)
})
promise.then(res => {
  console.log("success:", res);
}, err => {
  console.log("error:", err);
}) */

/* promise.then(res => {
  console.log("success:", res);
}, err => {
  console.log("error:", err);
})
promise.then(res => {
  console.log("success:", res);
}, err => {
  console.log("error:", err);
}) */





