function BitMap (size) {
  // let arr = new Array(size)
  this.data = []
  for (let index = 0; index < size; index++) {
    this.data[index] = 0
  }
  
}

BitMap.prototype.addMember = function (num) {
  const arrIdx = Math.floor(num/32)
  const bitIdx = num % 32
  this.data[arrIdx] = this.data[arrIdx] | 1 << bitIdx
}

BitMap.prototype.isExist = function (num) {
  const arrIdx = Math.floor(num/32)
  const bitIdx = num % 32
  const value = this.data[arrIdx] & 1 << bitIdx
  return value !== 0
}
var	bit_map	= new BitMap(4);
var	arr	= [0, 23, 78,6, 9, 3, 5,34,  99];

function sortBitMap () {
  let sortArr = []
  for(var	i	= 0;i	<	arr.length;i++){
    bit_map.addMember(arr[i]); 
  }
  for (let j = 0; j <= 99; j++) {
    if (bit_map.isExist(j)) {
      sortArr.push(j)
    }
  }
  console.log(sortArr);
}

let arr1 = [1, 4, 6, 8, 9, 10, 15]
let arr2 = [6, 14, 9, 2, 0, 7]
function getMixed (arr1, arr2) {
  let bitMap = new BitMap(4)
  let filterArr = []
  arr1.forEach(item => {
    bitMap.addMember(item)
  });
  arr2.forEach(item => {
    if (bitMap.isExist(item)) {
      filterArr.push(item)
    }
  })
  console.log(filterArr);
}
getMixed(arr1, arr2)