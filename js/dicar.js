function cartesian (...arr) {
  if (arr.length < 2) return arr[0] || [];
  return arr.reduce((prev, item) => {
    let res = []
    prev.forEach(pItem => {
      item.forEach(sItem => {
        let t = [].concat(Array.isArray(pItem) ? pItem : [pItem])
        t.push(sItem)
        res.push(t);
      })
    })
    return res 
  })
}
console.log(cartesian([1, 2, 3], ['a', 'b']))