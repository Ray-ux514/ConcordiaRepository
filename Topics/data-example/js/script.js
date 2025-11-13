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

const cell_size = 125;
const NUM_COLS = 4;
const NUM_ROWS = 4;

let currentMaze = null;

function setup() {
  createCanvas(500, 500);
}

/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
 */
function draw() {
  background(0);
  drawMaze();
}

function drawMaze() {
  for (let i = 0; i < NUM_COLS; i++) {
    for (let j = 0; j < NUM_ROWS; j++) {
      drawCell(i, j);
    }
  }
}

function drawCell(x, y) {
  fill("#d6404b");
  rectMode(CORNER);
  rect(x * cell_size, y * cell_size, cell_size, cell_size);
}
