(function transformImg(win){

  function ImgToUrl(){

  }
  ImgToUrl.prototype = {
    imgToDataUrl: function(img){
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const paint = canvas.getContext('2d');
      paint.drawImage(img, 0, 0, img.width, img.height);
      const mime = img.src.substring(img.src.lastIndexOf('.')+1).toLowerCase();
      const dataUrl = canvas.toDataURL('/image' + mime);
      return dataUrl;
    },
    dataToBlob: function(dataUrl){
      let arr = dataUrl.split(','),   // dataUrl：data:image/png;base64,XXXXX...
          mime = arr[0].match(/:(.*?);/)[1],  // data:image/png;base64.match(最多一个：XXXX;)方法类似 indexOf() 和 lastIndexOf()，但是它返回指定的值
          bStr = atob(arr[1]), //解码base64函数，编码是btoa
          n = bStr.length,
          unit8Array = new Uint8Array(n);   // 初始数组元素的值为0
      while(n--){
        unit8Array[n] = bStr.charCodeAt(n); // 返回对应字符的unicode码
      }
      return new Blob([unit8Array], {type: mime}); // 语法var aBlob = new Blob( array, options );
    }
  }
  win.ImgToUrl = ImgToUrl;
})(window);