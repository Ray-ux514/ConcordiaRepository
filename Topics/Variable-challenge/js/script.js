/**
 * Mr. Furious
 * Pippin Barr
 *
 * A guy who becomes visibly furious!
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
  // Position and size
  x: 200,
  y: 200,
  size: 100,
  // Colour
  fill: {
    r: 255,
    g: 225,
    b: 225,
  },
};

let shakeAmount = 0;
let maxShake = 10;

let sky = {
  r: 160,
  g: 180,
  b: 200,
};

let birdX = -20;
let birdY = 120;
let birdSpeed = 2;

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
  shakeAmount += 0.05;
  shakeAmount = constrain(shakeAmount, 0, maxShake);

  let shakeX = random(-shakeAmount, shakeAmount);
  let shakeY = random(-shakeAmount, shakeAmount);

  background(160, 180, 200);

  sky.r -= 0.2;
  sky.g -= 0.3;
  sky.b -= 0.5;

  sky.r = constrain(sky.r, 0, 255);
  sky.g = constrain(sky.g, 0, 255);
  sky.b = constrain(sky.b, 0, 255);

  background(sky.r, sky.g, sky.b);

  mrFurious.fill.r += 1;
  mrFurious.fill.g -= 1;
  mrFurious.fill.b -= 1;

  mrFurious.fill.r = constrain(mrFurious.fill.r, 0, 255);
  mrFurious.fill.g = constrain(mrFurious.fill.g, 0, 255);
  mrFurious.fill.b = constrain(mrFurious.fill.b, 0, 255);

  // Draw Mr. Furious
  push();
  noStroke();
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(mrFurious.x + shakeX, mrFurious.y + shakeY, mrFurious.size);
  pop();

  birdX += birdSpeed;

  if (birdX > width + 20) {
    birdX = -20;
  }

  fill(0);
  ellipse(birdX, birdY, 15, 10);
}
