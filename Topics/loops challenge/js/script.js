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
  let y = 0;
  let shade2 = 0;
  let thickness2 = 1;

  while (y <= height) {
    stroke(shade2);
    strokeWeight(thickness2);
    line(0, y, width, y);

    y += 50;
    shade2 += 25;
    thickness2 += 0.5;
  }
}
