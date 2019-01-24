(function transformImg(win){

  function ImgToDataUrl(){

  }
  ImgToDataUrl.prototype = {
    imgToDataUrl: function(img){
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const paint = canvas.getContext('2d');
      paint.drawImage(img, 0, 0, img.width, img.height);
      debugger
      const mime = img.src.substring(img.src.lastIndexOf('.')+1).toLowerCase();
      const dataUrl = canvas.toDataURL('/image' + mime);
      return dataUrl;
    }

  }
  win.ImgToDataUrl = ImgToDataUrl;
})(window);