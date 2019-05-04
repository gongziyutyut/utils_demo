const timeout = (t) => {
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
console.log(2*e^10);
// console.log(promises);
// Promise.all(promises).then(res=> console.log(res))