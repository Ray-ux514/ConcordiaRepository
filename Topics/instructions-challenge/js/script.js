/**
 * Title of Project
 * Author Name
 *
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
 */
function setup() {
  createCanvas(1500, 1500);
  background(135, 206, 235);
}

/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
 */
function draw() {
  push();
  fill(24, 139, 34);
  noStroke();
  ellipse(width / 2.5, height, width, height * 0.8);
  pop();

  push();
  fill(86, 139, 87);
  noStroke();
  ellipse(width / 1.5, height, width, height * 0.9);
  pop();

  push();
  fill(255, 255, 0);
  noStroke();
  ellipse(250, 450, 250, 250);
  pop();

  /** drawing bird */
  push();
  fill(0, 0, 0);
  ellipse(650, 650, 20, 20);
  pop();
  /** drawing bird */
  push();
  fill(0, 0, 0);
  ellipse(850, 650, 10, 10);
  pop();

  /** drawing house */
  push();
  fill(23, 116, 160);
  box(30, 50, 0, 400, 80);
  pop();

  push();
  fill(326, 867, 901);
  triangle(30, 75, 58, 20, 86, 75);
  pop();
}
