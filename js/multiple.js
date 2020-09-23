function mulFn () {
  for(let i = 1; i <=9; i++) {
    let str = ''
    for (let j = 1; j <= i; j++) {
      str = str + '  ' + `${i} X ${j} = ${i * j}`
    }
    console.log(str);
  }
}
mulFn()