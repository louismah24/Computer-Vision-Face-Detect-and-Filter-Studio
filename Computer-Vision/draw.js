//////////////////////////////////////////
///////////////DRAWING FUNCTIONS//////////
//////////////////////////////////////////
/*
All the functions here will be called in the draw() function in sketch.js
*/

// This function draws all the sliders
function drawSliders(posX, posY) {
  brightnessSlider.position(posX + 180, posY + 130);
  redhsbThresholdSlider.position(posX, posY + 410);
  greenhsbThresholdSlider.position(posX + 180, posY + 410);
  bluehsbThresholdSlider.position(posX + 180 * 2, posY + 410);
  hsbThresholdSlider.position(posX + 180, posY + 690);
  yiqThresholdSlider.position(posX + 180 * 2, posY + 690);
}

// This function draws the image with the respective filters applied
function drawImagesWithFilters(posX, posY) {
  //////// Image Processing ///////////////
  image(selectImage, posX, posY, w, h);
  image(applyGrayscaleFilter(selectImage), posX + 180, posY, w, h);
  image(applyRGBFilter(selectImage, "red"), posX, posY + 140, w, h);
  image(applyRGBFilter(selectImage, "green"), posX + 180, posY + 140, w, h);
  image(applyRGBFilter(selectImage, "blue"), posX + 180 * 2, posY + 140, w, h);
  image(
    applyRedThreshold(applyRGBFilter(selectImage, "red")),
    posX,
    posY + 140 * 2,
    w,
    h
  );
  image(
    applyGreenThreshold(applyRGBFilter(selectImage, "green")),
    posX + 180,
    posY + 140 * 2,
    w,
    h
  );
  image(
    applyBlueThreshold(applyRGBFilter(selectImage, "blue")),
    posX + 180 * 2,
    posY + 140 * 2,
    w,
    h
  );

  image(selectImage, posX, posY + 140 * 3, w, h);
  image(applyHSBFilter(selectImage), posX + 180, posY + 140 * 3, w, h);
  image(applyYIQFilter(selectImage), posX + 180 * 2, posY + 140 * 3, w, h);

  image(
    applyHSBThreshold(applyHSBFilter(selectImage)),
    posX + 180,
    posY + 140 * 4,
    w,
    h
  );
  image(
    applyYIQThreshold(applyYIQFilter(selectImage)),
    posX + 180 * 2,
    posY + 140 * 4,
    w,
    h
  );

  image(applySharpenFilter(selectImage), posX, posY + 140 * 5, w, h);
  image(applyInvertFilter(selectImage), posX + 180, posY + 140 * 5, w, h);
  image(
    borderFilter(radialBlurFilter(sepiaFilter(selectImage))),
    posX + 180 * 2,
    posY + 140 * 5,
    w,
    h
  );
}

// This function draw the face detection image,face detection box and the different filters involved
function drawFaceDetectionImage(posX, posY) {
  // FACE DETECTION
  image(selectImage, posX, posY + 140 * 4, w, h);

  faceImg.copy(
    selectImage,
    0,
    0,
    selectImage.width,
    selectImage.height,
    0,
    0,
    selectImage.width,
    selectImage.height
  );
  faces = detector.detect(faceImg.canvas);

  strokeWeight(2);
  stroke(255);
  noFill();

  for (var i = 0; i < faces.length; i++) {
    var face = faces[i];
    if (face[4] > 4) {
      // Draws the face detection box
      rect(face[0], face[1] + 140 * 4, face[2], face[3]);
      var tempFace = faceImg.get(face[0], face[1], face[2], face[3]);

      // Apply filters to the image inside the face detection box
      if (filterOptions == "normal") {
        // No additional filter, do nothing
      } else if (filterOptions == "gray") {
        tempFace.filter(GRAY);
      } else if (filterOptions == "blur") {
        tempFace.filter(BLUR, 3);
      } else if (filterOptions == "colorconvert") {
        applyHSBFilter2(tempFace);
      } else if (filterOptions == "pixel") {
        tempFace.filter(GRAY);
        pixelatedImg(tempFace);
      }

      // Draws the image with the filter applied
      image(tempFace, face[0], face[1] + 140 * 4, face[2], face[3]);
    }
  }
}
