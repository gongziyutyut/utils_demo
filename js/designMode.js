// 策略模式
let calculateProcess = {
  'A': function(val) {
    return val*2
  },
  'B': function(val) {
    return val*3
  },
  'C': function(val) {
    return val*4
  }
}

let calculate = function(level, val) {
  return calculateProcess[level](val);
}

// 单例模式

// 代理模式
let imgSrc = (function() {
  let imgNode = document.createElement('img');
  document.body.appendChild(imgNode)
  return {
    setSrc: function(src) {
      imgNode.src = src;
    }
  }
})();

let proxy = (function() {
  let img = new Image();
  img.onload = function() {
    imgSrc.setSrc(this.src)
  }
  return {
    setSrc: function(src) {
      imgSrc.setSrc('./loading.gif')
      img.src = src;
    }
  }
})()
proxy.setSrc('./pic.jpg')

