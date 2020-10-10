/* let str = 'gdhjshdkjbdjfbebuuysdfu'

function totalAlphabet (str) {
    let obj = {}
    const len = str.length
    for (let i = 0; i < len; i++) {
        obj[str[i]] = !obj[str[i]] ? 1 : obj[str[i]] + 1
    }
    return obj
}

let a = {x: 1, y: 2}
let b = Object.create(a)

console.log(a, b.__proto__);
const NINI_SQUARED = new Array(9);
let arr = NINI_SQUARED.map((item) => {
    return 1
  })
  console.log(arr);


  let arrrr = ['1111']
  console.log(arrrr.join(',')); */
  /* function swap (arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  function handleArr (arr) {
    let pushArr = []
    for (let i = 0; i < arr.length; ) {
        if (arr[i] === 0) {
            let val = arr.splice(i, 1)
            pushArr.push(...val)
        } else {
            i++;
        }
    }
    
    return arr.concat(pushArr)
  }

  console.log(handleArr([0, 1, 0, 3, 12])); */
  