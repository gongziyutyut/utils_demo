function Boolm (maxCount, errorRate) {
  this.bitMap = []
  let max_count = maxCount
  let error_rate = errorRate
  // 位图变量长度(以下数值是按照公式计算的)
  this.bitSize = Math.ceil(max_count	* (-Math.log(error_rate) / (Math.log(2) *	Math.log(2)) ));
  this.hashCount = Math.ceil(Math.log(2) * (this.bitSize	/	max_count));

}
Boolm.prototype.add = function (key) {
  if (this.isExist(key)) {
    return -1
  }
  for (let i = 0 ; i < this.hashCount; i++) {
    let hashVal = murmurhash3_32_gc(key, i)
    // 这里要存储的值，是哈希值/字节位数量
    set_Bit(this.bitMap, Math.abs(Math.floor(hashVal % (this.bitSize))))
  }
}

Boolm.prototype.isExist = function (key) {
  for (let i = 0 ; i < this.hashCount; i++) {
    let hashVal = murmurhash3_32_gc(key, i)
    // 这里要存储的值，是哈希值/字节位数量
    let val = get_Bit(this.bitMap, Math.abs(Math.floor(hashVal % (this.bitSize))))
    if (!val) {
      return false
    }
  }
  return true
}

function set_Bit (arr, num) {
  let arrIdx = Math.floor(num/32)
  let bitIdx = Math.floor(num%32)
  arr[arrIdx] = arr[arrIdx] | 1 << bitIdx
}
function get_Bit (arr, num) {
  let arrIdx = Math.floor(num/32)
  let bitIdx = Math.floor(num%32)
  let value = arr[arrIdx] & 1 << bitIdx
  return value
}

function murmurhash3_32_gc(key,	seed) {
  var	remainder,	bytes,	h1,	h1b,	c1,	c1b,	c2,	c2b,	k1,	i;
  remainder	=	key.length	& 3; //	key.length	%	4
  bytes	=	key.length	-	remainder;
  h1	=	seed;
  c1	= 0xcc9e2d51;
  c2	= 0x1b873593;
  i	= 0;
  while (i	<	bytes) {
    k1	=
            (key.charCodeAt(i) & 0xff) |
            ((key.charCodeAt(++i) & 0xff) << 8) |
            ((key.charCodeAt(++i) & 0xff) << 16) |
            ((key.charCodeAt(++i) & 0xff) << 24);
    ++i;
    k1	= (((k1	& 0xffff) *	c1) + ((((k1	>>> 16) *	c1) & 0xffff) << 16)) & 0xffffffff;
    k1	= (k1	<< 15) | (k1	>>> 17);
    k1	= (((k1	& 0xffff) *	c2) + ((((k1	>>> 16) *	c2) & 0xffff) << 16)) & 0xffffffff;
    h1	^=	k1;
    h1	= (h1	<< 13) | (h1	>>> 19);
    h1b	= (((h1	& 0xffff) * 5) + ((((h1	>>> 16) * 5) & 0xffff) << 16)) & 0xffffffff;
    h1	= (((h1b	& 0xffff) + 0x6b64) + ((((h1b	>>> 16) + 0xe654) & 0xffff) << 16));
  }
  k1	= 0;
  switch (remainder) {
    case 3:	k1	^= (key.charCodeAt(i	+ 2) & 0xff) << 16;
    case 2:	k1	^= (key.charCodeAt(i	+ 1) & 0xff) << 8;
    case 1:	k1	^= (key.charCodeAt(i) & 0xff);
            k1	= (((k1	& 0xffff) *	c1) + ((((k1	>>> 16) *	c1) & 0xffff) << 16)) & 0xffffffff;
            k1	= (k1	<< 15) | (k1	>>> 17);
            k1	= (((k1	& 0xffff) *	c2) + ((((k1	>>> 16) *	c2) & 0xffff) << 16)) & 0xffffffff;
            h1	^=	k1;
  }
  h1	^=	key.length;
  h1	^=	h1	>>> 16;
  h1	= (((h1	& 0xffff) * 0x85ebca6b) + ((((h1	>>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
  h1	^=	h1	>>> 13;
  h1	= (((h1	& 0xffff) * 0xc2b2ae35) + ((((h1	>>> 16) * 0xc2b2ae35) & 0xffff) << 16)) & 0xffffffff;
  h1	^=	h1	>>> 16;
  return	h1	>>> 0; 
}
var	bloomFilter	= new Boolm(1000000, 0.01);
bloomFilter.add('https://blog.csdn.net/houzuoxin/article/details/20907911');
bloomFilter.add('https://www.jianshu.com/p/888c5eaebabd');
console.log(bloomFilter.isExist('https://blog.csdn.net/houzuoxin/article/details/20907911'));
console.log(bloomFilter.isExist('https://www.jianshu.com/p/888c5eaebabd'));
console.log(bloomFilter.isExist('https://www.jianshu.com/p/888c5eaebabd435'));
