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
  rect(150, 253, 300, 80);
  pop();

  //beard//
  push(); //
  stroke(35, 31, 3); // Outline color (dark brown)
  strokeWeight(0); // Outline thickness
  fill(35, 31, 3); // brown hair
  ellipse(300, 475, 120, 40);
  pop();
}
