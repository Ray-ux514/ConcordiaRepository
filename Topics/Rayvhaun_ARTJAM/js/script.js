"use strict";

// === Eye setup ===
const leftEye = {
  x: 230,
  y: 340,
  w: 70,
  h: 60,
  moveRange: 8, // how much the pupil slides
};

const rightEye = {
  x: 375,
  y: 340,
  w: 70,
  h: 60,
  moveRange: 8,
};

// === Base drawing ===
function setup() {
  createCanvas(600, 600);
}

function draw() {
  background("#aaaaaa");

  drawEars();
  drawFace();
  drawHair();
  drawEarrings();
  drawEyebrows();
  drawEyes(); // whites + arcs + pupils (with movement)
  drawBeard();
  drawMouth();
}

// === Helper draw functions ===
function drawEars() {
  push();
  fill(126, 79, 33);
  stroke(35, 31, 3);
  strokeWeight(15);
  ellipse(100, 330, 85, 85);
  ellipse(500, 330, 85, 85);
  pop();
}

function drawFace() {
  push();
  fill(126, 79, 33);
  stroke(35, 31, 3);
  strokeWeight(15);
  ellipse(300, 300, 380, 380);
  pop();
}

function drawHair() {
  push();
  stroke(35, 31, 3);
  strokeWeight(15);
  fill(35, 31, 32);
  arc(300, 300, 380, 380, PI, TWO_PI, CHORD);
  pop();

  push();
  noStroke();
  fill(126, 79, 33);
  rect(150, 240, 300, 90);
  pop();
}

function drawEarrings() {
  push();
  noStroke();
  fill(206, 235, 241);
  ellipse(100, 372, 20, 20);
  ellipse(500, 372, 20, 20);
  fill(mouseX, mouseY);
  ellipse(100, 372, 14, 14);
  ellipse(500, 372, 14, 14);
  pop();
}

function drawEyebrows() {
  push();
  noStroke();
  fill(35, 31, 3);
  translate(230, 310);
  rotate(radians(10));
  rectMode(CENTER);
  rect(0, 0, 100, 15);
  pop();
  //eye shawdow//
  push();
  noStroke();
  fill(35, 31, 3, 70);
  translate(265, 330);
  rotate(radians(10));
  rectMode(CENTER);
  rect(0, 0, 22, 5);
  pop();

  push();
  noStroke();
  fill(35, 31, 3);
  translate(375, 310);
  rotate(radians(170));
  rectMode(CENTER);
  rect(0, 0, 100, 15);
  pop();
  //eye shadow//
  push();
  noStroke();
  fill(35, 31, 3, 70);
  translate(340, 330);
  rotate(radians(170));
  rectMode(CENTER);
  rect(0, 0, 22, 5);
  pop();
}

function drawRotRect(x, y, w, h, angleDeg) {
  push();
  translate(x, y);
  rotate(radians(angleDeg));
  rectMode(CENTER);
  rect(0, 0, w, h);
  pop();
}

// === Eyes (with movement) ===
function drawEyes() {
  // Whites
  push();
  noStroke();
  fill(255);
  arc(230, 340, 95, 85, 0, PI, CHORD);
  arc(375, 340, 95, 85, 0, PI, CHORD);
  pop();

  push();
  noStroke();
  fill(0, 0, 0, 45);
  arc(230, 340, 85, 75, 0, PI, CHORD);
  arc(375, 340, 85, 75, 0, PI, CHORD);
  pop();

  // Eye arcs / lashes
  push();
  stroke(35, 31, 3, 70);
  strokeWeight(5);
  noFill();
  strokeCap(SQUARE);
  arc(365, 348, 95, 85, HALF_PI, PI);
  arc(240, 348, 95, 85, 0, HALF_PI);
  pop();

  // Moving pupils
  drawMovingEye(leftEye);
  drawMovingEye(rightEye);
}

function drawMovingEye(eye) {
  let moveX = map(mouseX, 0, width, -eye.moveRange, eye.moveRange);
  push();
  noStroke();
  fill(35, 31, 3);
  arc(eye.x + moveX, eye.y, eye.w, eye.h, 0, PI, CHORD);
  pop();
}

// === Beard and mouth ===
function drawBeard() {
  push();
  noStroke();
  fill(35, 31, 3);
  ellipse(300, 480, 90, 30);
  pop();
}

function drawMouth() {
  push();
  noStroke();
  fill(35, 31, 3);
  translate(300, 430);
  rotate(radians(175));
  rectMode(CENTER);
  rect(0, 0, 85, 14);
  pop();
}
