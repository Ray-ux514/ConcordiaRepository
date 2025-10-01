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
  push(); //
  fill(126, 84, 34); // Skin tone
  noStroke();
  ellipse(300, 300, 350, 350); // Face oval
  pop();

  //ears//
  push(); //
  fill(126, 84, 34); // Skin tone
  noStroke();
  ellipse(120, 310, 50, 55); // Face oval
  pop();

  //earigns//
  push(); //
  fill(230, 247, 252); //ear colour//
  noStroke();
  ellipse(118, 335, 15, 15); // Face oval
  pop();

  //ears//
  push(); //
  fill(126, 84, 34); // Skin tone
  noStroke();
  ellipse(480, 310, 50, 55); // Face oval
  pop();

  //earigns//
  push(); //
  fill(230, 247, 252); //ear colour//
  noStroke();
  ellipse(482, 335, 15, 15); // Face oval
  pop();

  push();
  fill(56, 35, 14); // brown
  arc(300, 300, 350, 350, PI, TWO_PI, CHORD);
}
