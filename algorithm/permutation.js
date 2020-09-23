let arr = [1, 2, 3, 4]


function swap (arr, i, j) {
    if (i === j) return
    [arr[i], arr[j]] = [arr[j], arr[i]]
}
function fullPermutation(arr, start, end) {
    if (start === end) {
        console.log(arr);
    } else {
        for (let i = start; i <end; i++) {
            swap(arr, i, start)
            fullPermutation(arr, start+1, end)
            swap(arr, i, start)
        }
    }
}
// fullPermutation(arr, 0, arr.length)

function ComposeN (m, n, arr, hasSelectedArr, rootArr) {
    if (!n || n > m || n < 1) return
    for (let i = 0; i < m; m++) {
      if (hasSelectedArr.includes(i)) continue 
      hasSelectedArr = hasSelectedArr.slice()
      hasSelectedArr.push(i)
      let arr1 = arr.slice()
      arr1.push(i)
      if (n === 1) {
        rootArr.push(arr1)
      } else {
        ComposeN(m, n-1, arr1, hasSelectedArr, rootArr)
      }
    }
    return rootArr
  }

  // let result = ComposeN(arr.length, arr.length, arr, [], [])
  
  const alone = Object.create(null)

  console.log(alone);