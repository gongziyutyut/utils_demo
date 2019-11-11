/* 
  解析算法：数组去重
  引入时间复杂度，作为算法优劣的比较指标 !
*/

/* 
  时间复杂度的判断依据  
*/
async function getRunTime(fn) {
  let startTime = Date.now(), endTime
  let result = await fn()
  endTime = Date.now()
  console.log(`total time: ${endTime - startTime}ms`)
}

/* 
  双重for循环去重，如果有相同的值就跳过，不同的则push到数组中
  因为实现时依靠数组从自身查找，当相同，则令下标往后指
*/
arr1 = [1,3,4,5,4,3,2,5,1,2,4,5,2,1,3,5,7,9,0,1,3,5,7,9,
  2,4,5,5,6,7,8,9,0,23,4,5,5,66,5,7,8,7989,0,0,9,43,4334,6,
  ,2,4,4,5,5,6,7,8,9,9,6,45,4,2,5,657,8,9,9,5,2,35,65,898,
  ,234,3,,34,43,5,6,65,34,5,6,6,768,7,9,8,23,4,54,65,887,98
  ,,4,5,65,7687,9,0,32,43,34,45,5454,6,6324,,5667,7,88,987,
  ,12,23,,435,46,76,8,97,98,0,90,,43,4,54,65,76,87,9988,,
  ,2,,23,4,5,6,7,88,9,0,0,,32,43,,56,7,8,9,0,,,3243,4,6,7,8,1,4,5,66
  ,2,34,5,6,,6,768,9,0,099,3,434,,6576,7,89,121,32,434,4356,
  1,5,6,8,9,0,,5,,8,5,7,7,7,8,1,2,5,6,7,3,5,6,66]
function forRecycle () {
  let arr = []
  for (var i = 0; i < arr1.length; i++) {
    for (let j = i + 1; j < arr1.length; j++) {
      if (arr1[i] === arr1[j]) {
        j = ++i
      }
    }
    arr.push(arr1[i])
  }
  console.log(arr)
}

/* 
  利用indexOf方法去查找
  查找到则不填入，查找不到则填入

*/
function arrayIndexOf () {
  let arr = []
  for (var i = 0; i < arr1.length; i++) {
    if (arr.indexOf(arr1[i]) < 0) {
      arr.push(arr1[i])
    }
  }
  console.log(arr)
}

/* 
  对象法：借助对象属性唯一的特性！！！

*/
function arrayObj () {
  let arr = [], obj = {}
  for (let i = 0; i < arr1.length; i++) {
    let val = arr1[i]
    if (!obj[val]) {
      arr.push(val)
      obj[val] = 1
    }
  } 
   console.log(arr)
}

/* 
  filter 去重
  利用filter和indexOf去重
*/
function ArrayFilter () {
  let arr = arr1.filter((item, index, array) => array.indexOf(item, index+1) < 0)
  console.log(arr)
}

/* 
  Set去重
  针对同类型的数据去重非常快，但是不同类型的数据就慢了许多
 */
function arraySet () {
  let arr = []
  arr = new Set([...arr1])
  console.log(arr)
}

 getRunTime(arraySet)
//getRunTime(forRecycle)






