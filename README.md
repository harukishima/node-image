# node-image
A simple image processing and hosting API for Node.js.

## Features

  * Image processing
  * Image hosting
  * Image resizing

Supported image formats: JPEG, PNG, GIF, BMP, TIFF, WebP, AVIF, SVG.

## Installation
 - Make sure you have Node.js >= 12.13.0 installed.
 - Clone the repository.
 - Install the dependencies: `yarn install`.
 - Run the application: `yarn start`. You can change port by setting the `PORT` environment variable.

## Usage
 - Upload new image:
```bash
> curl -F 'file=@/abc/file.png' http://localhost:5000
{"filename":"{uuid}.png"}
```
 - Fetch an image:
```
http://localhost:5000/{uuid}.png
```
