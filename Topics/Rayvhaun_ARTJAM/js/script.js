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
  createCanvas(600, 600);
}

/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
 */
function draw() {
  background("#aaaaaa");

  //ears//
  push(); //
  fill(126, 79, 33); // Skin tone
  stroke(35, 31, 3); // Outline color (dark brown)
  strokeWeight(15);
  ellipse(100, 330, 85, 85); // Face oval
  pop();

  //ears//
  push(); //
  fill(126, 79, 33); // Skin tone
  stroke(35, 31, 3); // Outline color (dark brown)
  strokeWeight(15);
  ellipse(500, 330, 85, 85); // Face oval
  pop();

  // face//
  push();
  fill(126, 79, 33); // Skin tone
  stroke(35, 31, 3); // Outline color (dark brown)
  strokeWeight(15); // Outline thickness
  ellipse(300, 300, 380, 380); // Face oval
  pop();

  //hair//
  push();
  stroke(35, 31, 3); // Outline color (dark brown)
  strokeWeight(10);
  fill(35, 31, 32); // Skin tone
  arc(300, 300, 380, 380, PI, TWO_PI, CHORD);
  pop();

  //earigns//
  push(); //
  fill(206, 235, 241); //ear colour//
  noStroke();
  ellipse(100, 372, 20, 20); // Face oval
  pop();

  push(); //
  fill(255, 255, 255); //ear colour//
  noStroke();
  ellipse(100, 372, 14, 14); // Face oval
  pop();

  //earigns//
  push(); //
  fill(206, 235, 241); //ear colour//
  noStroke();
  ellipse(500, 372, 20, 20); // Face oval
  pop();

  push(); //
  fill(255, 255, 255); //ear colour//
  noStroke();
  ellipse(500, 372, 14, 14); // Face oval
  pop();

  push();
  noStroke();
  fill(126, 79, 33); // brown hair
  rect(150, 240, 300, 90);
  pop();

  // eyebrows//
  push();
  noStroke();
  fill(35, 31, 3); // brown hair
  translate(225, 310); // move to where you want the rectangle
  rotate(radians(7)); // slight rotation (5 degrees)
  rectMode(CENTER); // draw from center for even rotation
  rect(0, 0, 105, 15); // rectangle at the new origin
  pop();
  push();

  noStroke();
  fill(35, 31, 3, 70); // brown hair
  translate(265, 330); // move to where you want the rectangle
  rotate(radians(7)); // slight rotation (5 degrees)
  rectMode(CENTER); // draw from center for even rotation
  rect(0, 0, 17, 5); // rectangle at the new origin
  pop();

  push();
  noStroke();
  fill(35, 31, 3); // brown hair
  translate(380, 310); // move to where you want the rectangle
  rotate(radians(173)); // slight rotation (5 degrees)
  rectMode(CENTER); // draw from center for even rotation
  rect(0, 0, 105, 15); // rectangle at the new origin
  pop();

  push();
  noStroke();
  fill(35, 31, 3, 70); // brown hair
  translate(340, 330); // move to where you want the rectangle
  rotate(radians(173)); // slight rotation (5 degrees)
  rectMode(CENTER); // draw from center for even rotation
  rect(0, 0, 17, 5); // rectangle at the new origin
  pop();

  //eyes//
  push();
  noStroke();
  fill(0, 0, 0); // Skin tone
  arc(230, 270, 180, 180, PI, TWO_PI, CHORD);
  pop();

  //beard//
  push(); //
  stroke(35, 31, 3); // Outline color (dark brown)
  strokeWeight(0); // Outline thickness
  fill(35, 31, 3); // brown hair
  ellipse(300, 480, 90, 30);
  pop();

  //mouth//
  push();
  noStroke();
  fill(35, 31, 3); // brown hair
  translate(300, 430); // move to where you want the rectangle
  rotate(radians(175)); // slight rotation (5 degrees)
  rectMode(CENTER); // draw from center for even rotation
  rect(0, 0, 85, 14); // rectangle at the new origin
  pop();
}
