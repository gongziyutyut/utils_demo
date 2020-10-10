let x = 1;
function foo(x, y = function() {x=2}) {
  x = 3;
  y();
  console.log(x);
}
foo();
console.log(x);

let v = 0 ;
let w = 0.1
console.log(v < w);

function flat (arr) {
  let res = arr.reduce((prev, next) => {
    return prev.concat(next instanceof Array ? flat(next) : next) 
  }, [])
  return res
}
console.log(flat([1, 3, [4, 5, [6, 7, 8]]]));