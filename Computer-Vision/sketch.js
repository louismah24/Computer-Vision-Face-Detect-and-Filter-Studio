var capture;
var selectImage;
var ownImage;
var faceImg;
var filterOptions;

var brightnessSlider;
var redhsbThresholdSlider;
var greenhsbThresholdSlider;
var bluehsbThresholdSlider;
var hsbThresholdSlider;
var yiqThresholdSlider;

var w = 160,
  h = 120;
var detector;
var classifier = objectdetect.frontalface;
var img;
var faces;

var matrix = [
  [-1, -1, -1],
  [-1, 9, -1],
  [-1, -1, -1],
];

var matrix2 = [
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
];

var imgSwitch = true;

function preload() {
  // Loading of own image
  ownImage = loadImage("./image/img.jpeg", imageLoadedCallBack);
}

function imageLoadedCallBack() {
  print("here");
  imageLoaded = true;
}
////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(1000, 1500);
  pixelDensity(1);
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();

  // Object detect
  var scaleFactor = 1.2;
  detector = new objectdetect.detector(w, h, scaleFactor, classifier);
  faceImg = createImage(w, h);

  // Different slider position and range
  brightnessSlider = createSlider(0, 254, 51);
  redhsbThresholdSlider = createSlider(0.0, 1.0, 0.1, 0.01);
  greenhsbThresholdSlider = createSlider(0.0, 1.0, 0.2, 0.01);
  bluehsbThresholdSlider = createSlider(0.0, 1.0, 0.025, 0.01);
  hsbThresholdSlider = createSlider(0.0, 1.0, 0.2, 0.01);
  yiqThresholdSlider = createSlider(0.0, 1.0, 0.7, 0.01);
}
///////////////////////////////////////////////////////////////
function draw() {
  // Switch betweem screenshot and own downloaded image;
  if (imgSwitch) {
    image(capture, 600, 0, 500, 400);
  } else {
    image(selectImage, 600, 0, 500, 400);
  }

  // Drawing of all the filters
  if (selectImage) {
    var posX = 0;
    var posY = 0;

    drawSliders(posX, posY);
    drawImagesWithFilters(posX, posY);
    drawFaceDetectionImage(posX, posY);
  } else {
    // Create the instruction menu
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Press the enter key to take a screenshot", 800, 500);
    text("Press the 1-5 to change face detect filter", 800, 550);
    text("Press the i key to load own image", 800, 600);
    text("Press the s key to save image", 800, 650);
  }
}

function keyPressed() {
  console.log(keyCode);
  // Enter key
  if (keyCode == 13) {
    selectImage = capture.get();
    imgSwitch = true;
    console.log("Screenshot");
  }
  // I key
  if (keyCode == 73) {
    selectImage = ownImage;
    imgSwitch = false;
    console.log("Own Image");
  }
  // S key
  if (keyCode == 83) {
    console.log("save");
    save("myCanvas.jpg");
  }

  // Depending on the keypress it will assign different strings to the filterOptions enabling the face
  // detection filter to change
  if (keyCode == 49) {
    filterOptions = "normal";
  } else if (keyCode == 50) {
    filterOptions = "gray";
    console.log("Gray Filter");
  } else if (keyCode == 51) {
    filterOptions = "blur";
    console.log("Blur Filter");
  } else if (keyCode == 52) {
    filterOptions = "colorconvert";
    console.log("Color Convert Filter");
  } else if (keyCode == 53) {
    filterOptions = "pixel";
    console.log("Pixelated Filter");
  }
}

/// COMMENTARY
/*
Image thresholding: 
When we apply a red, green, and blue filter to an image, we are essentially separating the image into its constituent color channels.
When we apply a threshold filter to each of these channels, we are setting a cut-off value. Any pixel value below this threshold is set to black, and any value above it is set to white or the respective color. This process converts the image into a binary image (black and white or colored and black) for each channel. The images look different when a threshold is applied to the different channels is because the distribution of color intensities varies across the red, green, and blue channels. An image might have high intensity in the red channel but low intensity in the blue channel. When you apply the same threshold to both channels, different parts of the image will exceed the threshold in each channel, leading to different binary images.

When comparing rgb threshold to hsb and yiq threshold, it is evident that hsb and yiq threshold images are noiser due to components like brightness and saturation channels containing high frequency components. To improve the result, we can use different color space such as YCrCb color space. This color space can yield better result because the color information is decoupled from the luminance information, making the image less sensitive.

Problems:
The major problem I faced in this project was trying to understand how object detect work. Due to being unfamiliar with this library, i had a hard time implementing the face detect box. Upon being able to implement the face detect box I had another problem with the filters. I was not able to apply hsb and pixelate to the face detected image. After testing the face detect on another file I was able to identify the issue which were mainly due to setting the coordinates wrongly.

Target:
Currently, the project is on track for successful completion. All tasks have been completed to the best of my abilities. The design is basic, but with HTML, CSS, and DOM manipulation, a more vibrant and attractive interface could be created. However, time constraints prevent this implementation.


Extension:
The extensions were adding 3 new filters which were the sharpen, blur and the instagram filter. In conjunction to the new filters, I have added a load button that allows user to load their own image in which will then apply the same filter effect to the image. Lastly, I have added a save canvas function to allow users to save the images into their system. The filters were a unique extension as it uses complex algorithm such as convolution and matrix to create the special effect. The last instagram filter consist of 3 different filters stack on top of each other to create a vibrant effect. The load function allows user to have more options in choosing which image they would like to apply the filter on. The save function improves the quality of life when using the application.
*/
