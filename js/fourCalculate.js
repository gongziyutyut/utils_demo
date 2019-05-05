function add(arg1,arg2){
  var r1,r2,m;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}  // 获取参数1的数量级
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}  // 获取参数二的数量级
  m=Math.pow(10,Math.max(r1,r2))  // Math.pow是指定某数的几次幂（取两个参数中的较大者）
  return (arg1*m+arg2*m)/m  // 将两数化为同一数量级，然后再除以此数量级
}

function minus(arg1,arg2) {
  var r1,r2,m,n;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2));
  n=(r1>=r2)?r1:r2;
  return ((arg1*m-arg2*m)/m).toFixed(n); // toFixed用于指定小数点后的位数
}

function times(arg1,arg2) {
  var m=0,s1=arg1.toString(),s2=arg2.toString();
  try{m+=s1.split(".")[1].length}catch(e){}
  try{m+=s2.split(".")[1].length}catch(e){} // 数量级需要两个数值得数量级和
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) // 相乘时有两个数量级的和（因此需要都除去）
}

function divide(arg1,arg2){
  var t1=0,t2=0,r1,r2;
  try{t1=arg1.toString().split(".")[1].length}catch(e){}
  try{t2=arg2.toString().split(".")[1].length}catch(e){}
  r1=Number(arg1.toString().replace(".",""))
  r2=Number(arg2.toString().replace(".",""))
  return Vue.prototype.$accMul((r1/r2),Math.pow(10,t2-t1));
}