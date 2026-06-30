////////////////////////////////////////////
/////////////FILTER FUNCTIONS///////////////
////////////////////////////////////////////
/*
All the filters here follows the same principles where we access the pixels from an image, select its respective index, 
followed by selecting the red , green and blue. Once the red, green and blue is selected we can create different types of 
filter depending what kind of algorithm it uses.
All the filter function will be called in draw.js in the drawImagesWithFilters(posX, posY) function
*/

// Grayscale Filter
function applyGrayscaleFilter(img) {
  var imgOut = createImage(img.width, img.height);
  imgOut.loadPixels();
  img.loadPixels();

  for (x = 0; x < imgOut.width; x++) {
    for (y = 0; y < imgOut.height; y++) {
      var index = (x + y * imgOut.width) * 4;

      var r = img.pixels[index + 0];
      var g = img.pixels[index + 1];
      var b = img.pixels[index + 2];

      var gray = (r + g + b) / 3; // simple

      // Increase brightness by 20% and adjust brightness
      gray = min(255, gray + brightnessSlider.value()); // 20% of 255 is approximately 51
      imgOut.pixels[index + 0] =
        imgOut.pixels[index + 1] =
        imgOut.pixels[index + 2] =
          gray;
      imgOut.pixels[index + 3] = 255;
    }
  }
  imgOut.updatePixels();
  return imgOut;

  ////////////////////////////////////////
}

// RGB filter
function applyRGBFilter(img, option) {
  var redImg = createImage(img.width, img.height);
  redImg.loadPixels();
  var greenImg = createImage(img.width, img.height);
  greenImg.loadPixels();
  var blueImg = createImage(img.width, img.height);
  blueImg.loadPixels();
  img.loadPixels();

  for (var y = 0; y < img.height; y++) {
    for (var x = 0; x < img.width; x++) {
      var pixelIndex = (img.width * y + x) * 4;
      var pixelRed = img.pixels[pixelIndex + 0];
      var pixelGreen = img.pixels[pixelIndex + 1];
      var pixelBlue = img.pixels[pixelIndex + 2];

      //red channel only
      redImg.pixels[pixelIndex + 0] = pixelRed;
      redImg.pixels[pixelIndex + 1] = 0;
      redImg.pixels[pixelIndex + 2] = 0;
      redImg.pixels[pixelIndex + 3] = 255;

      //green channel only
      greenImg.pixels[pixelIndex + 0] = 0;
      greenImg.pixels[pixelIndex + 1] = pixelGreen;
      greenImg.pixels[pixelIndex + 2] = 0;
      greenImg.pixels[pixelIndex + 3] = 255;

      //blue channel only
      blueImg.pixels[pixelIndex + 0] = 0;
      blueImg.pixels[pixelIndex + 1] = 0;
      blueImg.pixels[pixelIndex + 2] = pixelBlue;
      blueImg.pixels[pixelIndex + 3] = 255;
    }
  }
  redImg.updatePixels();
  greenImg.updatePixels();
  blueImg.updatePixels();

  // Allow user to create different types of rgb filter depending on the option they pass in to the function
  if (option == "red") {
    return redImg;
  } else if (option == "green") {
    return greenImg;
  } else if (option == "blue") {
    return blueImg;
  }
}
/////////////////////////////////////

// RGB Threshold filter
function applyRedThreshold(img) {
  img.filter(THRESHOLD, redhsbThresholdSlider.value());
  // Return the segmented image
  return img;
}

function applyGreenThreshold(img) {
  img.filter(THRESHOLD, greenhsbThresholdSlider.value());
  // Return the segmented image
  return img;
}

function applyBlueThreshold(img) {
  img.filter(THRESHOLD, bluehsbThresholdSlider.value());
  // Return the segmented image
  return img;
}

////////////////////////////////////////

// HSB filter
function applyHSBFilter(img) {
  var hsbImg = createImage(img.width, img.height);
  hsbImg.loadPixels();

  //load image pixel values into array pixels
  img.loadPixels();

  for (var y = 0; y < img.height; y++) {
    for (var x = 0; x < img.width; x++) {
      var pixelIndex = (img.width * y + x) * 4;
      var pixelRed = img.pixels[pixelIndex + 0];
      var pixelGreen = img.pixels[pixelIndex + 1];
      var pixelBlue = img.pixels[pixelIndex + 2];

      var hsb = rgbToHsb(pixelRed, pixelGreen, pixelBlue);
      //display hue as red, saturation as green, brightness as  blue
      hsbImg.pixels[pixelIndex + 0] = hsb[0] * 1.5;
      hsbImg.pixels[pixelIndex + 1] = hsb[1] * 1.5;
      hsbImg.pixels[pixelIndex + 2] = hsb[2] * 2;
      hsbImg.pixels[pixelIndex + 3] = 255;
    }
  }
  hsbImg.updatePixels();
  return hsbImg;
}

// HSB filter 2 for face detection
// Instead of returning an image, it will only update the pixels. The image will be drawn later
function applyHSBFilter2(img) {
  // Load original image pixels
  img.loadPixels();

  // Process each pixel and convert RGB to HSB
  for (var y = 0; y < img.height; y++) {
    for (var x = 0; x < img.width; x++) {
      var pixelIndex = (img.width * y + x) * 4;
      var pixelRed = img.pixels[pixelIndex + 0];
      var pixelGreen = img.pixels[pixelIndex + 1];
      var pixelBlue = img.pixels[pixelIndex + 2];

      var hsb = rgbToHsb(pixelRed, pixelGreen, pixelBlue);
      //display h ueas red, saturation as green, brightness as  blue
      img.pixels[pixelIndex + 0] = hsb[0] * 1.5;
      img.pixels[pixelIndex + 1] = hsb[1] * 1.5;
      img.pixels[pixelIndex + 2] = hsb[2] * 2;
      img.pixels[pixelIndex + 3] = 255;
    }
  }
  // Update modified image pixels
  img.updatePixels();
}

// Convert rgb to hsb
function rgbToHsb(r, g, b) {
  // Use the p5.js color() function to create a color object
  var rgbColor = color(r, g, b);

  //Extract HSB values from the color object

  var h = hue(rgbColor);
  var s = saturation(rgbColor);
  var br = brightness(rgbColor);

  // Return the HSB values as an array
  return [h, s, br];
}

/////////////////////////////////

// YIQ filter
function applyYIQFilter(img) {
  var yiqImg = createImage(img.width, img.height);
  yiqImg.loadPixels();
  img.loadPixels();

  for (var y = 0; y < img.height; y++) {
    for (var x = 0; x < img.width; x++) {
      var pixelIndex = (img.width * y + x) * 4;
      var pixelRed = img.pixels[pixelIndex + 0];
      var pixelGreen = img.pixels[pixelIndex + 1];
      var pixelBlue = img.pixels[pixelIndex + 2];

      var yiq = rgbToYiq(pixelRed, pixelGreen, pixelBlue);

      yiqImg.pixels[pixelIndex + 0] = yiq[0] * 255; // Red
      yiqImg.pixels[pixelIndex + 1] =
        (yiq[1] + 0.956 * yiq[0] + 0.621 * yiq[2]) * 255; // Green
      yiqImg.pixels[pixelIndex + 2] =
        (yiq[2] + 0.621 * yiq[0] - 0.272 * yiq[1]) * 255; // Blue
      yiqImg.pixels[pixelIndex + 3] = 255;
    }
  }

  yiqImg.updatePixels();
  return yiqImg;
}

// convert rgb to yiq
function rgbToYiq(r, g, b) {
  // Convert to YIQ color space
  var y = 0.299 * r + 0.587 * g + 0.114 * b; // Luma (brightness)
  var iValue = 0.596 * r - 0.274 * g - 0.322 * b; // Chrominance I
  var qValue = 0.211 * r - 0.523 * g + 0.312 * b; // Chrominance Q

  // Clamp values to range [0, 1]
  y = constrain(y, 0, 1);
  iValue = constrain(iValue, -0.5957, 0.5957); // Range for I component in YIQ color space
  qValue = constrain(qValue, -0.5226, 0.5226); // Range for Q component in YIQ color space

  return [y, iValue, qValue];
}

/////////////////////////////////////

// hsb threshold filter
function applyHSBThreshold(img) {
  img.filter(THRESHOLD, hsbThresholdSlider.value());

  // Return the segmented image
  return img;
}

// yiq threshold fitler
function applyYIQThreshold(img) {
  img.filter(THRESHOLD, yiqThresholdSlider.value());

  // Return the segmented image
  return img;
}
////////////////////////////////////////

// pixelated filter for face detection
function pixelatedImg(img) {
  var pixelatedSize = 5;
  //load image pixel values into array pixels
  img.loadPixels();

  //process block by block
  for (var y = 0; y < img.height; y += pixelatedSize) {
    for (var x = 0; x < img.width; x += pixelatedSize) {
      var sumRed = 0;
      var sumGreen = 0;
      var sumBlue = 0;

      //get the sum of RGB of that block
      for (var i = 0; i < pixelatedSize; i++) {
        for (var j = 0; j < pixelatedSize; j++) {
          var pixelIndex = (img.width * (y + j) + (x + i)) * 4;
          var pixelRed = img.pixels[pixelIndex + 0];
          var pixelGreen = img.pixels[pixelIndex + 1];
          var pixelBlue = img.pixels[pixelIndex + 2];
          sumRed += pixelRed;
          sumGreen += pixelGreen;
          sumBlue += pixelBlue;
        }
      }
      //calcualte the ave of RGB of that block
      var aveRed = sumRed / (pixelatedSize * pixelatedSize);
      var aveGreen = sumGreen / (pixelatedSize * pixelatedSize);
      var aveBlue = sumBlue / (pixelatedSize * pixelatedSize);

      //paint the block with the ave RGB value
      for (var i = 0; i < pixelatedSize; i++) {
        for (var j = 0; j < pixelatedSize; j++) {
          var pixelIndex = (img.width * (y + j) + (x + i)) * 4;
          img.pixels[pixelIndex + 0] = aveRed;
          img.pixels[pixelIndex + 1] = aveGreen;
          img.pixels[pixelIndex + 2] = aveBlue;
        }
      }
    }
  }
  img.updatePixels();
}

//////////////////////////////////////////////

// Sharpen filter
function applySharpenFilter(img) {
  var sharpenImg = createImage(img.width, img.height);
  var matrixSize = matrix.length;

  sharpenImg.loadPixels();
  img.loadPixels();

  // read every pixel
  for (var x = 0; x < sharpenImg.width; x++) {
    for (var y = 0; y < sharpenImg.height; y++) {
      var index = (x + y * sharpenImg.width) * 4;
      var c = convolution(x, y, matrix, matrixSize, img);

      sharpenImg.pixels[index + 0] = c[0];
      sharpenImg.pixels[index + 1] = c[1];
      sharpenImg.pixels[index + 2] = c[2];
      sharpenImg.pixels[index + 3] = 255;
    }
  }
  sharpenImg.updatePixels();
  return sharpenImg;
}

function convolution(x, y, matrix, matrixSize, img) {
  var totalRed = 0.0;
  var totalGreen = 0.0;
  var totalBlue = 0.0;
  var offset = floor(matrixSize / 2);

  // convolution matrix loop
  for (var i = 0; i < matrixSize; i++) {
    for (var j = 0; j < matrixSize; j++) {
      // Get pixel loc within convolution matrix
      var xloc = x + i - offset;
      var yloc = y + j - offset;
      var index = (xloc + img.width * yloc) * 4;
      // ensure we don't address a pixel that doesn't exist
      index = constrain(index, 0, img.pixels.length - 1);

      // multiply all values with the mask and sum up
      totalRed += img.pixels[index + 0] * matrix[i][j];
      totalGreen += img.pixels[index + 1] * matrix[i][j];
      totalBlue += img.pixels[index + 2] * matrix[i][j];
    }
  }
  // return the new color
  return [totalRed, totalGreen, totalBlue];
}

///////////////////////////////////

//Invert filter
function applyInvertFilter(img) {
  var invertImg = createImage(img.width, img.height);

  invertImg.loadPixels();
  img.loadPixels();

  for (var x = 0; x < invertImg.width; x++) {
    for (var y = 0; y < invertImg.height; y++) {
      var index = (x + y * invertImg.width) * 4;

      var r = 255 - img.pixels[index + 0];
      var g = 255 - img.pixels[index + 1];
      var b = 255 - img.pixels[index + 2];

      invertImg.pixels[index + 0] = r;
      invertImg.pixels[index + 1] = g;
      invertImg.pixels[index + 2] = b;
      invertImg.pixels[index + 3] = 255;
    }
  }
  invertImg.updatePixels();
  return invertImg;
}
///////////////////////////////////

// The last filter is a combination of all 3 filters below

//Sepia Filter
function sepiaFilter(img) {
  var resultImg = createImage(img.width, img.height);
  resultImg.loadPixels();

  img.loadPixels();
  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var pixelIndex = (img.width * y + x) * 4;
      var oldRed = img.pixels[pixelIndex + 0];
      var oldGreen = img.pixels[pixelIndex + 1];
      var oldBlue = img.pixels[pixelIndex + 2];

      var newRed = oldRed * 0.393 + oldGreen * 0.769 * (oldBlue * 0.189);
      var newGreen = oldRed * 0.349 + oldGreen * 0.686 * (oldBlue * 0.168);
      var newBlue = oldRed * 0.272 + oldGreen * 0.534 * (oldBlue * 0.131);

      newRed = constrain(newRed, 0, 255);
      newGreen = constrain(newGreen, 0, 255);
      newBlue = constrain(newBlue, 0, 255);

      resultImg.pixels[pixelIndex + 0] = newRed;
      resultImg.pixels[pixelIndex + 1] = newGreen;
      resultImg.pixels[pixelIndex + 2] = newBlue;
      resultImg.pixels[pixelIndex + 3] = 255;
    }
  }
  resultImg.updatePixels();
  return resultImg;
}

// Radial blur filter
function radialBlurFilter(img) {
  img.loadPixels();
  var matrixSize = matrix2.length;

  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var pixelIndex = (img.width * y + x) * 4;
      var oldRed = img.pixels[pixelIndex + 0];
      var oldGreen = img.pixels[pixelIndex + 1];
      var oldBlue = img.pixels[pixelIndex + 2];

      var c = convolution(x, y, matrix2, matrixSize, img);

      var mouseDist = abs(dist(x, y, mouseX, mouseY));
      var dynBlur = map(mouseDist, 100, 300, 0, 1);
      dynBlur = constrain(dynBlur, 0, 1);

      var newRed = c[0] * dynBlur + oldRed * (1 - dynBlur);
      var newGreen = c[1] * dynBlur + oldGreen * (1 - dynBlur);
      var newBlue = c[2] * dynBlur + oldBlue * (1 - dynBlur);

      img.pixels[pixelIndex + 0] = newRed;
      img.pixels[pixelIndex + 1] = newGreen;
      img.pixels[pixelIndex + 2] = newBlue;
    }
  }
  img.updatePixels();
  return img;
}

// Border filter
function borderFilter(img) {
  var resultImg = createGraphics(img.width, img.height);

  resultImg.image(img, 0, 0);

  resultImg.noFill();
  resultImg.stroke(255);
  resultImg.strokeWeight(20);
  resultImg.rect(0, 0, img.width, img.height, 200);

  resultImg.strokeWeight(20);
  resultImg.stroke(255);
  resultImg.rect(0, 0, img.width, img.height);

  return resultImg;
}
