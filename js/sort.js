
/*排序算法
* 特点：排序前后，两个相等的数相对位置不变
* */

// 冒泡排序（所需要的数字经由交换，不断浮出）
/*
* 排序——从小到大
* 从第一位开始，依次向后比较相邻元素，如果前一个比后一个小，交换二者位置
* 下一轮比较位置加1，然后重复*/

//  交换两者顺序
function swap(arr, x, y) {
  if(x===y) return
  let tem = arr[x];
  arr[x] = arr[y];
  arr[y] = tem;
}

function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {  
    for (let j = 0; j < len-i; j++) { 
      if(arr[j]>arr[j+1]){
        swap(arr, j, j+1)
      }
    }
  }
  return arr
}
/*
* 缺点：当前面已经排序完毕后，该算法还是会继续循环比较
*      优化点：已排序部分，不再比较
*      每次比较会将最大的值置于数组最后一位！！！
* */
function bubbleSort1(arr) {
  let len = arr.length;
  for (let i = len-1; i >= 0; i--) {
     for(let j=0; j<i; j++){
       if(arr[j]>arr[j+1]){
         swap(arr, j, j+1)
       }
     }
  }
  return arr
}

// 极限情况下，数组本为有序（加个标识判断）
function bubbleSort1(arr) {
  let len = arr.length,
      swapFlag = false;
  for (let i = len-1; i >= 0; i--) {
    for(let j=0; j<i; j++){
      if(arr[j]>arr[j+1]){
        swapFlag = true;   // 有顺序调整才置为true
        swap(arr, j, j+1)
      }
    }
    if(!swapFlag) return  // 无顺序调整时
  }
  return arr
}

/*选择排序：从数据中选出最大或最小置于起始位置
* 缺点：   耗时！！！
* 逻辑：初始有序区为空，无序区为随意的数组
*       第i趟排序，有序区分别为[0,i]和[i+1, n]
*       在此次排序中，选出最小并记录位置，然后将其与无序区的i交换
* */

function selectSort(arr) {
  let min,
  len = arr.length;
  for (let i = 0; i < len; i++) {
    min = i; // 取第一个值，将其赋予最小
    for(let j=i+1; j<len; j++) {
      if(arr[min]-arr[j]>0) {  // 从当前值的后面开始循环
        min = j;   // 当前值若大于min，则重新赋值
      }
    }
    swap(arr, min, i)  //将i对应的值与min替换位置
  }
  return arr
}
// console.log(selectSort([1,3,0,4,5,2,2,1,4,6,8,6]));

console.log([1,3,0,4,5,2,2,1,10,4,6,8,6].sort((a, b)=>{
  return a-b
}));
console.log([1,3,0,4,5,2,2,1,10,4,6,8,6].sort());
// 两种结果不同

/*插入排序
*
* 逻辑思想——
* 将待排序序列的第一个元素看作有序序列
* 把第二个元素到最后一个元素当作无序序列
* 从头到尾依次扫描无序区
* 将扫描的元素插入到有序的适当位置,直到结束
* 如果待插入元素与有序数列中元素相等，则置于其后
*
* */
function insertSort(arr) {
  let len = arr.length,
    preIndex, currentVal;
  for (let i = 1; i < len; i++) {
    preIndex = i-1;
    currentVal = arr[i];
    while(preIndex>=0 && arr[preIndex] > currentVal) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;  // 在此处将下标值-1
  }
    arr[preIndex + 1] = currentVal; // 此处下标值增加，若进入上面循环则替换了值，否则不变

  }
  return arr
}
console.log(insertSort([1,0,10,4,6,2,8,3,5]));
/*
* 优化思路：
* 使用二分法——插入时，通过二分法减少查找次数
* 链表：将有序数组转化为链表结构——插入的时间复杂度为O（1），查找复杂度为O（n）
* 排序二叉树（BST）：
*   将有序数组部分转化为排序二叉树
*   中序遍历该二叉树
*   可以方便插入，但需要占用额外空间
* 二分查找法：
* 在有序数组中查找某一特定元素
* 搜索过程从数组中间开始，若刚好是需要元素，停止！
* 若不是，则与之比较然后在在大于（或者小于）
*
* */










