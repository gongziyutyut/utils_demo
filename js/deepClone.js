function getType (obj) {
    let val = Object.prototype.toString.call(obj)
    let type = val.slice(8, -1)
    return type
}

function deepClone (obj) {
    const type = getType(obj)
    let cloneObj
    if (type === 'Array') {
        cloneObj = []
    } else if (type === 'Object') {
        cloneObj = {}
    } else {
        return obj
    }
    for (let prop in obj) {
        cloneObj[prop] = deepClone(obj[prop])
    }
    return cloneObj
}

function deepClone2 (obj) {
    let cloneObj = Object.create(obj)
    return cloneObj
}

let arr1 = [1, 2, 3, 4, {a: 3, b: ['4', '5', 6]}]
let arr2 = deepClone2(arr1)
arr2.push(6)
console.log(arr1, arr2);
/* let arr = [1, 2, 3, 4]
let obj = {a: 1}
let a = '3'
let composeArr = [arr, obj, a]
composeArr.forEach(item => {
    // let val = Object.prototype.toString.call(item)
    console.log(getType(item));
})
 */
