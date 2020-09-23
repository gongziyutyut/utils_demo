function add(arg1,arg2){
  var r1,r2,m;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}  // 获取参数1的数量级
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}  // 获取参数二的数量级
  m=Math.pow(10,Math.max(r1,r2))  // Math.pow是指定某数的几次幂（取两个参数中的较大者）
  return (arg1*m+arg2*m)/m  // 将两数化为同一数量级，然后再除以此数量级
}

function divide(arg1,arg2){
  var t1=0,t2=0,r1,r2;
  try{t1=arg1.toString().split(".")[1].length}catch(e){}
  try{t2=arg2.toString().split(".")[1].length}catch(e){}   // t1,t2 分别为参数的数量级
  r1=Number(arg1.toString().replace(".","")) 
  r2=Number(arg2.toString().replace(".","")) // 将两个参数的小数点去掉
  return times((r1/r2),Math.pow(10,t2-t1)); // 使用除法就是乘法的变种！！！使用乘法法则——A/B，再乘以数量级的商
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

function handler(num) {
  let mulVal = times(num, 100)
  if (minus(mulVal, 0.1) < 0) return '0.0%'
  let [prev, next]  = mulVal.toString().split('.')
  if (next) {
    if (next.length === 1) return `${mulVal}%`
    if (Number(prev) < 1) {
      mulVal = Math.round(mulVal)
      return mulVal >= 1 
      ? Math.round(mulVal) + '.0%'
      : prev + '.' +  next[0] + '%'
    }
    let newVal = prev + '.' + next[0] + next.slice(1)
    newVal = Math.round(newVal)
    return (newVal.toString().indexOf('.') > -1) ? newVal + '%' : newVal + '.0%'
  } else {
    return `${mulVal}.0%`
  }
}

const arr = ['1.059', '1', '0.942', '1.021', '1.09', '1.11', '0.0023', '0.00045', '0.0099', '0.09999']
arr.forEach(item => {
  console.log(handler(item))
})