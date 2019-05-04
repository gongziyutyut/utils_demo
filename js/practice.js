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