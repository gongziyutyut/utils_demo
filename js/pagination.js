Function.prototype.after = function (fn) {
  const self = this
  return function () {
    const result = self.apply(this, arguments)
    if (result === 'success') {
      var res = fn.apply(this, arguments)
      return res // 返回的res必须将结果返回，否则下一个函数接收不到
    }
  }
}
class Pagination {
  /* 
    constructor是一个构造方法，用来接收参数
    当使用类生成实例对象时，会自动执行构造器中的方法
  */
  constructor (totalPage) {  
    if (!totalPage) return
    this.state = {
      pageNum: 1,
      totalPage
    }
  }

  /* 
    定义入口函数，当生成实例后，此方法会挂在实例对象下
  */
  init (initObj) {
    let state = this.state  // 通过引用对象，改变state，令this.state也进行赋值
    state.container = initObj.container || 'body' // 此为选择分页器挂载容器的字段
    state.maxBtnNum =  initObj.maxBtnNum || 5 // 用于确定除 上一页、下一页、1和最后一页，显示页码的最多个数
    // 以下都暂时设为默认，设置样式的类名，需要进行声明,通过传参，可以自定义样式
    state.pName = initObj.pName || 'page-li' // 所有页码元素要添加的类名
    state.activePage = initObj.activePage || 'page-active' // 当前激活的页码添加的类名
    state.dataNumAttr = initObj.dataNumAttr || 'data-num' // 代表页码数字的属性，自定义属性，添加在页码标签上，值是页码
    state.preBtn = initObj.preBtn || 'page-prev' // 上一页按钮添加的类名
    state.nextBtn = initObj.nextBtn || 'page-next' // 下一页按钮添加的类名
    state.disablePrev = initObj.disablePrev || 'no-prev' // 禁用上一页按钮添加的类名
    state.disableNext = initObj.disableNext || 'no-next' // 禁用下一页按钮添加的类名
    state.pageNumC = initObj.pageNumC || 'page-num' // 不包括上一页、下一页和省略号在内的按钮添加的类名
    // 需要省略号时，确定active的位置
    state.totalPage > state.maxBtnNum + 2 && (state.activePosition = Math.ceil(state.maxBtnNum/2)) // 向上取整 
    this.renderDom()
  }

  renderDom () {
    let state = this.state // 简化取值
    let pageContainer = this.selectDom(state.container)
    if (!pageContainer) return 
    let {totalPage, pName, preBtn, disablePrev, pageNumC, 
      activePage, dataNumAttr, maxBtnNum, nextBtn, disableNext} = state
    let PageStr = `
      <ul class="pagination">
        <li class="${pName} ${preBtn} ${disablePrev}">上一页</li>
        <li class="${pName} ${pageNumC} ${activePage}" data-num="${dataNumAttr}='1'">1</li>        
    `
    let pageFn = totalGtMax2.after(totalNGtMax2)
    pageFn()
    // 
    PageStr += `
      <li class="${pName} ${nextBtn} ${totalPage === 1 ? disableNext : ''}">下一页</li></ul>
    `
    pageContainer.innerHTML = PageStr
    this.switchPage() 
    function totalNGtMax2 () {
      for (let i = 2; i <= totalPage; i++) {
        PageStr += `
        <li class="${pName} ${pageNumC}" ${dataNumAttr}='${i}'>${i}</li>
      `
      }
    }

    function totalGtMax2 () {
      if (totalPage - 2 > maxBtnNum) {
        PageStr += `
          <li class="${pName} number-ellipsis ellipsis-head" style="display:none">...</li>
        `
      for (let i = 2; i < maxBtnNum + 2; i++) {
        PageStr += `
          <li class="${pName} ${pageNumC} ${activePage === 1 ? activePage : ''}" ${dataNumAttr}='${i}'>${i}</li>
        `
      }
      PageStr += `
        <li class="${pName} number-ellipsis ellipsis-tail">...</li>
        <li class="${pName} ${pageNumC}" ${dataNumAttr}="${totalPage}">${totalPage}</li>
      `
      } else {
        return 'success'
      }
    }
  }
  // 切换页面
  switchPage () {
    let state = this.state
    let pNameList = this.selectDom(`.${state.pName}`, true) // 获取所有页码包括上一页、下一页、省略号等
    let pageNumber
    let self = this
    Array.prototype.forEach.call(pNameList, function (item, index) {
      item.addEventListener('click', function (event) {
        const currentEl = event.target
        if (self.hasClass(currentEl, state.activePage)) return
        let dataNumAttr = currentEl.getAttribute(state.dataNumAttr)
        if (dataNumAttr) {
          pageNumber = +dataNumAttr
        } else if (self.hasClass(currentEl, state.preBtn)) {
          state.pageNum > 1 && ( pageNumber = state.pageNum - 1 )
        } else if (self.hasClass(currentEl, state.nextBtn)) {
          state.pageNum < state.totalPage && ( pageNumber = state.pageNum + 1 )
        }
        pageNumber && self.gotoPage(pageNumber)
      })
    })
  }
  // 点击后，到某个页面
  gotoPage (pageNumber, currentEl) {
    let state = this.state
    let _this = this
    let evalNumberLi = this.selectDom(`.${state.pageNumC}`, true) // 数值页码li，只获取第一个
    let len = evalNumberLi.length
    if (!len || this.isIllegal(pageNumber)) return
    // 清除active的样式
    this.removeClass(this.selectDom(`.${state.pName}.${state.activePage}`), state.activePage)
    // this.addClass(currentEl, state.activePage)
    if (state.activePosition) {
      // 总数 - 最大按钮数 - 初始的 1 + 当前激活位置（按钮数一半，向上取整，这个时候若等于3，就该出现省略号）
      var rEllipsis = state.totalPage - (state.maxBtnNum - state.activePosition) - 1  
      let showPageFn = noLeftEllipsis.after(allEllipsis).after(noRightEllipsis)
      showPageFn()
    } else {
      this.addClass(evalNumberLi[pageNumber-1], state.activePage)
    }
    state.pageNum = pageNumber
    this.switchPrevAndNext()
    // 左边不需要省略号
    function noLeftEllipsis () {
      if (pageNumber <= state.maxBtnNum && (pageNumber < rEllipsis)) {
        if (Number(evalNumberLi[1].getAttribute(state.dataNumAttr) > 2)) {
          for (let i = 1; i < state.maxBtnNum + 1; i++) {
            evalNumberLi[i].innerText = i + 1 
            evalNumberLi[i].setAttribute(state.dataNumAttr, i + 1)
          }
        }
        _this.hiddenEllipsis('.ellipsis-head')
        _this.hiddenEllipsis('.ellipsis-tail', false)
        _this.addClass(evalNumberLi[pageNumber - 1], state.activePage)
      } else {
        return 'success'
      }
    }
    // 右边不需要省略号
    function noRightEllipsis () {
      if (pageNumber >= rEllipsis) {
        _this.hiddenEllipsis('.ellipsis-tail')
        _this.hiddenEllipsis('.ellipsis-head', false)
        if (Number(evalNumberLi[len-2].getAttribute(state.dataNumAttr)) < state.totalPage - 1) {
          for (let i = 1; i < state.maxBtnNum + 1 ; i++) {
            evalNumberLi[i].innerText = state.totalPage - (state.maxBtnNum - i) - 1
            // 实际就是 当前页码 = 总数 - 开头位置的1 - 最大数量 + i (每次循环页码是要+1的)
            evalNumberLi[i].setAttribute(state.dataNumAttr, state.totalPage - (state.maxBtnNum - i) - 1)
          }
        }
        /* 
          关键的算法在于此处的位置确定
          由于当前无右侧省略号，所以 state.maxBtnNum + pageNumber + 1  > state.totalPage 
          页码是由总页数确定的，假设为5， 那么有以下情况
          页码为 1 ... 45678 9  此时 6 + 6 - 9 = 3（刚好为6下标数字）
          页码为 1 ...  94 95 96 97 98  99 此时 6 + 96 - 99 = 3
          结论： 按钮数量和 1 值固定为 6， 所以其实就是页码+6 -总数（自然对应 页码的下标值
          因为94 + 5就是99，但是还要加1，因为它不是页码li的初始位置）
        */
        let position = state.maxBtnNum + 1 + pageNumber - state.totalPage 
        _this.addClass(evalNumberLi[position], state.activePage)
      } else {
        return 'success'
      }
    }
    // 两侧都需要省略号
    function allEllipsis () {
      if (pageNumber > state.maxBtnNum && pageNumber <= rEllipsis) {
        // 针对 maxShowBtnCount===1 的特殊处理
        _this.hiddenEllipsis('.ellipsis-head', pageNumber === 2 && state.maxBtnNum ===1)
        _this.hiddenEllipsis('.ellipsis-tail', false)
        for (let i = 1; i < state.maxBtnNum + 1; i++) {
          /* 
            state.activePosition若为3，那么pageNumber - 3则是初始值
            每次跳转的页码在中间
          */
          evalNumberLi[i].innerText = pageNumber - state.activePosition + i
          evalNumberLi[i].setAttribute(state.dataNumAttr, pageNumber - state.activePosition + i)
        }
        _this.addClass(evalNumberLi[state.activePosition], state.activePage)
      } else {
        return 'success'
      }
    }
  }
  switchPrevAndNext () {
    let state = this.state
    let prevBtn = this.selectDom(`.${state.preBtn}`)
    let nextBtn = this.selectDom(`.${state.nextBtn}`)
    // 若当前页已经是第一页，则禁用上一页的按钮
    state.pageNum > 1 
    ? (this.hasClass(prevBtn, state.disablePrev) && this.removeClass(prevBtn, state.disablePrev))
    : (!this.hasClass(prevBtn, state.disablePrev) && this.addClass(prevBtn, state.disablePrev))
    // 当前页若是最后一页，那么禁用下一页按钮
    state.pageNum >= state.totalPage
    ? (!this.hasClass(nextBtn, state.disableNext) && this.addClass(nextBtn, state.disableNext))
    : (this.hasClass(nextBtn, state.disableNext) && this.removeClass(nextBtn, state.disableNext))

  }
  // dom选择器
  selectDom (container, listFlag = false) {
    // 当listFlag为true时，说明选择器选择的是dom列表
    return listFlag ? document.querySelectorAll(container) : document.querySelector(container)
  }

  // 判断是否含有样式
  hasClass (el, className) {
    return el.classList.contains(className)
  }

  addClass (el, className) {
    el.classList.add(className)
  }

  removeClass (el, className) {
    if (this.hasClass(el, className)) {
      el.classList.remove(className)
    }
  }

  isIllegal (pageNumber) {
    let state = this.state
    // 满足以下条件，属于非法数据
    let judgeArr = [
      state.pageNumber === pageNumber,
      Math.ceil(pageNumber) !== pageNumber,
      pageNumber > state.totalPageCount,
      pageNumber < 1,
      typeof pageNumber !== 'number',
      pageNumber !== pageNumber
    ]
    return judgeArr.some(item => item)
  }

  hiddenEllipsis (selector, hidden = true) {
    this.selectDom(selector).style.display = hidden ? 'none' : ''
  }


}


