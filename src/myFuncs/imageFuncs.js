export const img_Funcs  = {



  grayScale:function (context, canvas) {
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    var pixels  = imgData.data;
    for (var i = 0, n = pixels.length; i < n; i += 4) {
      var grayscale = pixels[i] * .3 + pixels[i+1] * .59 + pixels[i+2] * .11;
      pixels[i  ] = grayscale;        // red
      pixels[i+1] = grayscale;        // green
      pixels[i+2] = grayscale;        // blue
      //pixels[i+3]              is alpha
    }
    context.putImageData(imgData, 0, 0);
  },


  contrastImage:function (imageData, contrast) {  // contrast input as percent; range [-1..1]
    var data = imageData.data;  // Note: original dataset modified directly!
    contrast *= 255;
    var factor = (contrast + 255) / (255.01 - contrast);  //add .1 to avoid /0 error.

    for(var i=0;i<data.length;i+=4)
    {
      data[i] = factor * (data[i] - 128) + 128;
      data[i+1] = factor * (data[i+1] - 128) + 128;
      data[i+2] = factor * (data[i+2] - 128) + 128;
    }
    return imageData;  //optional (e.g. for filter function chaining)
  }




}
