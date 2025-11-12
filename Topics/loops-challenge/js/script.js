/**
 * Lines
 * Pippin Barr
 *
 * A series of lines across the canvas
 */

"use strict";
let y = 0;
let shade2 = 0;
let thickness2 = 1;

/**
 * Creates the canvas
 */
function setup() {
  createCanvas(500, 500);
  colorMode(HSB);
}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */
function draw() {
  for (let x = 0; x < width; x++) {
    // Map the y-position to a hue value (0 to 360)
    let hue = map(x, 0, width, 0, 360);
    stroke(hue, 76, 140); // bright colorful lines
    line(0, x, height, x); // 1px apart lines forming a gradient
  }

  let x = 0;
  let shade = 0;
  let thickness = 1;

  while (x <= width) {
    stroke(shade);
    strokeWeight(thickness);
    line(x, 0, x, height);

    x += 50;
    shade += 0;
    thickness += 0.5;
  }
  let y = 0;
  let shade2 = 0;
  let thickness2 = 1;

  while (y <= height) {
    stroke(shade2);
    strokeWeight(thickness2);
    line(0, y, width, y);

    y += 50;
    shade2 += 0;
    thickness2 += 0.5;
  }
}
