function List (data) {
  this.data = data
  this.next = null
}


List.prototype.getLength = function (root) {
  let head = root
  let num = 0
  while (head) {
    head = head.next
    num++
  }
  return num
}

List.prototype.getNode = function (index, root) {
  const len = this.getLength(root)
  if (index < 0 || index >= len) {
    return null
  }
  let current_node = root
  let current_index = index
  while (current_index-- > 0) {
    current_node = current_node.next
  }
  return current_node
}

List.prototype.reverseNode = function (head) {
  if (head === null) {
    return 
  } else {
    this.reverseNode(head.next)
    console.log(head.data);
  }
}

List.prototype.reverse_iter = function (head) {
  if (!head) {
    return null
  }
  let currentNode = head
  let prevNode = null
  while (currentNode) {
    let nextNode = currentNode.next
    currentNode.next = prevNode
    prevNode = currentNode
    currentNode = nextNode
  }
  return prevNode

}

var	node1	= new List(1);
var	node2	= new List(4);
var	node3	= new List(9);
var	node4	= new List(2);
var	node5	= new List(5);
var	node6	= new List(6);
var	node7	= new List(10);
node1.next	=	node2;
node2.next	=	node3;

node4.next	=	node5;
node5.next	=	node6;
node6.next	=	node7


// 合并两个有序列表
function mergeLink (root1, root2) {
  let list1 = root1
  let list2 = root2
  if (root1 === null) {
    return root2
  } 
  if (root2 === null) {
    return root1
  }
  let mergeHead = null
  let mergeTail = null
  let minData
  while(list1 && list2) {
    if (list1.data <= list2.data) {
      minData = list1.data
      list1 = list1.next
    } else {
      minData = list2.data
      list2 = list2.next
    }
    if (mergeHead === null) {
      mergeHead = new List(minData)
      mergeTail = mergeHead
    } else {
      let node = new List(minData)
      mergeTail.next = node
      mergeTail = node
    }
  }
  let restList = null
  if (list1 === null) {
    restList = list2
  }
  if (list2 === null) {
    restList = list1
  }
  while (restList) {
    let node = new List(restList.data)
    mergeTail.next = node
    mergeTail = node
    restList = restList.next
  }
  return mergeHead
}

let merged = mergeLink(node1, node4)
// 找出链表中倒数第K个的元素（利用双指针）
// 拓展用法还有双指针来找中间节点（一个每次走一步，一个每次走2步）
function lookForNode (root, k) {
  // let head = root
  let fast = root, 
  slow = root
  let step = k
  while (step > 0 && fast) {
    fast = fast.next
    step--
  }
  // step不等于0，但是却已经走完链表，那么节点个数不够
  if (step !== 0) {
    return null
  }
  // fast先走了k,那么再次一起走时，slow走s-k，就是倒数的第k节点
  while (fast && slow) {
    slow = slow.next
    fast = fast.next
  }
  return slow
}
console.log(lookForNode(merged, 3));

const num = 4
console.log(num.toString(2));