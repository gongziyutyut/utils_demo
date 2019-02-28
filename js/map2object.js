// map转换为object

let map = new Map([['a', 5], ['b', 6], ['c', 7]]);

function map2object (map) {
  let obj = {};
  for (let [key, value] of map) {
    obj[key] = value;
  }
  return obj;
}

// object 转换为 map
let o = map2object(map);
function obj2map (obj) {
  let m = new Map();
  for (let key of Object.keys(obj)) {
    m.set(key, obj[key]);
  }
  return m
}
console.log(map2object(map));
console.log(obj2map(o));

// map 转 JSON
function map2JSON (map) {
  return JSON.stringify([...map])
}

// JSON 转 Map
function JSON2Map (jsonStr) {
  return obj2map(JSON.parse(jsonStr));
}
console.log(map2JSON(obj2map(o)));
console.log([...map]);
console.log(JSON2Map('{"a": 5, "b": 6}'));


