# Computer-Vision-Face-Detect-and-Filter-Studio
An interactive image processing playground built with [p5.js](https://p5js.org/) that captures webcam video (or a loaded image), applies a gallery of custom-built pixel-level filters, and runs real-time frontal face detection with selectable filters applied inside the detected face region.

## Features

### Image sources
- **Webcam capture** — press `Enter` to take a screenshot from the live webcam feed.
- **Custom image** — press `I` to load a locally bundled image instead of the webcam feed.
- **Save output** — press `S` to export the full canvas as a JPG.

### Filter gallery
All filters are implemented from scratch by manipulating the raw pixel array of a p5.js image (no built-in `filter()` shortcuts unless noted):

| Filter | Description |
|---|---|
| Grayscale | Averages RGB channels with an adjustable brightness boost (slider-controlled) |
| RGB channel split | Isolates the red, green, and blue channels into separate images |
| RGB threshold | Binarizes each isolated color channel using p5's `THRESHOLD` filter, with independent sliders per channel |
| HSB | Converts RGB to hue/saturation/brightness and remaps them to the RGB channels for visualization |
| YIQ | Converts RGB to the YIQ color space (luma/chrominance) and remaps for visualization |
| HSB / YIQ threshold | Binarized versions of the HSB and YIQ outputs above |
| Sharpen | 3x3 convolution kernel (unsharp mask style) |
| Invert | Standard color inversion (255 - channel value) |
| Sepia + Radial Blur + Border | A stacked "Instagram-style" filter: sepia tone → distance-based radial blur (blur strength increases with distance from the mouse cursor) → rounded white border overlay |
| Pixelate | Block-averages 5x5 pixel regions to create a mosaic effect |

### Face detection
Uses [objectdetect.js](https://github.com/mtschirs/js-objectdetect) with the bundled frontal-face Haar-cascade-style classifier (`objectdetect.frontalface`) to detect faces in the current image and draw a bounding box around each match. A filter can be applied *only inside* the detected face region, selectable via number keys:

| Key | Face filter |
|---|---|
| `1` | Normal (no filter) |
| `2` | Grayscale |
| `3` | Blur |
| `4` | HSB color convert |
| `5` | Pixelated grayscale |

### Interactive sliders
Real-time sliders control brightness offset (grayscale filter) and threshold cutoffs for the red, green, blue, HSB, and YIQ threshold filters.

## Controls Summary

| Key | Action |
|---|---|
| `Enter` | Take a webcam screenshot |
| `I` | Load own image instead of webcam |
| `S` | Save the canvas as `myCanvas.jpg` |
| `1`–`5` | Switch the filter applied to the detected face |

## Dependencies

This project relies on the following libraries (loaded locally, not via CDN):

- [`p5.min.js`](https://p5js.org/) — core p5.js rendering/canvas library
- [`p5.dom.js`](https://p5js.org/reference/#/libraries/p5.dom) — DOM helpers (webcam capture, sliders)
- [`objectdetect.js`](https://github.com/mtschirs/js-objectdetect) — generic object detection engine
- [`objectdetect.frontalface.js`](https://github.com/mtschirs/js-objectdetect) — pretrained frontal-face classifier data

> These library files must be placed in a `libraries/` folder relative to `index.html` for the project to run.

## Project Structure

```
.
├── index.html      # Entry point, loads p5/objectdetect libraries and project scripts
├── sketch.js        # p5.js setup/draw loop, webcam capture, sliders, key controls
├── filters.js        # All custom pixel-manipulation filter functions
├── draw.js           # Layout logic — positions sliders, draws filtered image grid, runs face detection
├── libraries/         # p5.js and objectdetect.js library files (not included — see Dependencies)
└── image/
    └── img.jpeg         # Default image loadable via the "I" key
```

## Setup & Usage

1. Clone the repository.
2. Add the required library files to a `libraries/` folder (see Dependencies above).
3. Add a default image at `image/img.jpeg` (or update the path in `sketch.js`).
4. Since the project uses webcam access (`createCapture(VIDEO)`), serve it over a local web server rather than opening `index.html` directly as a file — e.g.:
   ```bash
   npx http-server .
   ```
5. Open the served URL in a browser, allow webcam access, and press `Enter` to begin.

## Implementation Notes

- **Color space comparisons**: RGB, HSB, and YIQ thresholding all produce visibly different binary segmentations because color intensity is distributed differently across each channel/space. HSB and YIQ thresholds tend to be noisier than RGB since brightness/saturation carry more high-frequency detail; a YCrCb color space (which decouples luminance from chrominance) is noted as a possible improvement for cleaner results.
- **Challenges**: getting familiar with the `objectdetect.js` API for face detection was the main hurdle, along with an initial coordinate offset bug that prevented HSB and pixelate filters from rendering correctly inside the detected face box.
- **Extensions beyond the base requirements**: sharpen, radial blur, and a combined "Instagram-style" filter (convolution + matrix-based effects); a custom image loader; and a canvas save/export function.

## Possible Improvements

- Move from inline canvas-positioned sliders to a styled HTML/CSS control panel.
- Replace manual pixel-loop filters with `p5.Shader`/WebGL for performance on larger images.
- Swap YIQ/HSB thresholding for YCrCb to reduce segmentation noise.

## Video Demonstration

https://github.com/user-attachments/assets/21864082-e679-44ce-acb8-09985c80b874




