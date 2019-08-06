/*
* 写一个简单的遮罩插件：
* 使用jQuery实现
*  jQuery插件的基础在于自执行，然后向外暴露一个对象
*  $.fn 是扩展插件的方法
*  jQuery.extend() 函数用于将一个或多个对象的内容合并到目标对象。
*
*  使用方法：$('#app').maskLoading() —— 选择器一定选择最外层的元素
* */
(function($) {
  $.fn.maskLoading = function(options) {
    var option = $.extend({}, $.fn.maskLoading.defaults, options)
    return this.each(function() {
      // 此时的this依据就近原则，this指向调用方法的对象maskLoading为对象下的方法，$.fn调用时为$('选择器')
      // 故this即为$('选择器')
      var $el = $(this)
      if(option.hide) {
        // each通用遍历方法，可用于遍历对象和数组
        if($el.find('.ng-loading').length) $el.find('ng-loading').hide().remove()
        // hide()隐藏显示的元素
      }else {
        var top = $el.offset().top;
        var left = $el.offset().left;
        var height = $el.height();
        var width = $el.width();
        var imgMargin = '-' + parseInt(option.imgHeight/2) + 'px 0 0 -' + parseInt(option.imgWidth/2) + 'px'
        $('<div class="ng-loading"><img src="'+ option.imgUrl +'"></div>')
          .css({ //设置给最外层的元素
            position: 'absolute',
            'z-index': option.zIndex,
            top: top,
            left: left,
            display: 'none',
            width: width,
            height: height,
            'background-color': option.bgColor
          }).appendTo($el).find('img').css({ // 当设置样式时设置给就近原则
            position: 'absolute',
            'z-index': option.imgZIndex,
            top: '50%',
            left: '50%',
            display: 'none',
            width: option.imgWidth,
            height: option.imgHeight,
            margin: imgMargin
          }).show().end().show() // show显示隐藏的匹配元素
          //回到最近的一个"破坏性"操作之前。即，将匹配的元素列表变为前一次的状态。
      }
    })
  }
  $.fn.maskLoading.defaults = {
    hide: false,
    zIndex: 9000,
    bgColor: 'rgba(255, 255, 255, 0.5)',
    imgUrl: '../img/loading.gif',
    imgWidth: 64,
    imgHeight: 64,
    imgZIndex: 9001
  }
})(jQuery)