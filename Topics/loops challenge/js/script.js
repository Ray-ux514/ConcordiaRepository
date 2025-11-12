/**
 * Lines
 * Pippin Barr
 *
 * A series of lines across the canvas
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
  createCanvas(500, 500);
}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */
function draw() {
  background("pink");

  let x = 0;
  let shade = 0;
  let thickness = 1;

  while (x <= width) {
    stroke(shade);
    strokeWeight(thickness);
    line(x, 0, x, height);

    x += 50;
    shade += 25;
    thickness += 0.5;
  }
}
