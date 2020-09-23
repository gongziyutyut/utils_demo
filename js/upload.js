const fs = require('fs')

const file = fs.readFileSync('../../js/add.js')


const len = Math.ceil(file.length/100)
console.log(file, len)
let chunks = []
for (let i = 0; i < len; i++) {
    const start = i * 100
    const end = start + 100
    const piece =  file.slice(start, end)
    const mid = Math.ceil(piece.length/2)
    chunks.push(piece.slice(0, 2))
    chunks.push(piece.slice(mid, mid+2))
    chunks.push(piece.slice(piece.length - 2))
    
}
const newFile = new Buffer(chunks)
console.log(newFile.toString())