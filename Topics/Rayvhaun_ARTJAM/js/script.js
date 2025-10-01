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
  ellipse(300, 300, 350, 365); // Face oval
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
  ellipse(482, 335, 12, 12); // Face oval
  pop();

  push();
  fill(17, 11, 4); // brown
  noStroke();
  arc(300, 300, 350, 365, PI, TWO_PI, CHORD);
  pop();

  push();
  noStroke();
  fill(126, 84, 34); // brown hair
  rect(125, 280, 350, 30);
  pop();
  //hairline//
  push();
  noStroke();
  fill(126, 84, 34); // brown hair
  rect(160, 240, 285, 40);
  pop();

  //goatee//
  push(); //
  fill(17, 11, 4); // Skin tone
  noStroke();
  ellipse(330, 479, 14, 14); // Face oval
  pop();

  push();
  fill(17, 11, 4); // Skin tone
  noStroke();
  ellipse(300, 479, 14, 14); // Face oval
  pop();

  push(); //
  fill(17, 11, 4); // Skin tone
  noStroke();
  ellipse(295, 479, 14, 14); // Face oval
  pop();

  push(); //
  fill(17, 11, 4); // Skin tone
  noStroke();
  ellipse(307, 486, 14, 14); // Face oval
  pop();

  push(); //
  fill(17, 11, 4); // Skin tone
  noStroke();
  ellipse(308, 479, 14, 14); // Face oval
  pop();

  push(); //
  fill(17, 11, 4); // Skin tone
  noStroke();
  ellipse(295, 490, 14, 14); // Face oval
  pop();
}
